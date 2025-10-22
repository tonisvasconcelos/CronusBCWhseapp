/**
 * API server entry point
 */

import { createServer } from './server.js';
import { API_CONFIG } from './config.js';

const app = createServer();

const server = app.listen(API_CONFIG.PORT, () => {
  console.log(`🚀 API server running on port ${API_CONFIG.PORT}`);
  console.log(`📊 Health check: http://localhost:${API_CONFIG.PORT}/health`);
  console.log(`🔗 CORS enabled for: ${API_CONFIG.CORS_ORIGIN}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});
