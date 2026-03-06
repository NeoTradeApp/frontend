import { store, setNifty50, setNiftyOptionChain } from "@redux";
import { socketService } from "./socketService";
import { WEB_SOCKET, SCRIPS } from "@constants";

const { REACT_APP_NAME } = process.env;

export const subscribeMarketFeed = () => {
  const unsubscribe = socketService.subscribe(
    WEB_SOCKET.MESSAGE_TYPE.MARKET_FEED,
    (marketData) => {
      if (!marketData) return;

      const nifty50 = marketData[SCRIPS.SCRIP_TYPE.NIFTY_INDEX] || {};
      store.dispatch(setNifty50(nifty50));
      document.title = [REACT_APP_NAME, nifty50.change || "0"].join(" | ")

      const niftyOptionChain = marketData[SCRIPS.SCRIP_TYPE.NIFTY_OPTIONS] || [];
      store.dispatch(setNiftyOptionChain(niftyOptionChain));
    }
  );

  return unsubscribe;
};
