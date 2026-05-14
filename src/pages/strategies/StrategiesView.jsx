import { useState, useEffect } from "react";
import { TabView } from "@components";
import { titleize } from "@utils";
import PositionPanel from "./PositionPanel";

function StrategiesView(props) {
  const { strategies: strategiesFromProps } = props;
  const [strategies, setStrategies] = useState(strategiesFromProps);

  useEffect(() => {
    setStrategies(strategiesFromProps);
  }, [strategiesFromProps]);

  const isAnyActive = (positions) => positions?.some(_ => _.status === "ACTIVE")

  return (
    <TabView tabs={
      Object.values(strategies || {}).map((strategy, index) => ({
        heading: `${titleize(strategy.strategyName)} (${strategy.positions.length}) ${isAnyActive(strategy.positions) ? "*" : ""}`,
        panel: <PositionPanel key={index} strategyId={strategy.id} positions={strategy.positions} />
      }))
    } />
  );
}

export default StrategiesView;
