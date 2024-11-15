import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export interface LtiError extends Error {
  code?: string;
  details?: any;
}

export function errorHandler(
  err: LtiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error('LTI Error:', {
    code: err.code,
    message: err.message,
    details: err.details,
    path: req.path,
    method: req.method,
    userId: res.locals.token?.user?.id
  });

  // Handle specific error types
  switch (err.code) {
    case 'TOKEN_EXPIRED':
      return res.status(401).json({
        error: 'Session expired',
        message: 'Please refresh the page to reconnect to your LMS'
      });
    
    case 'GRADE_SUBMISSION_FAILED':
      return res.status(500).json({
        error: 'Grade submission failed',
        message: 'Unable to submit grade to LMS. Your progress has been saved.'
      });
    
    case 'INVALID_DEEP_LINK':
      return res.status(400).json({
        error: 'Invalid resource link',
        message: 'Unable to create resource link. Please check parameters.'
      });
    
    default:
      return res.status(500).json({
        error: 'Internal server error',
        message: 'An unexpected error occurred. Please try again.'
      });
  }
}