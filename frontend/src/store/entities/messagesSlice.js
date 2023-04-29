/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import fetchDataApi from '../../api/fetchData';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataApi.fulfilled, (state, { payload }) => {
        state.messages = payload.messages;
      });
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
