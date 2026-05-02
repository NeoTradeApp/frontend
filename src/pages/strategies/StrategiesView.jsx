import { Box } from "@mui/material";
import { TabView } from "@components";
import PositionPanel from "./PositionPanel";
import { titleize } from "@utils";

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
