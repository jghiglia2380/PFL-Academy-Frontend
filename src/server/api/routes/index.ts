import express from 'express';
import authRoutes from './auth';
import analyticsRoutes from './analytics';
import progressRoutes from './progress';
import { validateApiKey } from '../middleware/apiAuth';

const router = express.Router();

// API authentication middleware
router.use(validateApiKey);

// Mount route groups
router.use('/auth', authRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/progress', progressRoutes);

export default router;