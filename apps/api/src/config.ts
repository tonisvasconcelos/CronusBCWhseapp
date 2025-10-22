/**
 * API-specific configuration
 */

import { getConfig } from '@cronusapp/shared';

export const config = getConfig();

export const API_CONFIG = {
  PORT: process.env.PORT || 4000,
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
} as const;
