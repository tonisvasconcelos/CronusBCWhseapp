import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import App from '../App';

// Mock MSAL
vi.mock('../auth/msal', () => ({
  msalInstance: {
    initialize: vi.fn(),
    initializeWrapperLibrary: vi.fn(),
    getLogger: vi.fn(() => ({
      error: vi.fn(),
      warning: vi.fn(),
      info: vi.fn(),
      verbose: vi.fn(),
      clone: vi.fn(),
    })),
    addEventCallback: vi.fn(),
    removeEventCallback: vi.fn(),
    enableAccountStorageEvents: vi.fn(),
    disableAccountStorageEvents: vi.fn(),
    getConfiguration: vi.fn(),
    setConfiguration: vi.fn(),
    getActiveAccount: vi.fn(),
    getAllAccounts: vi.fn(),
    setActiveAccount: vi.fn(),
  },
  initializeMsal: vi.fn().mockResolvedValue(undefined),
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
