import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PageNotFound from './PageNotFound';
import SignInPage from './SignInPage';
import ChatPage from './ChatPage';
import routes from '../routes/routes';
import AuthProvider, { useAuth } from '../providers/AuthProvider';
import { addMessage } from '../slices/messagesSlice';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = ({ socket }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('newMessage', (message) => {
      dispatch(addMessage(message));
    });
  });

  return (
    <AuthProvider>
      <div className="d-flex flex-column h-100">
        <BrowserRouter>
          <Routes>
            <Route path={routes.mainPage()} element={<PrivateRoute><ChatPage /></PrivateRoute>} />
            <Route path={routes.signInPage()} element={<SignInPage />} />
            <Route path={routes.pageNotFound()} element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
};

export default App;
