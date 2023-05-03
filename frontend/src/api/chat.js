const chatApi = (socket) => {
  const removeChannelApi = (channel) => socket.emit('removeChannel', channel);

  const addMessageApi = (message) => socket.emit('newMessage', message);

  const addChannelApi = (channel) => socket.emit('newChannel', channel);

  return { addMessageApi, addChannelApi, removeChannelApi };
};

export default chatApi;
