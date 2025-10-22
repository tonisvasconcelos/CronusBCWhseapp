import request from 'supertest';
import { createServer } from '../server';

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
