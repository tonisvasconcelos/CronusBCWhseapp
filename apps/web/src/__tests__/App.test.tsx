import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import App from '../App';

// Mock MSAL
vi.mock('../auth/msal', () => ({
  msalInstance: {
    initialize: vi.fn().mockResolvedValue(undefined),
    initializeWrapperLibrary: vi.fn().mockResolvedValue(undefined),
    getLogger: vi.fn().mockReturnValue({
      error: vi.fn(),
      warning: vi.fn(),
      info: vi.fn(),
      verbose: vi.fn(),
      clone: vi.fn().mockReturnValue({
        error: vi.fn(),
        warning: vi.fn(),
        info: vi.fn(),
        verbose: vi.fn(),
      }),
    }),
    addEventCallback: vi.fn(),
    removeEventCallback: vi.fn(),
    enableAccountStorageEvents: vi.fn(),
    disableAccountStorageEvents: vi.fn(),
    getConfiguration: vi.fn().mockReturnValue({
      auth: {
        clientId: 'test-client-id',
        authority: 'https://login.microsoftonline.com/test-tenant',
      },
    }),
    setConfiguration: vi.fn(),
    getActiveAccount: vi.fn().mockReturnValue(null),
    getAllAccounts: vi.fn().mockReturnValue([]),
    setActiveAccount: vi.fn(),
  },
  initializeMsal: vi.fn().mockResolvedValue(undefined),
}));

// Mock MSAL React
vi.mock('@azure/msal-react', () => ({
  MsalProvider: ({ children }: { children: React.ReactNode }) => children,
  useMsal: () => ({
    instance: {
      initialize: vi.fn().mockResolvedValue(undefined),
      getLogger: vi.fn().mockReturnValue({
        error: vi.fn(),
        warning: vi.fn(),
        info: vi.fn(),
        verbose: vi.fn(),
        clone: vi.fn().mockReturnValue({
          error: vi.fn(),
          warning: vi.fn(),
          info: vi.fn(),
          verbose: vi.fn(),
        }),
      }),
      getAllAccounts: vi.fn().mockReturnValue([]),
      getActiveAccount: vi.fn().mockReturnValue(null),
      setActiveAccount: vi.fn(),
      addEventCallback: vi.fn(),
      removeEventCallback: vi.fn(),
      enableAccountStorageEvents: vi.fn(),
      disableAccountStorageEvents: vi.fn(),
    },
    inProgress: 'none',
    accounts: [],
  }),
  useMsalAuthentication: () => ({
    login: vi.fn(),
    logout: vi.fn(),
    result: null,
    error: null,
  }),
}));

// Mock React Query
vi.mock('@tanstack/react-query', () => ({
  QueryClient: vi.fn(),
  QueryClientProvider: ({ children }: { children: React.ReactNode }) => children,
}));

describe('App', () => {
  it('should render without crashing', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    // Just check that the component renders without throwing
    expect(document.body).toBeDefined();
  });
});
