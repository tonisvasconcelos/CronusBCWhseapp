/**
 * Request logging middleware
 */

import { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';

// Custom morgan token for request ID
morgan.token('request-id', (req: Request) => {
  return (req.headers['x-request-id'] as string) || 'unknown';
});

// Custom morgan format
const morganFormat =
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :request-id';

export const requestLogger = morgan(morganFormat, {
  skip: (req: Request) => {
    // Skip logging for health checks
    return req.url === '/health';
  },
}) as any;

// Middleware to add request ID if not present
export function addRequestId(req: Request, res: Response, next: NextFunction): void {
  if (!req.headers['x-request-id']) {
    req.headers['x-request-id'] = generateRequestId();
  }
  next();
}

function generateRequestId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
