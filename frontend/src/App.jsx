import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import NotFound from './pages/NotFound';
import SignIn from './pages/SignIn';
import Chat from './pages/Chat';
import SignUp from './pages/SignUp';
import PrivateRoute from './components/PrivateRoute';
import MyNavbar from './components/Navbar';
import { routes } from './utils/routes';
import { addMessage } from './store/entities/messagesSlice';
import {
  addChannel,
  switchChannel,
  removeChannel,
  renameChannel,
} from './store/entities/channelsSlice';

const App = ({ socket }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('newMessage', (message) => {
      dispatch(addMessage(message));
    });
    socket.on('newChannel', (channel) => {
      dispatch(addChannel(channel));
      dispatch(switchChannel(channel.id));
    });
    socket.on('removeChannel', (channel) => {
      dispatch(removeChannel(channel));
    });
    socket.on('renameChannel', (channel) => {
      dispatch(renameChannel(channel));
    });
  });

  return (
    <div className="d-flex flex-column h-100">
      <BrowserRouter>
        <MyNavbar />
        <Routes>
          <Route path={routes.chat} element={<PrivateRoute><Chat /></PrivateRoute>} />
          <Route path={routes.signIn} element={<SignIn />} />
          <Route path={routes.signUp} element={<SignUp />} />
          <Route path={routes.notFound} element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
