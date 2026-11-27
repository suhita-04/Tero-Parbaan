import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const AdminAuthContext = createContext(null);

const isParbondeskDashboard = (pathname) =>
  pathname === '/parbondesk' || pathname === '/parbondesk/';

/**
 * Stores the admin auth token strictly in React in-memory state (no localStorage/sessionStorage).
 * Automatically clears the token whenever the user navigates away from /parbondesk.
 */
export function AdminAuthProvider({ children }) {
  const [adminToken, setAdminToken] = useState(null);
  const { pathname } = useLocation();
  const prevPathRef = useRef(pathname);

  const clearAdminToken = useCallback(() => {
    setAdminToken(null);
  }, []);

  useEffect(() => {
    const prevPath = prevPathRef.current;
    prevPathRef.current = pathname;

    if (isParbondeskDashboard(prevPath) && !isParbondeskDashboard(pathname)) {
      setAdminToken(null);
    }
  }, [pathname]);

  return (
    <AdminAuthContext.Provider value={{ adminToken, setAdminToken, clearAdminToken }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return ctx;
}
