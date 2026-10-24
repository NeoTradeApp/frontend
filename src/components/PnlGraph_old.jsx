import { useState } from "react";
import moment from "moment";
import { LineChart } from "@mui/x-charts/LineChart";
import { FormControlLabel, Checkbox, Box } from "@mui/material";
import { toNumber } from "@utils";


export default function PnlGraph(props) {
  const { metrics } = props;
  const [includeCharges, setIncludeCharges] = useState(true);

  let cumulativePnL = 0;
  const dataset = (metrics?.positions || [])
    .sort((a, b) => new Date(a.exitTime) - new Date(b.exitTime))
    .filter(p => p.pnl !== null && !isNaN(p.pnl) && p.status === "CLOSED")
    .map((p, index) => {
      cumulativePnL += toNumber(p.pnl);
      if (includeCharges) {
        const charges = (p?.orders || []).reduce((s, o) => s + toNumber(o.brokerage) + toNumber(o.taxes), 0);
        cumulativePnL += -charges;
      }

      return {
        date: moment(p.exitTime),
        cumulativePnL,
        zeroRef: 0,
      }
    });

  const handleIncludeChargesChange = (event) =>
    setIncludeCharges(event.target?.checked);

  const calculateDrawdowns = (cumulativePnL) => {
    const drawdowns = [];

    let peak = -Infinity;
    let peakIndex = -1;
    let currentDrawdown = null;

    for (let i = 0; i < cumulativePnL.length; i++) {
      const pnl = cumulativePnL[i];

      // New high-water mark
      if (pnl >= peak) {
        // Close the previous drawdown when recovery occurs
        if (currentDrawdown !== null) {
          drawdowns.push(currentDrawdown);
          currentDrawdown = null;
        }

        peak = pnl;
        peakIndex = i;
        continue;
      }

      // We are below the peak: start a drawdown
      if (currentDrawdown === null) {
        currentDrawdown = {
          startIndex: peakIndex,
          endIndex: i,
          peakPnL: peak,
          troughPnL: pnl,
          drawdown: peak - pnl,
          drawdownPct:
            peak !== 0
              ? ((peak - pnl) / Math.abs(peak)) * 100
              : null,
          recovered: false,
          recoveryIndex: null,
        };
      } else if (pnl < currentDrawdown.troughPnL) {
        // Update the trough while the drawdown continues
        currentDrawdown.endIndex = i;
        currentDrawdown.troughPnL = pnl;
        currentDrawdown.drawdown = peak - pnl;
        currentDrawdown.drawdownPct =
          peak !== 0
            ? ((peak - pnl) / Math.abs(peak)) * 100
            : null;
      }
    }

    // Include a drawdown that has not recovered by the end
    if (currentDrawdown !== null) {
      drawdowns.push(currentDrawdown);
    }

    return drawdowns;
  }

  return (
    <Box sx={{ position: "relative" }}>
      <FormControlLabel
        sx={{ position: "absolute", left: "10rem" }}
        value="end"
        control={<Checkbox checked={includeCharges} onChange={handleIncludeChargesChange} />}
        label="Include Charges"
        labelPlacement="end"
      />
      <LineChart
        dataset={dataset}
        xAxis={[
          {
            data: dataset.map((_, index) => index),
            scaleType: "point",
            valueFormatter: (index) => {
              const item = dataset[index];
              const formattedDate = moment(item.date).format("MMM D, YYYY HH:mm");
              const orderNumber = `Order No.: #${index + 1}`;
              return item ? [formattedDate, orderNumber].join(" | ") : "";
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
          },
          {
            dataKey: "zeroRef",
            label: "Baseline",
            curve: "linear",
            showMark: false,
            color: "red",
          },
        ]}
        height={300}
      />
    </Box>
  );
};
