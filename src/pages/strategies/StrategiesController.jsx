import { useState, useEffect } from "react";
import { getStrategies } from "@api";
import StrategiesView from "./StrategiesView";

function StrategiesController() {
  const [strategies, setStrategies] = useState([]);

  useEffect(() => {
    getStrategies().then((response) => {
      const { data: strategies } = response || {};
      if (!strategies) return;

      setStrategies(strategies);
    })
  }, [getStrategies]);

  return <StrategiesView strategies={strategies} />;
}

export default StrategiesController;
