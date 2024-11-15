import { Request, Response, NextFunction } from 'express';
import { lti } from '../lti';
import { logger } from '../utils/logger';
import { ltiConfig } from '../config/lti.config';

export class SessionManager {
  static async checkSession(req: Request, res: Response, next: NextFunction) {
    const token = res.locals.token;
    if (!token) return next();

    try {
      const sessionExpiry = new Date(token.exp * 1000);
      const now = new Date();
      const minutesUntilExpiry = (sessionExpiry.getTime() - now.getTime()) / (1000 * 60);

      // Check if session needs renewal
      if (minutesUntilExpiry <= ltiConfig.session.renewalThresholdMinutes) {
        // Attempt to refresh the token
        const newToken = await lti.token.refresh(token);
        if (newToken) {
          res.locals.token = newToken;
          // Notify client of session extension
          res.set('X-Session-Extended', 'true');
        }
      }

      // Add session info to response headers
      res.set('X-Session-Expires-In', Math.floor(minutesUntilExpiry).toString());
      next();
    } catch (error) {
      logger.error('Session check failed:', error);
      next(error);
    }
  }

  static async handleSessionTimeout(req: Request, res: Response) {
    try {
      // Save current state if needed
      const state = req.body.state;
      if (state) {
        // Store state temporarily
        await lti.cache.set(`session:${res.locals.token.user.id}`, state, 300); // 5 minutes
      }

      // Return instructions for client
      res.status(401).json({
        error: 'SESSION_TIMEOUT',
        message: 'Your session has expired. Please refresh to continue.',
        hasState: !!state
      });
    } catch (error) {
      logger.error('Session timeout handling failed:', error);
      res.status(500).json({ error: 'Failed to handle session timeout' });
    }
  }
}