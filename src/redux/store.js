import { configureStore } from "@reduxjs/toolkit";

import snackbarReducer from "./snackbarSlice";
import marketFeedReducer from "./marketFeedSlice";
import userReducer from "./userSlice";
import portforlioReducer from "./portfolioSlice";
import networkReducer from "./networkSlice";

import { listenerMiddleware } from "./listenerMiddleware";
import "./documentTitleListener";

export const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
    marketFeed: marketFeedReducer,
    user: userReducer,
    portfolio: portforlioReducer,
    network: networkReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});
