/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import fetchDataApi from '../../api/fetchData';

const initialState = {
  channels: [],
  currentChannelId: 1,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: (state, { payload }) => {
      state.channels.push(payload);
    },
    switchChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    removeChannel: (state, { payload }) => {
      state.channels = state.channels.filter((el) => el.id !== payload.id);
      if (state.currentChannelId === payload.id) {
        state.currentChannelId = 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataApi.fulfilled, (state, { payload }) => {
        state.channels = payload.channels;
        state.currentChannelId = payload.currentChannelId;
      });
  },
});

export const { addChannel, switchChannel, removeChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
