import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { loadConfig } from '../config';

describe('Config', () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    // Store original environment
    originalEnv = { ...process.env };
    
    // Set test environment variables (using the correct names from config.ts)
    process.env.BC_TENANT_ID = 'test-tenant';
    process.env.BC_ENVIRONMENT = 'test-env';
    process.env.BC_COMPANY_ID = 'test-company';
    process.env.BC_BASE_URL = 'https://test.bc.com';
    process.env.AZURE_AD_TENANT_ID = 'test-azure-tenant';
    process.env.AZURE_AD_CLIENT_ID_SPA = 'test-spa-client';
    process.env.AZURE_AD_CLIENT_ID_API = 'test-api-client';
    process.env.AZURE_AD_CLIENT_SECRET_API = 'test-secret';
    process.env.VITE_APP_NAME = 'Test App';
    process.env.VITE_API_BASE_URL = 'https://test-api.com';
    process.env.USE_MOCKS = 'true';
  });

  afterEach(() => {
    // Restore original environment
    process.env = originalEnv;
  });

  it('should load configuration', () => {
    const config = loadConfig();
    expect(config).toBeDefined();
    expect(config.BC_TENANT_ID).toBe('test-tenant');
    expect(config.BC_ENVIRONMENT).toBe('test-env');
    expect(config.BC_COMPANY_ID).toBe('test-company');
    expect(config.BC_BASE_URL).toBe('https://test.bc.com');
  });
});
