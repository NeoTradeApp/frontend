import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    setUser: (state, action) => {
      Object.assign(state, action.payload);
    },
    setAuthentionStatus: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setUser, setAuthentionStatus } = userSlice.actions;

export default userSlice.reducer;
