import { Request, Response, NextFunction } from 'express';
import { SecurityManager } from '../utils/SecurityManager';
import { logger } from '../utils/logger';

export function csrfProtection(req: Request, res: Response, next: NextFunction) {
  if (req.method === 'GET') {
    const token = SecurityManager.generateCSRFToken();
    res.cookie('csrf-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    next();
  } else {
    const token = req.headers['x-csrf-token'];
    const cookie = req.cookies['csrf-token'];

    if (!token || !cookie || token !== cookie) {
      logger.warn('CSRF token validation failed', {
        ip: req.ip,
        path: req.path
      });
      return res.status(403).json({ error: 'Invalid CSRF token' });
    }

    next();
  }
}