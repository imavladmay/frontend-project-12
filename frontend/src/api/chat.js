import store from '../slices/index';
import { addMessage } from '../slices/messagesSlice';

const chatApi = (socket) => {
  const { dispatch } = store;

  const connect = () => socket.connect();
  const disconnect = () => socket.disconnect();

  socket.on('newMessage', (message) => {
    dispatch(addMessage(message));
  });

  const addMessageApi = (message) => socket.emit('newMessage', message);

  return { connect, disconnect, addMessageApi };
};

export default chatApi;
