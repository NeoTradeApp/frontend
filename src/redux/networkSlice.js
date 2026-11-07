import { createSlice } from "@reduxjs/toolkit";

const networkSlice = createSlice({
  name: "network",
  initialState: {
    socketStatus: "IDLE"
  },
  reducers: {
    setSockeStatus: (state, action) => {
      state.socketStatus = action.payload;
    },
  },
});

export const { setSockeStatus } = networkSlice.actions;

export default networkSlice.reducer;
