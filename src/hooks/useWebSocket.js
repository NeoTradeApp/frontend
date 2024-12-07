import { useState, useEffect } from "react";
import { socketService } from "@services";

const useWebSocket = (type) => {
  const [socketData, setSocketData] = useState();

  useEffect(() => {
    const unsubscribe = socketService.subscribe(type, (newSocketData) => {
      setSocketData(newSocketData);
    });

    // Cleanup on unmount
    return () => {
      unsubscribe();
    };
  }, [type]);

  const sendSocketData = (type, data) => {
    socketService.sendMessage(type, data);
  };

  return [socketData, sendSocketData];
};

export default useWebSocket;
