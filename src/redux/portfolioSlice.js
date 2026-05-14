import { createSlice } from "@reduxjs/toolkit";

const { REACT_APP_SHORT_NAME } = process.env;

const calculatePnl = (positions) => {
  let realisedPnl = 0;
  let unrealisedPnl = 0;
  Object.values(positions).forEach((position) => {
    const { status, pnl } = position;

    if (status === "ACTIVE") {
      unrealisedPnl += pnl;
    } else {
      realisedPnl += pnl;
    }
  });

  return { realisedPnl, unrealisedPnl };
};

const calculateCharges = (orders) =>
  Object.values(orders).reduce((charges, order) => {
    const { brokerage, taxes } = order;
    charges += brokerage + taxes;
    return charges;
  }, 0);

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
    updateAllPositions: (state, action) => {
      state.positions = action.payload.reduce((positionsObj, position) => {
        positionsObj[position.id] = position;

        return positionsObj;
      }, {});
    },
    updatePosition: (state, action) => {
      const payloads = Array.isArray(action.payload) ? action.payload : [action.payload]

      payloads.forEach((payload) => {
        const { id } = payload;
        state.positions[id] = payload;
      });

      const { realisedPnl, unrealisedPnl } = calculatePnl(state.positions);

      state.realisedPnl = realisedPnl;
      state.unrealisedPnl = unrealisedPnl;

      const pnl = realisedPnl + unrealisedPnl - state.charges;
      const sign = parseInt(pnl) > 0 ? "▲" : "▼";
      document.title = [REACT_APP_SHORT_NAME, ` ₹ ${pnl.toFixed(2)} ${sign}` || "0"].join("   |   ")
    },
    updateAllOrders: (state, action) => {
      state.orders = action.payload.reduce((ordersObj, order) => {
        ordersObj[order.id] = order;

        return ordersObj;
      }, {});
    },
    updateOrder: (state, action) => {
      const payloads = Array.isArray(action.payload) ? action.payload : [action.payload]

      payloads.forEach((payload) => {
        const { id } = payload;
        state.orders[id] = payload;
      });

      state.charges = calculateCharges(state.orders);
    }
  },
});

export const {
  setRealisedPnl,
  setUnrealisedPnl,
  setCharges,
  updateAllPositions,
  updatePosition,
  updateAllOrders,
  updateOrder,
} = portfolioSlice.actions;

export default portfolioSlice.reducer;
