import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../server';

describe('Server', () => {
  it('should respond to health check', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });

  it('should respond to items endpoint', async () => {
    const response = await request(app).get('/api/items');
    expect(response.status).toBe(200);
  });
});