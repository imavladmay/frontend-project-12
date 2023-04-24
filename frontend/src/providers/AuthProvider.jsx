import {
  createContext,
  useContext,
  useState,
  useMemo,
} from 'react';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);

  const logOut = () => {
    localStorage.removeItem('userData');
    setLoggedIn(false);
  };

  const memoizedValue = useMemo(() => ({ loggedIn, logIn, logOut }), [loggedIn]);

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth };
export default AuthProvider;
