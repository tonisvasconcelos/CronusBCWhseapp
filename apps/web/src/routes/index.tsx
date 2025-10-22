/**
 * Application routes configuration
 */

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MsalProvider } from '@azure/msal-react';
import { msalInstance } from '../auth/msal';
import { RequireAuth } from '../auth/RequireAuth';
import { Shell } from '../components/layout/Shell';
import { Login } from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';
import { Items } from '../pages/Items';
import { Locations } from '../pages/Locations';
import { Vendors } from '../pages/Vendors';
import { PurchaseOrders } from '../pages/PurchaseOrders';

export const AppRoutes: React.FC = () => {
  return (
    <MsalProvider instance={msalInstance}>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected routes */}
        <Route
          path="/"
          element={
            <RequireAuth>
              <Shell>
                <Navigate to="/dashboard" replace />
              </Shell>
            </RequireAuth>
          }
        />
        
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Shell>
                <Dashboard />
              </Shell>
            </RequireAuth>
          }
        />
        
        <Route
          path="/items"
          element={
            <RequireAuth>
              <Shell>
                <Items />
              </Shell>
            </RequireAuth>
          }
        />
        
        <Route
          path="/locations"
          element={
            <RequireAuth>
              <Shell>
                <Locations />
              </Shell>
            </RequireAuth>
          }
        />
        
        <Route
          path="/vendors"
          element={
            <RequireAuth>
              <Shell>
                <Vendors />
              </Shell>
            </RequireAuth>
          }
        />
        
        <Route
          path="/purchase-orders"
          element={
            <RequireAuth>
              <Shell>
                <PurchaseOrders />
              </Shell>
            </RequireAuth>
          }
        />
        
        {/* Catch all route */}
        <Route
          path="*"
          element={
            <RequireAuth>
              <Shell>
                <Navigate to="/dashboard" replace />
              </Shell>
            </RequireAuth>
          }
        />
      </Routes>
    </MsalProvider>
  );
};
