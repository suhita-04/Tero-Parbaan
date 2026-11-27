import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * ProtectedAdminRoute — guards /parbondesk.
 * Checks localStorage for 'pd_token' set after successful POST /api/admin-login.
 * Redirects to /parbondesk/login if not authenticated.
 */
export default function ProtectedAdminRoute({ children }) {
  const isAdmin = !!localStorage.getItem('pd_token');

  if (!isAdmin) {
    return <Navigate to="/parbondesk/login" replace />;
  }

  return children ? children : <Outlet />;
}
