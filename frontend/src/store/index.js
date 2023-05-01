import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './entities/channelsSlice';
import messagesReducer from './entities/messagesSlice';
import modalsReducer from './entities/modalsSlice';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    modals: modalsReducer,
  },
});
