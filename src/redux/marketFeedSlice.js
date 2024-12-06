import { createSlice } from "@reduxjs/toolkit";

export const marketFeedSlice = createSlice({
  name: "marketFeed",
  initialState: {
    nifty50: {},
  },
  reducers: {
    setNifty50: (state, action) => {
      state.nifty50 = action.payload;
    },
  },
});

export const { setNifty50 } = marketFeedSlice.actions;

export default marketFeedSlice.reducer;
