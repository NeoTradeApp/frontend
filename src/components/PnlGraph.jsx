import { useState, useMemo } from "react";
import moment from "moment";
import { LineChart } from "@mui/x-charts/LineChart";
import {
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export default function PnlGraph(props) {
  const { metrics, includeDrawdowns = false } = props;
  const [includeCharges, setIncludeCharges] = useState(true);

  const toNumber = (n) => Number(n) || 0;

  let cumulativePnL = 0;

  const dataset = [...(metrics?.positions || [])]
    .sort((a, b) => new Date(a.exitTime) - new Date(b.exitTime))
    .filter(
      (p) =>
        p.pnl !== null &&
        !isNaN(p.pnl) &&
        p.status === "CLOSED"
    )
    .map((p) => {
      cumulativePnL += toNumber(p.pnl);

      if (includeCharges) {
        const charges = (p?.orders || []).reduce(
          (sum, order) =>
            sum +
            toNumber(order.brokerage) +
            toNumber(order.taxes),
          0
        );

        cumulativePnL -= charges;
      }

      return {
        date: moment(p.exitTime),
        cumulativePnL,
        zeroRef: 0,
      };
    });

  // Calculate drawdowns using dataset objects
  const calculateDrawdowns = (data) => {
    const drawdowns = [];

    let peak = -Infinity;
    let peakIndex = -1;
    let currentDrawdown = null;

    for (let i = 0; i < data.length; i++) {
      const { cumulativePnL: pnl, date } = data[i];

      // New high-water mark / recovery
      if (pnl >= peak) {
        if (currentDrawdown !== null) {
          currentDrawdown.recovered = true;
          currentDrawdown.recoveryIndex = i;
          currentDrawdown.recoveryDateTime = date.clone();

          drawdowns.push(currentDrawdown);
          currentDrawdown = null;
        }

        peak = pnl;
        peakIndex = i;
        continue;
      }

      // Start a new drawdown
      if (currentDrawdown === null) {
        currentDrawdown = {
          startIndex: peakIndex,
          endIndex: i,

          startDateTime: data[peakIndex].date.clone(),
          endDateTime: date.clone(),

          peakPnL: peak,
          troughPnL: pnl,
          drawdown: peak - pnl,
          drawdownPct:
            peak !== 0
              ? ((peak - pnl) / Math.abs(peak)) * 100
              : null,

          recovered: false,
          recoveryIndex: null,
          recoveryDateTime: null,
        };
      } else if (pnl < currentDrawdown.troughPnL) {
        // Update the deepest point
        currentDrawdown.endIndex = i;
        currentDrawdown.endDateTime = date.clone();
        currentDrawdown.troughPnL = pnl;
        currentDrawdown.drawdown = peak - pnl;
        currentDrawdown.drawdownPct =
          peak !== 0
            ? ((peak - pnl) / Math.abs(peak)) * 100
            : null;
      }
    }

    // Drawdown still active at the end of the dataset
    if (currentDrawdown !== null) {
      drawdowns.push(currentDrawdown);
    }

    return drawdowns;
  };

  const drawdowns = useMemo(() => includeDrawdowns ? calculateDrawdowns(dataset) : [], [dataset, includeDrawdowns]);

  // Add one chart series per drawdown.
  // Only show values between the peak and trough indices.
  const chartDataset = dataset.map((item, index) => {
    const segments = {};

    drawdowns.forEach((dd, ddIndex) => {
      segments[`drawdown_${ddIndex}`] =
        index >= dd.startIndex && index <= dd.endIndex
          ? item.cumulativePnL
          : null;
    });

    return { ...item, ...segments };
  });

  const drawdownSeries = drawdowns.map((dd, index) => ({
    dataKey: `drawdown_${index}`,
    label: `Drawdown #${index + 1}`,
    color: "#d32f2f",
    curve: "linear",
    showMark: false,
    connectNulls: false,
  }));

  const handleIncludeChargesChange = (event) =>
    setIncludeCharges(event.target.checked);

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <FormControlLabel
        sx={{ position: "absolute", left: "10rem", zIndex: 1 }}
        control={
          <Checkbox
            checked={includeCharges}
            onChange={handleIncludeChargesChange}
          />
        }
        label="Include Charges"
      />


      <LineChart
        dataset={chartDataset}
        hideLegend
        xAxis={[
          {
            data: dataset.map((_, index) => index),
            scaleType: "point",
            valueFormatter: (index) => {
              const item = dataset[index];
              if (!item) return "";

              return [
                item.date.format("MMM D, YYYY HH:mm"),
                `Order No.: #${index + 1}`,
              ].join(" | ");
            },
            tickLabelStyle: { display: "none" },
          },
        ]}
        series={[
          {
            dataKey: "cumulativePnL",
            label: "P&L",
            curve: "linear",
            showMark: false,
            color: "#1976d2",
          },
          {
            dataKey: "zeroRef",
            label: "Baseline",
            curve: "linear",
            showMark: false,
            color: "gray",
          },
          ...drawdownSeries,
        ]}
        // slotProps={{
        //   tooltip: {
        //     trigger: "item",
        //   },
        // }}
        height={300}
      />

      {includeDrawdowns && (
        <>
          <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
            Drawdown History ({drawdowns.length})
          </Typography>

          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Start Date-Time</TableCell>
                  <TableCell>End Date-Time (Trough)</TableCell>
                  <TableCell align="right">Peak PnL</TableCell>
                  <TableCell align="right">Trough PnL</TableCell>
                  <TableCell align="right">Drawdown</TableCell>
                  <TableCell align="right">Drawdown %</TableCell>
                  <TableCell>Recovery</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {drawdowns.map((dd, index) => (
                  <TableRow key={`${dd.startIndex}-${dd.endIndex}`}>
                    <TableCell>{index + 1}</TableCell>

                    <TableCell>
                      {dd.startDateTime.format("DD/MM/YY HH:mm")}
                      {/* <Typography variant="caption" display="block">
                        Index: {dd.startIndex}
                      </Typography> */}
                    </TableCell>

                    <TableCell>
                      {dd.endDateTime.format("DD/MM/YY HH:mm")}
                      {/* <Typography variant="caption" display="block">
                        Index: {dd.endIndex}
                      </Typography> */}
                    </TableCell>

                    <TableCell align="right">
                      {dd.peakPnL.toFixed(2)}
                    </TableCell>

                    <TableCell align="right">
                      {dd.troughPnL.toFixed(2)}
                    </TableCell>

                    <TableCell
                      align="right"
                      sx={{ color: "error.main", fontWeight: 600 }}
                    >
                      {dd.drawdown.toFixed(2)}
                    </TableCell>

                    <TableCell align="right">
                      {dd.drawdownPct === null
                        ? "N/A"
                        : `${dd.drawdownPct.toFixed(2)}%`}
                    </TableCell>

                    <TableCell>
                      {dd.recovered
                        ? dd.recoveryDateTime.format("DD/MM/YY HH:mm")
                        : "Unrecovered"}
                      {/* {dd.recovered && (
                        <Typography variant="caption" display="block">
                          Index: {dd.recoveryIndex}
                        </Typography>
                      )} */}
                    </TableCell>
                  </TableRow>
                ))}

                {drawdowns.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      No drawdowns found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
}
