/**
 * Express server setup
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { API_CONFIG } from './config.js';
import { requestLogger, addRequestId } from './middleware/requestLogger.js';
import { errorHandler } from './middleware/errorHandler.js';

// Import routes
import environmentsRouter from './bc/routes/environments.js';
import itemsRouter from './bc/routes/items.js';
import locationsRouter from './bc/routes/locations.js';
import vendorsRouter from './bc/routes/vendors.js';
import purchaseOrdersRouter from './bc/routes/purchaseOrders.js';

export function createServer(): express.Application {
  const app = express();

  // Security middleware
  app.use(helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }));

  // CORS configuration
  app.use(cors({
    origin: API_CONFIG.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  }));

  // Request ID middleware
  app.use(addRequestId);

  // Request logging
  app.use(requestLogger);

  // Body parsing middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ 
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  });

  // API routes
  app.use('/api/environments', environmentsRouter);
  app.use('/api/items', itemsRouter);
  app.use('/api/locations', locationsRouter);
  app.use('/api/vendors', vendorsRouter);
  app.use('/api/purchase-orders', purchaseOrdersRouter);

  // 404 handler
  app.use('*', (req, res) => {
    res.status(404).json({
      error: {
        code: '404',
        message: 'Route not found',
        traceId: req.headers['x-request-id'],
      },
    });
  });

  // Global error handler
  app.use(errorHandler);

  return app;
}
