import { createSlice } from "@reduxjs/toolkit";

export const portfolioSlice = createSlice({
  name: "portfolio",
  initialState: {
    realisedPnl: 0,
    unrealisedPnl: 0,
    charges: 0,
    positions: {},
    orders: {},
  },
  reducers: {
    setRealisedPnl: (state, action) => {
      state.realisedPnl = action.payload;
    },
    setUnrealisedPnl: (state, action) => {
      state.unrealisedPnl = action.payload;
    },
    setCharges: (state, action) => {
      state.charges = action.payload;
    },
    updatePosition: (state, action) => {
      const { id, ...payload } = action.payload;
      state.positions[id] = payload;

      let realisedPnl = 0;
      let unrealisedPnl = 0;
      Object.values(state.positions).forEach((position) => {
        const { status, pnl, brokerage, taxes } = position;

        if (status === "ACTIVE") {
          unrealisedPnl += pnl;
        } else {
          realisedPnl += pnl;
        }
      });

      state.realisedPnl = realisedPnl;
      state.unrealisedPnl = unrealisedPnl;

    },
    updateOrder: (state, action) => {
      const { id, ...payload } = action.payload;
      state.orders[id] = payload;

      let charges = 0;
      Object.values(state.orders).forEach((order) => {
        const { brokerage, taxes } = order;
        charges += brokerage + taxes;
      });

      state.charges = charges;
    }
  },
});

export const { setRealisedPnl, setUnrealisedPnl, setCharges, updatePosition, updateOrder } = portfolioSlice.actions;

export default portfolioSlice.reducer;
