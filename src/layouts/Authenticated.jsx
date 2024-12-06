import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { socketService } from "../services/webSockets";
import useWebSocket from "../hooks/useWebSocket";
import { setNifty50 } from "../redux/marketFeedSlice";
import Header from "./Header";

function Authenticated() {
  const dispatch = useDispatch();

  const [marketData] = useWebSocket("MARKET_FEED");

  useEffect(() => {
    const [nifty50] = marketData || [{}];
    dispatch(setNifty50(nifty50));
  }, [marketData]);

  useEffect(() => {
    socketService.connect();

    return () => {
      socketService.disconnect();
    };
  }, []);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Authenticated;