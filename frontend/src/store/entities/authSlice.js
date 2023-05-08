/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  auth: localStorage.getItem('userData')
    ? JSON.parse(localStorage.getItem('userData'))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, { payload }) => {
      localStorage.setItem('userData', JSON.stringify(payload));
      state.auth = payload;
    },
    logOut: (state) => {
      localStorage.removeItem('userData');
      state.auth = null;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
