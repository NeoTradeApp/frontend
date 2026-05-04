import { Box, Grid2 as Grid } from "@mui/material";
import { TabView } from "@components";
import { titleize } from "@utils";
import PositionPanel from "./PositionPanel";

function StrategiesView(props) {
  const { strategies } = props;

  return (
    <TabView tabs={
      strategies.map((strategy, index) => ({
        heading: titleize(strategy.strategyName),
        panel: <PositionPanel key={index} positions={strategy.Positions} />
      }))
    } />
  );
}

export default StrategiesView;
