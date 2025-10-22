/**
 * Configuration loader with environment validation
 */

import { z } from 'zod';

// Environment schema for validation
const envSchema = z.object({
  // Business Central
  BC_TENANT_ID: z.string().default('demo-tenant'),
  BC_ENVIRONMENT: z.string().default('demo-environment'),
  BC_COMPANY_ID: z.string().default('demo-company'),
  BC_BASE_URL: z
    .string()
    .url('BC_BASE_URL must be a valid URL')
    .default('https://api.businesscentral.dynamics.com/v2.0'),

  // Azure AD
  AZURE_AD_TENANT_ID: z.string().default('demo-tenant-id'),
  AZURE_AD_CLIENT_ID_SPA: z.string().default('demo-client-id'),
  AZURE_AD_CLIENT_ID_API: z.string().default('demo-api-client-id'),
  AZURE_AD_CLIENT_SECRET_API: z.string().default('demo-secret'),

  // Frontend
  VITE_APP_NAME: z.string().default('CRONUS WHSE_BC and REACT'),
  VITE_API_BASE_URL: z
    .string()
    .url('VITE_API_BASE_URL must be a valid URL')
    .default('http://localhost:4000'),

  // Development
  USE_MOCKS: z
    .string()
    .transform(val => val === 'true')
    .default('true'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
});

// Type for the validated configuration
export type Config = z.infer<typeof envSchema>;

// Configuration loader function
export function loadConfig(): Config {
  try {
    // Check if we're in a browser environment
    const isBrowser = typeof window !== 'undefined';

    let envVars: Record<string, string> = {};

    if (isBrowser) {
      // In browser, use import.meta.env (Vite)
      const importMeta = import.meta;
      envVars = {
        BC_TENANT_ID: importMeta.env.VITE_BC_TENANT_ID || '',
        BC_ENVIRONMENT: importMeta.env.VITE_BC_ENVIRONMENT || '',
        BC_COMPANY_ID: importMeta.env.VITE_BC_COMPANY_ID || '',
        BC_BASE_URL:
          importMeta.env.VITE_BC_BASE_URL || 'https://api.businesscentral.dynamics.com/v2.0',
        AZURE_AD_TENANT_ID: importMeta.env.VITE_AZURE_AD_TENANT_ID || '',
        AZURE_AD_CLIENT_ID_SPA: importMeta.env.VITE_AZURE_AD_CLIENT_ID_SPA || '',
        AZURE_AD_CLIENT_ID_API: importMeta.env.VITE_AZURE_AD_CLIENT_ID_API || '',
        AZURE_AD_CLIENT_SECRET_API: importMeta.env.VITE_AZURE_AD_CLIENT_SECRET_API || '',
        VITE_APP_NAME: importMeta.env.VITE_APP_NAME || 'CRONUS WHSE_BC and REACT',
        VITE_API_BASE_URL: importMeta.env.VITE_API_BASE_URL || 'http://localhost:4000',
        USE_MOCKS: importMeta.env.VITE_USE_MOCKS || 'false',
        NODE_ENV: importMeta.env.MODE || 'development',
      };
    } else {
      // In Node.js, use process.env
      envVars = {
        BC_TENANT_ID: process.env.BC_TENANT_ID || '',
        BC_ENVIRONMENT: process.env.BC_ENVIRONMENT || '',
        BC_COMPANY_ID: process.env.BC_COMPANY_ID || '',
        BC_BASE_URL: process.env.BC_BASE_URL || 'https://api.businesscentral.dynamics.com/v2.0',
        AZURE_AD_TENANT_ID: process.env.AZURE_AD_TENANT_ID || '',
        AZURE_AD_CLIENT_ID_SPA: process.env.AZURE_AD_CLIENT_ID_SPA || '',
        AZURE_AD_CLIENT_ID_API: process.env.AZURE_AD_CLIENT_ID_API || '',
        AZURE_AD_CLIENT_SECRET_API: process.env.AZURE_AD_CLIENT_SECRET_API || '',
        VITE_APP_NAME: process.env.VITE_APP_NAME || 'CRONUS WHSE_BC and REACT',
        VITE_API_BASE_URL: process.env.VITE_API_BASE_URL || 'http://localhost:4000',
        USE_MOCKS: process.env.USE_MOCKS || 'false',
        NODE_ENV: process.env.NODE_ENV || 'development',
      };
    }

    return envSchema.parse(envVars);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
      throw new Error(`Configuration validation failed:\n${errorMessages.join('\n')}`);
    }
    throw error;
  }
}

// Helper function to build BC API URLs
export function buildBcApiUrl(config: Config, endpoint: string): string {
  return `${config.BC_BASE_URL}/${config.BC_TENANT_ID}/${config.BC_ENVIRONMENT}/api/v2.0/companies(${config.BC_COMPANY_ID})/${endpoint}`;
}

// Helper function to build Azure AD authority URL
export function buildAzureAuthorityUrl(tenantId: string): string {
  return `https://login.microsoftonline.com/${tenantId}`;
}

// Export a singleton config instance
let configInstance: Config | null = null;

export function getConfig(): Config {
  if (!configInstance) {
    configInstance = loadConfig();
  }
  return configInstance;
}
