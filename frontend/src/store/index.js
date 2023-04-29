import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './entities/channelsSlice';
import messagesReducer from './entities/messagesSlice';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
  },
});
