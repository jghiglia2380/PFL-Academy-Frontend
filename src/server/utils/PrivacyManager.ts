import { createHash } from 'crypto';
import { LtiToken } from '../../types/lti';

export class PrivacyManager {
  private static readonly MINIMUM_AGE = 13;
  private static readonly CONSENT_CACHE = new Map<string, boolean>();

  static hasValidAccess(token: LtiToken): boolean {
    if (!token) return false;
    
    // Verify user has appropriate role-based access
    const validRoles = ['admin', 'educator', 'student'];
    return token.roles.some(role => validRoles.includes(role));
  }

  static isUnderAge(token: LtiToken): boolean {
    // Check if user's age is under COPPA threshold
    const birthDate = token.user?.birthDate;
    if (!birthDate) return true; // Assume under age if no birth date

    const age = this.calculateAge(new Date(birthDate));
    return age < this.MINIMUM_AGE;
  }

  static hasParentalConsent(token: LtiToken): boolean {
    const userId = token.user.id;
    return this.CONSENT_CACHE.get(userId) || false;
  }

  static anonymizeData(data: any): any {
    if (!data) return data;

    // Remove sensitive fields
    const sensitiveFields = ['ssn', 'birthDate', 'phoneNumber'];
    const anonymized = { ...data };
    
    sensitiveFields.forEach(field => {
      if (field in anonymized) {
        delete anonymized[field];
      }
    });

    // Hash identifiable information
    if (anonymized.email) {
      anonymized.email = this.hashIdentifier(anonymized.email);
    }

    return anonymized;
  }

  private static calculateAge(birthDate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }

  private static hashIdentifier(value: string): string {
    return createHash('sha256').update(value).digest('hex');
  }
}