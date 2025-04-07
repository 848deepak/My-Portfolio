import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children,
  requireAdmin = true
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Redirect unauthenticated users to login
  if (!loading && !user) {
    // Store the path they were trying to access for redirect after login
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // For admin-only routes, check if the user is an admin
  if (requireAdmin && !loading && user && !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If authenticated and passes all checks, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute; 