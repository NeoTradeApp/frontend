import { configureStore } from "@reduxjs/toolkit";
import snackbarReducer from "./snackbarSlice";
import marketFeedReducer from "./marketFeedSlice";
import userReducer from "./userSlice";
import portforlioReducer from "./portfolioSlice";

export const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
    marketFeed: marketFeedReducer,
    user: userReducer,
    portfolio: portforlioReducer,
  },
});
