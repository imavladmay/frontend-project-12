import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { io } from 'socket.io-client';
import i18next from 'i18next';

import store from './store/index';
import App from './App';
import resources from './locales/index.js';
import chatApi from './api/chat.js';
import WebSocketProvider from './providers/WebSocketProvider.jsx';
import './index.scss';

const init = async () => {
  const socket = io();

  const i18n = i18next.createInstance();

  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'ru',
  });

  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <WebSocketProvider api={chatApi(socket)}>
          <App socket={socket} />
        </WebSocketProvider>
      </Provider>
    </I18nextProvider>
  );
};

export default init;
