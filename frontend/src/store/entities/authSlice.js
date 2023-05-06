/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, { payload }) => {
      localStorage.setItem('userData', JSON.stringify(payload));
      state.isAuth = true;
    },
    logOut: (state) => {
      localStorage.removeItem('userData');
      state.isAuth = false;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
