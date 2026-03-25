import { createSlice, current } from "@reduxjs/toolkit";

export const marketFeedSlice = createSlice({
  name: "marketFeed",
  initialState: {
    nifty50: {},
    nifty50Fut: {},
    niftyOptionChain: {},
  },
  reducers: {
    setNifty50: (state, action) => {
      state.nifty50 = { ...state.nifty50, ...action.payload };
    },
    setNifty50Fut: (state, action) => {
      state.nifty50Fut = { ...state.nifty50Fut, ...action.payload };
    },
    updateNiftyOptionChain: (state, action) => {
      Object.entries(action.payload).forEach(([strikePrice, option]) => {
        Object.entries(option).forEach(([optionType, option]) => {
          state.niftyOptionChain[strikePrice] ||= {};
          state.niftyOptionChain[strikePrice][optionType] ||= {};

          if (option?.currentPrice) {
            state.niftyOptionChain[strikePrice][optionType] = {
              ...state.niftyOptionChain[strikePrice][optionType],
              ...option
            };
          }
        });
      });
    },
    // updateNiftyOptionChain: (state, action) => {
    //   action.payload.forEach((option) => {
    //     const { strikePrice, optionType, currentPrice } = option;

    //     state.niftyOptionChain[strikePrice] ||= {};
    //     state.niftyOptionChain[strikePrice][optionType] ||= {};

    //     if (currentPrice) {
    //       state.niftyOptionChain[strikePrice][optionType] = {
    //         ...state.niftyOptionChain[strikePrice][optionType],
    //         ...option
    //       };
    //     }
    //   });
    // },
  },
});

export const { setNifty50, setNifty50Fut, updateNiftyOptionChain } = marketFeedSlice.actions;

export default marketFeedSlice.reducer;
