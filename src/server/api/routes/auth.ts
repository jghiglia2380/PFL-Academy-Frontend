import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { validateToken } from '../middleware/auth';

const router = express.Router();
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// SSO with Google
router.post('/google', async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    if (!payload) throw new Error('Invalid token payload');

    const user = {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture
    };

    // Create session token
    const sessionToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    res.json({ token: sessionToken, user });
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
});

// Microsoft SSO endpoint
router.post('/microsoft', async (req, res) => {
  // Implement Microsoft authentication
  res.status(501).json({ message: 'Microsoft SSO coming soon' });
});

// Validate session
router.get('/session', validateToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

export default router;