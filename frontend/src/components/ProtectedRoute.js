import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, isLoggedIn, redirectTo }) => {
  return isLoggedIn ? (
    <Navigate to={redirectTo} replace />
  ) : (
    element
  );
};

export default ProtectedRoute;
