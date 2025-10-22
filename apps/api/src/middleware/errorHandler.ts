/**
 * Global error handler middleware
 */

import { Request, Response, NextFunction } from 'express';
import type { ApiError } from '@cronusapp/shared';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export function errorHandler(
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const statusCode = error.statusCode || 500;
  const isOperational = error.isOperational || false;

  // Log error details
  console.error('Error occurred:', {
    message: error.message,
    stack: error.stack,
    statusCode,
    isOperational,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString(),
  });

  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  const apiError: ApiError = {
    error: {
      code: statusCode.toString(),
      message: isDevelopment ? error.message : 'Internal server error',
      details: isDevelopment ? error.stack : undefined,
      traceId: req.headers['x-request-id'] as string || generateTraceId(),
    },
  };

  res.status(statusCode).json(apiError);
}

export function createError(message: string, statusCode: number = 500): AppError {
  const error = new Error(message) as AppError;
  error.statusCode = statusCode;
  error.isOperational = true;
  return error;
}

function generateTraceId(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}
