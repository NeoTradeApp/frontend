import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Grid2 as Grid,
} from "@mui/material";
import { Typography, PnL, PortfolioMetrics } from "@components";

function Metrics(props) {
  const { positions: positionsFromProps = [] } = props;
  const [metrics, setMetrics] = useState({});

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

  useEffect(() => {
    const pnls = Object.values(positionsFromProps)
      .filter(p => p.pnl !== null && !isNaN(p.pnl) && p.status === "CLOSED")
      .map(p => Number(p.pnl));

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

    setMetrics({
      realisedPnl: calculatePnl(positionsFromProps),
      charges: calculateCharges(positionsFromProps),

      pnls,
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
  }, [positionsFromProps]);

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item size={6}>
            <Grid container spacing={2}>
              <Grid item size={4}>
                <PnL label="Realised P&L" value={metrics.realisedPnl} />
              </Grid>

              <Grid item size={4}>
                <PnL label="Charges" value={-metrics.charges} />
              </Grid>

              <Grid item size={4}>
                <PnL label="Net Realised P&L" value={metrics.realisedPnl - metrics.charges} />
              </Grid>

              <Grid item size={4}>
                <PnL label="Expectancy" value={metrics.expectancy} />
              </Grid>

              <Grid item size={4}>
                <PnL label="Avg Win" value={metrics.avgWin} />
              </Grid>

              <Grid item size={4}>
                <PnL label="Avg Loss" value={-metrics.avgLoss} />
              </Grid>

              <Grid item size={4}>
                <Typography variant="subtitle2" component="span"> Total Trades </Typography>
                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{ flexGrow: 1 }}
                >
                  {positionsFromProps.length}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item size={6}>
            <PortfolioMetrics metrics={metrics} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default Metrics;
