import { Request, Response, NextFunction } from 'express';
import { SecurityManager } from '../utils/SecurityManager';
import { logger } from '../utils/logger';

interface SessionData {
  id: string;
  userId: string;
  expiresAt: Date;
  lastActivity: Date;
  data: Record<string, any>;
}

export class SessionManager {
  private static sessions = new Map<string, SessionData>();
  private static readonly SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  static middleware(req: Request, res: Response, next: NextFunction) {
    try {
      const sessionId = req.cookies['session-id'];
      if (!sessionId) {
        return this.createSession(req, res, next);
      }

      const session = this.sessions.get(sessionId);
      if (!session || new Date(session.expiresAt) < new Date()) {
        return this.createSession(req, res, next);
      }

      // Update last activity
      session.lastActivity = new Date();
      this.sessions.set(sessionId, session);

      // Attach session to request
      req.session = session.data;
      next();
    } catch (error) {
      logger.error('Session middleware error:', error);
      next(error);
    }
  }

  private static createSession(req: Request, res: Response, next: NextFunction) {
    const sessionId = SecurityManager.generateCSRFToken();
    const session: SessionData = {
      id: sessionId,
      userId: req.user?.id,
      expiresAt: new Date(Date.now() + this.SESSION_DURATION),
      lastActivity: new Date(),
      data: {}
    };

    this.sessions.set(sessionId, session);

    res.cookie('session-id', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: this.SESSION_DURATION
    });

    req.session = session.data;
    next();
  }

  static async persistSession(sessionId: string) {
    const session = this.sessions.get(sessionId);
    if (!session) return;

    try {
      // Implement session persistence logic here
      // This could be to Redis, database, etc.
      logger.info('Session persisted', { sessionId });
    } catch (error) {
      logger.error('Failed to persist session:', error);
    }
  }

  static cleanup() {
    const now = new Date();
    for (const [sessionId, session] of this.sessions.entries()) {
      if (session.expiresAt < now) {
        this.sessions.delete(sessionId);
        logger.info('Session cleaned up', { sessionId });
      }
    }
  }
}