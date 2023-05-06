import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './entities/channelsSlice';
import messagesReducer from './entities/messagesSlice';
import modalsReducer from './entities/modalsSlice';
import authReducer from './entities/authSlice';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    modals: modalsReducer,
    auth: authReducer,
  },
});
