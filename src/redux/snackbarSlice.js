import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  message: "",
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    open: (state, action) => {
      state.open = true;
      state.message = action.payload;
    },
    close: (state) => {
      state.open = false;
      state.message = "";
    },
  },
});

export const { open, close } = snackbarSlice.actions;

export default snackbarSlice.reducer;
