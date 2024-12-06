import { useState, useEffect } from "react";
import { socketService } from "../services/webSockets";

const useWebSocket = (type) => {
  const [socketData, setSocketData] = useState();

  useEffect(() => {
    const unsubscribe = socketService.subscribe((newSocketData) => {
      setSocketData(newSocketData);
    }, type);

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
