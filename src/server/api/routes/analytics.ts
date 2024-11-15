import express from 'express';
import { validateToken } from '../middleware/auth';
import { AnalyticsService } from '../services/analytics';
import { RoleGuard } from '../middleware/roleGuard';

const router = express.Router();

// Get overall platform analytics
router.get('/overview', 
  validateToken,
  RoleGuard.requireRole(['admin', 'educator']),
  async (req, res) => {
    try {
      const analytics = await AnalyticsService.getOverview();
      res.json(analytics);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch analytics' });
    }
});

// Get student progress analytics
router.get('/progress/:studentId',
  validateToken,
  RoleGuard.requireRole(['admin', 'educator']),
  async (req, res) => {
    try {
      const progress = await AnalyticsService.getStudentProgress(req.params.studentId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch student progress' });
    }
});

// Get engagement metrics
router.get('/engagement',
  validateToken,
  RoleGuard.requireRole(['admin', 'educator']),
  async (req, res) => {
    try {
      const engagement = await AnalyticsService.getEngagementMetrics();
      res.json(engagement);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch engagement metrics' });
    }
});

export default router;