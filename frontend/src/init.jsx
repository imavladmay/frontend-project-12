import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { io } from 'socket.io-client';
import i18next from 'i18next';
import filter from 'leo-profanity';

import store from './store/index';
import App from './App';
import resources from './locales/index.js';
import chatApi from './api/chat.js';
import WebSocketProvider from './providers/WebSocketProvider.jsx';
import WordFilterProvider from './providers/WordFilterProvider';
import './styles/index.scss';

const rollbarConfig = {
  accessToken: process.env.ROLLBAR_TOKEN,
  environment: 'production',
  addErrorContext: true,
  captureUncaught: true,
  captureUnhandledRejections: true,
  captureIp: true,
};

const init = async () => {
  const socket = io();

  const i18n = i18next.createInstance();

  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'ru',
  });

  filter.add(filter.getDictionary('ru'));
  filter.add(filter.getDictionary('en'));

  return (
    <RollbarProvider config={rollbarConfig}>
      <I18nextProvider i18n={i18n}>
        <WordFilterProvider filter={filter}>
          <StoreProvider store={store}>
            <WebSocketProvider api={chatApi(socket)}>
              <ErrorBoundary>
                <App socket={socket} />
              </ErrorBoundary>
            </WebSocketProvider>
          </StoreProvider>
        </WordFilterProvider>
      </I18nextProvider>
    </RollbarProvider>
  );
};

export default init;
