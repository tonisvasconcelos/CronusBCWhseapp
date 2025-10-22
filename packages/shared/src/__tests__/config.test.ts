import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { loadConfig } from '../config';

describe('Config', () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    // Store original environment
    originalEnv = { ...process.env };
    
    // Set test environment variables
    process.env.BC_TENANT_ID = 'test-tenant';
    process.env.BC_ENVIRONMENT = 'test-env';
    process.env.BC_COMPANY_ID = 'test-company';
    process.env.BC_BASE_URL = 'https://test.bc.com';
    process.env.AZURE_AD_TENANT_ID = 'test-azure-tenant';
    process.env.AZURE_AD_CLIENT_ID_SPA = 'test-spa-client';
    process.env.AZURE_AD_CLIENT_ID_API = 'test-api-client';
    process.env.AZURE_AD_CLIENT_SECRET_API = 'test-secret';
    process.env.APP_NAME = 'Test App';
    process.env.API_BASE_URL = 'https://test-api.com';
    process.env.USE_MOCKS = 'true';
  });

  afterEach(() => {
    // Restore original environment
    process.env = originalEnv;
  });

  it('should load configuration', () => {
    const config = loadConfig();
    expect(config).toBeDefined();
    expect(config.bcTenantId).toBe('test-tenant');
    expect(config.bcEnvironment).toBe('test-env');
    expect(config.bcCompanyId).toBe('test-company');
    expect(config.bcBaseUrl).toBe('https://test.bc.com');
  });
});
