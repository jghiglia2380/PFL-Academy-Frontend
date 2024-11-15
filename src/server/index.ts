import express from 'express';
import { lti, setup } from './lti.js';
import { ferpaCompliance, coppaCompliance, gdprCompliance } from './middleware/compliance';
import { errorHandler } from './middleware/errorHandler';
import { SessionManager } from './middleware/session';
import { csrfProtection } from './middleware/csrf';
import { SecurityManager } from './utils/SecurityManager';
import { AuditLogger } from './utils/AuditLogger';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

const app = express();

// Initialize security
SecurityManager.initialize();

// Basic security middleware
app.use(helmet());
app.use(cookieParser());
app.use(express.json());

// Session and CSRF protection
app.use(SessionManager.middleware);
app.use(csrfProtection);

// Setup LTI provider
await setup();

// Compliance middleware
app.use(ferpaCompliance);
app.use(coppaCompliance);
app.use(gdprCompliance);

// Global access logging
app.use((req, res, next) => {
  if (res.locals.token) {
    AuditLogger.logAccess(req, res.locals.token.user.id, 'page_access');
  }
  next();
});

// LTI Routes
app.use(lti.app);

// Error handling
app.use(errorHandler);

// Session cleanup interval
setInterval(() => {
  SessionManager.cleanup();
}, 15 * 60 * 1000); // Every 15 minutes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});