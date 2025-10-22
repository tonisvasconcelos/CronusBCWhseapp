/**
 * Main App component
 */

import React, { useEffect } from 'react';
import { AppRoutes } from './routes';
import { initializeMsal } from './auth/msal';

function App() {
  useEffect(() => {
    // Initialize MSAL when the app starts
    initializeMsal().catch((error) => {
      console.error('Failed to initialize MSAL:', error);
    });
  }, []);

  return <AppRoutes />;
}

export default App;
