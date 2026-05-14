import { store, setNifty50, setNifty50Fut, updateNiftyOptionChain } from "@redux";
import { socketService } from "./socketService";
import { WEB_SOCKET, SCRIPS } from "@constants";

export const subscribeMarketFeed = () => {
  const unsubscribe = socketService.subscribe(
    WEB_SOCKET.MESSAGE_TYPE.MARKET_FEED,
    (marketData) => {
      if (!marketData) return;

      const nifty50 = marketData[SCRIPS.SCRIP_TYPE.NIFTY_INDEX];
      store.dispatch(setNifty50(nifty50 || {}));

      // const niftyFut = marketData[SCRIPS.SCRIP_TYPE.NIFTY_FUTURE];
      // niftyFut.currentPrice && store.dispatch(setNifty50Fut(niftyFut));
      store.dispatch(setNifty50Fut(marketData[SCRIPS.SCRIP_TYPE.NIFTY_FUTURE] || {}));

      store.dispatch(updateNiftyOptionChain(marketData[SCRIPS.SCRIP_TYPE.NIFTY_OPTION_CHAIN] || {}));

    }
  );

  return unsubscribe;
};
