import { Request, Response, NextFunction } from 'express';
import { ltiConfig } from '../config/lti.config';
import { logger } from '../utils/logger';

export class PrivacyManager {
  static filterClaims(token: any) {
    const filtered: any = {};
    
    // Always include required claims
    ltiConfig.privacy.requiredClaims.forEach(claim => {
      if (token[claim]) filtered[claim] = token[claim];
    });

    // Include optional claims if not anonymized
    if (!ltiConfig.privacy.anonymizeData) {
      ltiConfig.privacy.optionalClaims.forEach(claim => {
        if (token[claim]) filtered[claim] = token[claim];
      });
    }

    return filtered;
  }

  static anonymizeUser(userData: any) {
    if (!ltiConfig.privacy.anonymizeData) return userData;

    return {
      ...userData,
      name: `User ${userData.id.substr(-4)}`,
      email: `user-${userData.id.substr(-4)}@anonymous.edu`
    };
  }

  static middleware(req: Request, res: Response, next: NextFunction) {
    try {
      if (res.locals.token) {
        // Filter claims based on configuration
        const filteredToken = this.filterClaims(res.locals.token);
        
        // Anonymize user data if configured
        if (filteredToken.user) {
          filteredToken.user = this.anonymizeUser(filteredToken.user);
        }

        res.locals.token = filteredToken;
      }
      next();
    } catch (error) {
      logger.error('Privacy filtering failed:', error);
      next(error);
    }
  }
}