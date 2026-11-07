export const WEB_SOCKET = {
  STATUS: {
    OFFLINE: "OFFLINE",
    ONLINE: "ONLINE",
    CONNECTING: "CONNECTING",
  },
  MESSAGE_TYPE: {
    USER_SESSION_EXPIRED: "USER_SESSION_EXPIRED",
    MARKET_FEED: "MARKET_FEED",
    BACKTEST: {
      INITIATED: "BACKTEST/INITIATED",
      UPDATE: "BACKTEST/UPDATE",
    },
    POSITION: {
      NEW: (strategyId) => `STRATEGY/${strategyId}/POSITION/NEW`,
      UPDATE: (strategyId, positionId) => `STRATEGY/${strategyId}/POSITION/${positionId}/UPDATE`,
    },
  },
};
