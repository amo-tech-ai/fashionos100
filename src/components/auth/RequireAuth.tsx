
import React, { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export const RequireAuth: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  // Mock Authentication - Toggle this to false to test redirect
  const isAuthenticated = true; 
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  
  // Wrapping in Fragment to ensure valid React Node return type
  return <React.Fragment>{children}</React.Fragment>;
};
