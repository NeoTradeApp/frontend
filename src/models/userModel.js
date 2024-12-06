import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from '../controllers/userController';

const userSlice = createSlice({
  name: 'user',
  initialState: { users: [], loading: false, error: null },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setUsers, setError } = userSlice.actions;

export const fetchUsersAsync = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const users = await fetchUsers();
    dispatch(setUsers(users));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default userSlice.reducer;
