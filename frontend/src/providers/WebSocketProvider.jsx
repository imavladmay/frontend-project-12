import {
  createContext,
  useContext,
  useMemo,
} from 'react';

const WebSocketContext = createContext({});

const WebSocketProvider = ({ api, children }) => {
  const { addMessageApi } = api;

  const memoizedValue = useMemo(() => ({ addMessageApi }), [addMessageApi]);

  return (
    <WebSocketContext.Provider value={memoizedValue}>
      {children}
    </WebSocketContext.Provider>
  );
};

const useWebSocket = () => useContext(WebSocketContext);

export { useWebSocket };
export default WebSocketProvider;
