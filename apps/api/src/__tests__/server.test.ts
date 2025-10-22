import request from 'supertest';
import { createServer } from '../server';

// Mock the shared package to avoid ES module issues
jest.mock('@cronusapp/shared', () => ({
  getConfig: jest.fn(() => ({
    BC_TENANT_ID: 'test-tenant',
    BC_ENVIRONMENT: 'test-env',
    BC_COMPANY_ID: 'test-company',
    BC_BASE_URL: 'https://api.businesscentral.dynamics.com/v2.0',
    AZURE_AD_TENANT_ID: 'test-tenant-id',
    AZURE_AD_CLIENT_ID_SPA: 'test-client-id',
    AZURE_AD_CLIENT_ID_API: 'test-api-client-id',
    AZURE_AD_CLIENT_SECRET_API: 'test-secret',
    APP_NAME: 'test-app',
    API_BASE_URL: 'http://localhost:4000',
    USE_MOCKS: true,
  })),
  buildBcApiUrl: jest.fn(
    (config, endpoint) =>
      `https://api.businesscentral.dynamics.com/v2.0/${config.BC_TENANT_ID}/${config.BC_ENVIRONMENT}/api/v2.0/${endpoint}`,
  ),
}));

describe('Server', () => {
  const app = createServer();

  it('should respond to health check', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  it('should respond to items endpoint', async () => {
    const response = await request(app).get('/api/items');
    expect(response.status).toBe(200);
  });
});
