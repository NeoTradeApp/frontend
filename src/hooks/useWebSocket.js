import { useState, useEffect } from "react";
import { socketService } from "@services";

const useWebSocket = (type) => {
  const [socketData, setSocketData] = useState();
  const [keys, setKeys] = useState();

  useEffect(() => {
    const unsubscribe = socketService.subscribe(type, (...args) => {
      const [data, ...matchingKeys] = args;

      setSocketData(data);
      setKeys(matchingKeys);
    });

    // Cleanup on unmount
    return () => {
      unsubscribe();
    };
  }, [type]);

  const sendSocketData = (type, data) => {
    socketService.sendMessage(type, data);
  };

  return [socketData, keys, sendSocketData];
};

export default useWebSocket;
