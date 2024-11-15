import { Request, Response, NextFunction } from 'express';
import { lti } from '../lti.js';

export async function validateLtiToken(req: Request, res: Response, next: NextFunction) {
  try {
    const token = await lti.validateToken(req, res);
    if (!token) {
      return res.status(401).json({ error: 'Invalid LTI token' });
    }
    res.locals.token = token;
    next();
  } catch (err) {
    console.error('LTI token validation error:', err);
    res.status(401).json({ error: 'LTI authentication failed' });
  }
}