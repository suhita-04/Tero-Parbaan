import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';

/**
 * ProtectedAdminRoute — guards /parbondesk.
 * Checks in-memory AdminAuthContext token set after successful POST /api/admin-login.
 * Redirects to /parbondesk/login if not authenticated.
 */
export default function ProtectedAdminRoute({ children }) {
  const { adminToken } = useAdminAuth();

  if (!adminToken) {
    return <Navigate to="/parbondesk/login" replace />;
  }

  return children ? children : <Outlet />;
}
