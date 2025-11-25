
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface RequireAuthProps {
  children: React.ReactNode;
}

export const RequireAuth = ({ children }: RequireAuthProps) => {
  // Mock Authentication - Toggle this to false to test redirect
  const isAuthenticated = true; 
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  
  // Wrapping in Fragment to ensure valid React Node return type
  return <React.Fragment>{children}</React.Fragment>;
};
