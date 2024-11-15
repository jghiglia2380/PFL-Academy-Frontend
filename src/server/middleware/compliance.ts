import { Request, Response, NextFunction } from 'express';
import { PrivacyManager } from '../utils/PrivacyManager';
import { SecurityManager } from '../utils/SecurityManager';
import { AuditLogger } from '../utils/AuditLogger';

// FERPA compliance middleware
export const ferpaCompliance = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Ensure educational record access is authorized
    const token = res.locals.token;
    if (!PrivacyManager.hasValidAccess(token)) {
      return res.status(403).json({
        error: 'Access Denied',
        message: 'Unauthorized access to educational records'
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};

// COPPA compliance middleware
export const coppaCompliance = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = res.locals.token;
    if (PrivacyManager.isUnderAge(token)) {
      // Ensure parental consent is verified
      if (!PrivacyManager.hasParentalConsent(token)) {
        return res.status(403).json({
          error: 'Parental Consent Required',
          message: 'Access requires verified parental consent'
        });
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};

// GDPR compliance middleware
export const gdprCompliance = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Add GDPR-required headers
    res.set({
      'Privacy-Policy': '/privacy',
      'Data-Processing-Agreement': '/dpa',
      'Data-Protection-Officer': 'dpo@pflacademy.com'
    });
    next();
  } catch (error) {
    next(error);
  }
};