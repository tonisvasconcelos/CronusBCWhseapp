/**
 * MSAL configuration for Microsoft Entra ID authentication
 */

import { PublicClientApplication, Configuration, LogLevel } from '@azure/msal-browser';
import { getConfig } from '@cronusapp/shared';
import { getRedirectUri } from '../config/github-pages';

// MSAL configuration
const msalConfig: Configuration = {
  auth: {
    clientId: getConfig().AZURE_AD_CLIENT_ID_SPA,
    authority: `https://login.microsoftonline.com/${getConfig().AZURE_AD_TENANT_ID}`,
    redirectUri: getRedirectUri(),
    postLogoutRedirectUri: getRedirectUri(),
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            break;
          case LogLevel.Info:
            console.info(message);
            break;
          case LogLevel.Verbose:
            console.debug(message);
            break;
          case LogLevel.Warning:
            console.warn(message);
            break;
        }
      },
    },
  },
};

// Login scopes
export const loginRequest = {
  scopes: ['User.Read'],
};

// Create MSAL instance
export const msalInstance = new PublicClientApplication(msalConfig);

// Initialize MSAL
export const initializeMsal = async (): Promise<void> => {
  try {
    await msalInstance.initialize();
  } catch (error) {
    console.error('Failed to initialize MSAL:', error);
    throw error;
  }
};
