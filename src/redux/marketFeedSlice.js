import { createSlice } from "@reduxjs/toolkit";

export const marketFeedSlice = createSlice({
  name: "marketFeed",
  initialState: {
    nifty50: {},
    niftyOptionChain: [],
  },
  reducers: {
    setNifty50: (state, action) => {
      state.nifty50 = action.payload;
    },
    setNiftyOptionChain: (state, action) => {
      state.niftyOptionChain = action.payload;
    },
  },
});

export const { setNifty50, setNiftyOptionChain } = marketFeedSlice.actions;

export default marketFeedSlice.reducer;
