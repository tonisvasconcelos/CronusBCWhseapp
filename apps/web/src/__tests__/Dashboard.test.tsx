/**
 * Dashboard component tests
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from 'msal-browser';
import { Dashboard } from '../pages/Dashboard';

// Mock MSAL
const msalInstance = new PublicClientApplication({
  auth: {
    clientId: 'test-client-id',
    authority: 'https://login.microsoftonline.com/test-tenant',
  },
});

// Mock API queries
jest.mock('../api/queries/items', () => ({
  useItems: () => ({
    data: { value: [], '@odata.count': 0 },
    isLoading: false,
    error: null,
  }),
  useItemLedgerEntries: () => ({
    data: { value: [], '@odata.count': 0 },
    isLoading: false,
    error: null,
  }),
}));

jest.mock('../api/queries/purchaseOrders', () => ({
  usePurchaseOrders: () => ({
    data: { value: [], '@odata.count': 0 },
    isLoading: false,
    error: null,
  }),
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = createTestQueryClient();
  
  return (
    <MsalProvider instance={msalInstance}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </MsalProvider>
  );
};

describe('Dashboard', () => {
  it('renders dashboard title', () => {
    render(
      <TestWrapper>
        <Dashboard />
      </TestWrapper>
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders KPI cards', () => {
    render(
      <TestWrapper>
        <Dashboard />
      </TestWrapper>
    );

    expect(screen.getByText('Total Items')).toBeInTheDocument();
    expect(screen.getByText('Locations')).toBeInTheDocument();
    expect(screen.getByText('Active Vendors')).toBeInTheDocument();
    expect(screen.getByText('Open Purchase Orders')).toBeInTheDocument();
  });

  it('renders recent activity tables', () => {
    render(
      <TestWrapper>
        <Dashboard />
      </TestWrapper>
    );

    expect(screen.getByText('Recent Item Ledger Entries')).toBeInTheDocument();
    expect(screen.getByText('Recent Purchase Orders')).toBeInTheDocument();
  });
});
