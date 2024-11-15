import express from 'express';
import { validateLtiToken } from '../middleware/auth.js';
import { lti } from '../lti.js';

const router = express.Router();

// LTI launch endpoint
router.post('/launch', async (req, res) => {
  try {
    const token = res.locals.token;
    const userData = {
      id: token.user.id,
      name: token.user.name,
      email: token.user.email,
      roles: token.roles,
    };
    
    res.json({ user: userData });
  } catch (err) {
    console.error('Launch error:', err);
    res.status(500).json({ error: 'Launch failed' });
  }
});

// Validate LTI session
router.get('/validate', validateLtiToken, (req, res) => {
  const token = res.locals.token;
  res.json(token);
});

// Grade passback endpoint
router.post('/grade', validateLtiToken, async (req, res) => {
  try {
    const { score, activityId } = req.body;
    const token = res.locals.token;
    
    const scoreResult = await lti.Grade.scorePublish(token, score, {
      activityProgress: 'Completed',
      gradingProgress: 'FullyGraded',
      timestamp: new Date().toISOString(),
    });
    
    res.json(scoreResult);
  } catch (err) {
    console.error('Grade submission error:', err);
    res.status(500).json({ error: 'Failed to submit grade' });
  }
});

export default router;