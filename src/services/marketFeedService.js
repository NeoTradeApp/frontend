import { store } from "../redux/store";
import { setNifty50 } from "../redux/marketFeedSlice";
import { socketService } from "./socketService";
import { WEB_SOCKET } from "../config/constants";

export const subscribeMarketFeed = () => {
  const unsubscribe = socketService.subscribe((marketData) => {
    const [nifty50] = marketData || [{}];
    store.dispatch(setNifty50(nifty50));
  }, WEB_SOCKET.MESSAGE_TYPE.MARKET_FEED);

  return unsubscribe;
};
