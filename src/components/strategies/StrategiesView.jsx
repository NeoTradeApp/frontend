import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Typography, Stack, Chip } from "@mui/material";
import { TabView, PnL } from "@components";
import { titleize } from "@utils";
import PositionPanel from "./PositionPanel";

function TabHeading(props) {
  const { strategy } = props;
  const positions = strategy?.positions || [];

  const strategyWisePnl = useSelector((state) => state.portfolio.strategyWisePnl[strategy.id]);
  const pnl = (strategyWisePnl?.unrealisedPnl || 0) + (strategyWisePnl?.realisedPnl || 0);

  const totalCharges = positions.reduce((charges, pos) => {
    if (!pos?.orders) return charges;

    return charges + pos.orders.reduce((s, order) =>
      s + (order?.brokerage || 0) + (order?.taxes || 0), 0)
  }, 0);

  return (
    <>
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
          label={"Charges"}
          value={-totalCharges}
          variant={"caption"}
        />
      </Stack>
    </>
  )
}

function StrategiesView(props) {
  const { strategies: strategiesFromProps } = props;
  const [strategies, setStrategies] = useState(strategiesFromProps);

  useEffect(() => {
    setStrategies(strategiesFromProps);
  }, [strategiesFromProps]);

  return (
    <TabView tabs={
      Object.values(strategies || {}).map((strategy, index) => ({
        heading: <TabHeading strategy={strategy} />,
        panel: <PositionPanel key={index} strategyId={strategy.id} positions={strategy.positions} />
      }))
    } />
  );
}

export default StrategiesView;
