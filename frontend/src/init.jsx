import React from 'react';
import ReactDOM from 'react-dom/client';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import store from './slices/index.js';
import App from './components/App.jsx';
import resources from './locales/index.js';
import chatApi from './api/chat.js';
import WebSocketProvider from './providers/WebSocketProvider.jsx';

const initApp = async () => {
  const socket = io();
  const i18n = i18next.createInstance();

  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'ru',
  });

  const root = ReactDOM.createRoot(document.getElementById('chat'));
  return root.render(
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <WebSocketProvider api={chatApi(socket)}>
          <App socket={socket} />
        </WebSocketProvider>
      </Provider>
    </I18nextProvider>,
  );
};

export default initApp;
