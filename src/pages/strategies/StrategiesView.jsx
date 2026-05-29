import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Typography, Stack, Chip } from "@mui/material";
import { TabView, PnL } from "@components";
import { titleize } from "@utils";
import PositionPanel from "./PositionPanel";

function TabHeading(props) {
  const { strategy } = props;
  const positions = strategy?.positions || [];
  const isAnyActivePosition = positions?.some(_ => _.status === "ACTIVE");

  const strategyWisePnl = useSelector((state) => state.portfolio.strategyWisePnl[strategy.id]);
  const pnl = (strategyWisePnl?.unrealisedPnl || 0) + (strategyWisePnl?.realisedPnl || 0);

  return (
    <PnL
      label={
        <Stack direction="row" spacing={0.55} alignItems="left">
          <Typography variant="span">
            {titleize(strategy.strategyName)}
          </Typography>
          <Chip label={positions.length} variant={isAnyActivePosition ? "filled" : "outlined"} color="info" size="small" />
        </Stack>
      }
      value={pnl}
    />
  );
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
