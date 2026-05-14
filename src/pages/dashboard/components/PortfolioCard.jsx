import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  Grid2 as Grid,
} from "@mui/material";
import { PnL } from "@components";
import PortfolioMetrics from "./PortfolioMetrics";

function PortfolioCard() {
  const portfolio = useSelector((state) => state.portfolio);
  const positions = portfolio.positions || {};

  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    const pnls = Object.values(positions)
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
  }, [positions]);

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item size={6}>
            <Grid container spacing={2}>
              <Grid item size={6}>
                <PnL label="Unrealised P&L" value={portfolio.unrealisedPnl} />
              </Grid>

              <Grid item size={6}>
                <PnL label="Realised P&L" value={portfolio.realisedPnl} />
              </Grid>

              <Grid item size={6}>
                <PnL label="Net Unrealised P&L" value={portfolio.realisedPnl + portfolio.unrealisedPnl - portfolio.charges} />
              </Grid>

              <Grid item size={6}>
                <PnL label="Net Realised P&L" value={portfolio.realisedPnl - portfolio.charges} />
              </Grid>

              <Grid item size={3}>
                <PnL label="Charges" value={-portfolio.charges} />
              </Grid>

              <Grid item size={3}>
                <PnL label="Expectancy" value={metrics.expectancy} />
              </Grid>

              <Grid item size={3}>
                <PnL label="Avg Win" value={metrics.avgWin} />
              </Grid>
              <Grid item size={3}>
                <PnL label="Avg Loss" value={-metrics.avgLoss} />
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

export default PortfolioCard;
