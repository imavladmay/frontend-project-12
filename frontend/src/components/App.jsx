import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import NotFound from '../pages/NotFound';
import SignIn from '../pages/SignIn';
import Chat from '../pages/Chat';
import PrivateRoute from './PrivateRoute';
import { routes } from '../utils/routes';
import AuthProvider from '../providers/AuthProvider';
import { addMessage } from '../store/entities/messagesSlice';
import { addChannel } from '../store/entities/channelsSlice';

const App = ({ socket }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('newMessage', (message) => {
      dispatch(addMessage(message));
    });
    socket.on('newChannel', (channel) => {
      dispatch(addChannel(channel));
    });
  });

  return (
    <AuthProvider>
      <div className="d-flex flex-column h-100">
        <BrowserRouter>
          <Routes>
            <Route path={routes.chat} element={<PrivateRoute><Chat /></PrivateRoute>} />
            <Route path={routes.signIn} element={<SignIn />} />
            <Route path={routes.notFound} element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
};

export default App;
