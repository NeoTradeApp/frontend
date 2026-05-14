import { useState, useEffect } from "react";
import { getStrategies } from "@api";
import { WEB_SOCKET } from "@constants";
import useWebSocket from "@hooks/useWebSocket";
import StrategiesView from "./StrategiesView";

function StrategiesController() {
  const [strategies, setStrategies] = useState([]);

  const loadStrategies = () => {
    getStrategies().then((response) => {
      const { data: strategies } = response || {};
      if (!strategies) return;

      setStrategies(strategies);
    });
  };

  useEffect(() => {
    loadStrategies();
  }, [getStrategies]);

  const [newPosition] = useWebSocket(WEB_SOCKET.MESSAGE_TYPE.POSITION.NEW(`([\\w-_]+)`));

  useEffect(() => {
    if (newPosition) {
      loadStrategies();
    }
  }, [newPosition]);

  return <StrategiesView strategies={strategies} />;
}

export default StrategiesController;
