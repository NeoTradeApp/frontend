import { isAnyOf } from "@reduxjs/toolkit";

import { updatePosition } from "./portfolioSlice";
import { setSockeStatus } from "./networkSlice";
import { listenerMiddleware } from "./listenerMiddleware";

import { formattedAmount } from "@utils";
import { WEB_SOCKET } from "@constants";

const { REACT_APP_SHORT_NAME } = process.env;

const updateDocumentTitle = (state) => {
  const { socketStatus } = state.network;

  const {
    realisedPnl = 0,
    unrealisedPnl = 0,
    charges = 0,
  } = state.portfolio;

  const pnl = realisedPnl + unrealisedPnl - charges;
  const sign = pnl > 0 ? "▲" : pnl < 0 ? "▼" : "";

  const socketIcons = {
    [WEB_SOCKET.STATUS.ONLINE]: "🟢",
    [WEB_SOCKET.STATUS.OFFLINE]: "🔴",
    [WEB_SOCKET.STATUS.CONNECTING]: "🟠",
    default: "",
  };

  const icon = socketIcons[socketStatus] || socketIcons.default;
  document.title = `${icon} ${REACT_APP_SHORT_NAME}   |   ${`₹ ${formattedAmount(pnl)} ${sign}`}`;
};

listenerMiddleware.startListening({
  matcher: isAnyOf(updatePosition, setSockeStatus),

  effect: (action, listenerApi) => {
    const state = listenerApi.getState();

    updateDocumentTitle(state);
  },
});
