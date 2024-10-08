import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token'); // Check your authentication logic here
  
  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Element /> : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoute;
