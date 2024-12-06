import { configureStore } from "@reduxjs/toolkit";
import snackbarReducer from "./snackbarSlice";
import marketFeedReducer from "./marketFeedSlice";

export const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
    marketFeed: marketFeedReducer,
  },
});