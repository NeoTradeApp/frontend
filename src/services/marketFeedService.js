import { store, setNifty50 } from "@redux";
import { socketService } from "./socketService";
import { WEB_SOCKET } from "@constants";

export const subscribeMarketFeed = () => {
  const unsubscribe = socketService.subscribe(
    WEB_SOCKET.MESSAGE_TYPE.MARKET_FEED,
    (marketData) => {
      const [nifty50] = marketData || [{}];
      if (nifty50.iv) {
        store.dispatch(setNifty50(nifty50));
      }
    }
  );

  return unsubscribe;
};
