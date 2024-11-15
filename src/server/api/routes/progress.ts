import express from 'express';
import { validateToken } from '../middleware/auth';
import { ProgressService } from '../services/progress';

const router = express.Router();

// Get student progress
router.get('/:studentId', validateToken, async (req, res) => {
  try {
    const progress = await ProgressService.getProgress(req.params.studentId);
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
});

// Update progress
router.post('/:studentId/update', validateToken, async (req, res) => {
  try {
    const { standardId, chapterId, completion } = req.body;
    const progress = await ProgressService.updateProgress(
      req.params.studentId,
      standardId,
      chapterId,
      completion
    );
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update progress' });
  }
});

export default router;