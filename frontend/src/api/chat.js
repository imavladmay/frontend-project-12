const chatApi = (socket) => {
  const addMessageApi = (message) => socket.emit('newMessage', message);

  const addChannelApi = (channel) => socket.emit('newChannel', channel);

  return { addMessageApi, addChannelApi };
};

export default chatApi;
