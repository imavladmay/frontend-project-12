const chatApi = (socket) => {
  const addMessageApi = (message) => socket.emit('newMessage', message);

  return { addMessageApi };
};

export default chatApi;
