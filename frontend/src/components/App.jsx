import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import PageNotFound from './PageNotFound';
import SignInPage from './SignInPage';
import ChatPage from './ChatPage';
import routes from '../routes/routes';
import AuthProvider, { useAuth } from '../providers/AuthProvider';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => (
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

export default App;
