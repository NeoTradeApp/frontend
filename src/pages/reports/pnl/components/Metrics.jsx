import { useState, useEffect, useMemo } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid2 as Grid,
} from "@mui/material";
import { Typography, PnL, PnlGraph, WinProbability } from "@components";
import { toNumber } from "@utils";

function Metrics(props) {
  const { dayWisePnl } = props;
  const [metrics, setMetrics] = useState({});

  const allPositions = useMemo(() =>
    dayWisePnl.reduce((acc, day) => {
      acc = [...acc, ...(day.positions || [])];

      return acc;
    }, []), [dayWisePnl]);

  const calculatePnl = (positions) => {
    let realisedPnl = 0;
    Object.values(positions).forEach((position) => {
      const { status, pnl } = position;

      if (status === "CLOSED") {
        realisedPnl += pnl;
      }
    });

    return realisedPnl;
  };

  const calculateCharges = (positions) =>
    positions.reduce((totalCharges, position) => {
      totalCharges += (position?.orders || []).reduce((charges, order) => {
        const { brokerage, taxes } = order;
        charges += brokerage + taxes;

        return charges;
      }, 0);

      return totalCharges;
    }, 0);

  const calculateBrokerageAndTaxes = (positions) => {
    const accumulateCharges = (charges, entity) => {
      const { brokerage, taxes } = entity;
      charges.brokerage += brokerage;
      charges.taxes += taxes;

      return charges;
    };

    return positions
      .map(position => (position?.orders || []).reduce(accumulateCharges, { brokerage: 0, taxes: 0 }))
      .reduce(accumulateCharges, { brokerage: 0, taxes: 0 });
  };

  useEffect(() => {
    const closedPositions = Object.values(allPositions)
      .filter(p => p.pnl !== null && !isNaN(p.pnl) && p.status === "CLOSED");

    const pnls = closedPositions.map(p => toNumber(p.pnl));

    const totalTrades = pnls.length;

    if (totalTrades === 0) return;

    const wins = pnls.filter(p => p > 0);
    const losses = pnls.filter(p => p < 0);

    const winCount = wins.length;
    const lossCount = losses.length;

    const winRate = winCount / totalTrades;
    const lossRate = lossCount / totalTrades;

    const avgWin =
      winCount > 0
        ? wins.reduce((a, b) => a + b, 0) / winCount
        : 0;

    const avgLoss =
      lossCount > 0
        ? Math.abs(
          losses.reduce((a, b) => a + b, 0) / lossCount
        )
        : 0;

    const expectancy =
      winRate * avgWin - lossRate * avgLoss;

    const { brokerage, taxes } = calculateBrokerageAndTaxes(allPositions);

    setMetrics({
      positions: closedPositions,
      realisedPnl: calculatePnl(allPositions),
      charges: brokerage + taxes,
      brokerage,
      taxes,

      totalTrades,
      winCount,
      lossCount,

      winRate,        // 0–1
      winRatePercent: winRate * 100,

      lossRate,
      lossRatePercent: lossRate * 100,

      avgWin,
      avgLoss,

      expectancy,
    });
  }, [allPositions]);

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item size={6}>
            <Grid container spacing={2}>
              <Grid item size={5}>
                <Box sx={{ padding: "0.5rem 0" }}>
                  <PnL label="Realised P&L" value={metrics.realisedPnl} />
                </Box>
                <Box sx={{ padding: "0.5rem 0" }}>
                  <PnL label="Net Realised P&L" value={metrics.realisedPnl - metrics.charges} />
                </Box>
                <Box sx={{ padding: "0.5rem 0" }}>
                  <Typography variant="subtitle2" component="span"> Total Trades </Typography>
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ flexGrow: 1 }}
                  >
                    {allPositions.length} ({Object.keys(dayWisePnl).length} days)
                  </Typography>
                </Box>
              </Grid>

              <Grid item size={3}>
                <PnL label="Charges" value={-metrics.charges} />
                <PnL label="Brokerage" value={-metrics.brokerage} variant={"caption"} />
                <PnL label="Taxes" value={-metrics.taxes} variant={"caption"} />
              </Grid>
              {/*
              <Grid item size={4}>
                <PnL label="Net Realised P&L" value={metrics.realisedPnl - metrics.charges} />
              </Grid> */}

              <Grid item size={4}>
                <Box sx={{ padding: "0.5rem 0" }}>
                  <PnL label="Expectancy" value={metrics.expectancy} />
                </Box>
                <Box sx={{ padding: "0.5rem 0" }}>
                  <PnL label="Avg Win" value={metrics.avgWin} />
                </Box>
                <Box sx={{ padding: "0.5rem 0" }}>
                  <PnL label="Avg Loss" value={-metrics.avgLoss} />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item size={6}>
            <WinProbability metrics={metrics} />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item size={12}>
            <PnlGraph metrics={metrics} includeDrawdowns={true} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default Metrics;
