import { describe, it, expect } from 'vitest';
import { loadConfig } from '../config';

describe('Config', () => {
  it('should load configuration', () => {
    // Mock environment variables
    const originalEnv = process.env;
    process.env = {
      ...originalEnv,
      BC_TENANT_ID: 'test-tenant',
      BC_ENVIRONMENT: 'test-env',
      BC_COMPANY_ID: 'test-company',
      BC_BASE_URL: 'https://test.bc.com',
      AZURE_AD_TENANT_ID: 'test-azure-tenant',
      AZURE_AD_CLIENT_ID_SPA: 'test-spa-client',
      AZURE_AD_CLIENT_ID_API: 'test-api-client',
      AZURE_AD_CLIENT_SECRET_API: 'test-secret',
      APP_NAME: 'Test App',
      API_BASE_URL: 'https://test-api.com',
      USE_MOCKS: 'true',
    };

    try {
      const config = loadConfig();
      expect(config).toBeDefined();
      expect(config.bcTenantId).toBe('test-tenant');
    } finally {
      process.env = originalEnv;
    }
  });
});
