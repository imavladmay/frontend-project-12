import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

import { routes } from '../utils/routes';

const PrivateRoute = ({ children }) => {
  const location = useLocation();

  const token = localStorage.getItem('userData');

  return (
    token ? children : <Navigate to={routes.signIn} state={{ from: location }} />
  );
};

export default PrivateRoute;
