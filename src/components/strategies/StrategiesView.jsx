import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid2 as Grid, Typography, Stack, Chip } from "@mui/material";
import { TabView, PnL } from "@components";
import { titleize } from "@utils";
import PositionPanel from "./PositionPanel";
import MoreOptionsMenu from "./MoreOptionsMenu";

function TabHeading(props) {
  const { strategy } = props;
  const positions = strategy?.positions || [];

  const strategyWisePnl = useSelector((state) => state.portfolio.strategyWisePnl[strategy.id]);
  const pnl = (strategyWisePnl?.unrealisedPnl) + (strategyWisePnl?.realisedPnl);

  let taxes = 0;
  let brokerage = 0;
  positions.forEach((pos) => {
    if (!pos?.orders) return;

    pos.orders.forEach((order) => {
      taxes += order?.taxes || 0;
      brokerage += order?.brokerage || 0;
    });
  });

  return (
    <Grid container>
      <Grid item size={11}>
        <Stack direction="row" spacing={0.55} alignItems="left">
          <Typography variant="span">
            {titleize(strategy.strategyName)}
          </Typography>
          <Chip
            label={positions.length}
            variant={strategyWisePnl?.anyActivePosition ? "filled" : "outlined"}
            color="info"
            size="small"
          />
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <PnL
            label={"PnL"}
            value={pnl}
          />
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <PnL
            label={"Taxes"}
            value={-taxes}
            variant={"caption"}
          />
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <PnL
            label={"Brokerage"}
            value={-brokerage}
            variant={"caption"}
          />
        </Stack>
      </Grid>
      <Grid item size={1}>
        <MoreOptionsMenu />
      </Grid>
    </Grid>
  )
}

function StrategiesView(props) {
  const { strategies: strategiesFromProps } = props;
  const [strategies, setStrategies] = useState(strategiesFromProps);

  useEffect(() => {
    setStrategies(strategiesFromProps);
  }, [strategiesFromProps]);

  return (
    <TabView
      tabs={
        Object.values(strategies || {}).map((strategy, index) => ({
          heading: <TabHeading strategy={strategy} />,
          panel: <PositionPanel key={index} strategyId={strategy.id} positions={strategy.positions} />
        }))
      }
    />
  );
}

export default StrategiesView;
