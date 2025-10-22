import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

// Mock MSAL
vi.mock('../auth/msal', () => ({
  msalInstance: {
    initialize: vi.fn(),
  },
}));

describe('App', () => {
  it('should render without crashing', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
