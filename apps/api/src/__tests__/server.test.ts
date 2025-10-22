/**
 * Server tests
 */

import request from 'supertest';
import { createServer } from '../server.js';

describe('Server', () => {
  const app = createServer();

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'ok');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('uptime');
    });
  });

  describe('GET /api/items', () => {
    it('should return items data', async () => {
      const response = await request(app)
        .get('/api/items')
        .expect(200);

      expect(response.body).toHaveProperty('value');
      expect(response.body).toHaveProperty('@odata.context');
      expect(Array.isArray(response.body.value)).toBe(true);
    });

    it('should support query parameters', async () => {
      const response = await request(app)
        .get('/api/items?$top=5')
        .expect(200);

      expect(response.body).toHaveProperty('value');
    });
  });

  describe('404 handler', () => {
    it('should return 404 for unknown routes', async () => {
      const response = await request(app)
        .get('/unknown-route')
        .expect(404);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toHaveProperty('code', '404');
      expect(response.body.error).toHaveProperty('message', 'Route not found');
    });
  });
});
