import { Request, Response, NextFunction } from 'express';
import { ApiKeyService } from '../services/apiKey';

export const validateApiKey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    return res.status(401).json({ error: 'API key required' });
  }

  try {
    const isValid = await ApiKeyService.validateKey(apiKey.toString());
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid API key' });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: 'API key validation failed' });
  }
};