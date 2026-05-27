import { useState, useEffect } from "react";
import { TabView, PnL } from "@components";
import { titleize } from "@utils";
import PositionPanel from "./PositionPanel";

function StrategiesView(props) {
  const { strategies: strategiesFromProps } = props;
  const [strategies, setStrategies] = useState(strategiesFromProps);

  useEffect(() => {
    setStrategies(strategiesFromProps);
  }, [strategiesFromProps]);

  const isAnyActive = (positions) => positions?.some(_ => _.status === "ACTIVE")

  // const tabHeadingText = (strategy) =>

  const tabHeading = (strategy) => {
    const positions = (strategy?.positions || []);
    return (
      <PnL
        label={`${titleize(strategy.strategyName)} (${positions.length}) ${isAnyActive(positions) ? "*" : ""}`}
        value={positions.reduce((sum, { pnl }) => sum + pnl, 0)}
      />
    );
  };

  return (
    <TabView tabs={
      Object.values(strategies || {}).map((strategy, index) => ({
        // heading: `${titleize(strategy.strategyName)} (${strategy.positions.length}) ${isAnyActive(strategy.positions) ? "*" : ""}`,
        heading: (tabHeading(strategy)),
        panel: <PositionPanel key={index} strategyId={strategy.id} positions={strategy.positions} />
      }))
    } />
  );
}

export default StrategiesView;
