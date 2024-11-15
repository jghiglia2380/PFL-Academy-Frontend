import { createCipheriv, createDecipheriv, randomBytes, createHash } from 'crypto';
import { Request } from 'express';
import { logger } from './logger';

interface EncryptionKey {
  key: Buffer;
  createdAt: Date;
  expiresAt: Date;
}

export class SecurityManager {
  private static readonly ALGORITHM = 'aes-256-gcm';
  private static readonly KEY_ROTATION_DAYS = 30;
  private static encryptionKeys: Map<string, EncryptionKey> = new Map();
  private static currentKeyId: string;

  static initialize() {
    this.rotateEncryptionKey();
    // Set up automatic key rotation
    setInterval(() => this.rotateEncryptionKey(), this.KEY_ROTATION_DAYS * 24 * 60 * 60 * 1000);
  }

  static rotateEncryptionKey() {
    const keyId = randomBytes(8).toString('hex');
    const key: EncryptionKey = {
      key: randomBytes(32),
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + this.KEY_ROTATION_DAYS * 24 * 60 * 60 * 1000)
    };

    this.encryptionKeys.set(keyId, key);
    this.currentKeyId = keyId;

    // Clean up expired keys
    for (const [id, key] of this.encryptionKeys.entries()) {
      if (key.expiresAt < new Date()) {
        this.encryptionKeys.delete(id);
      }
    }

    logger.info('Encryption key rotated', { keyId });
  }

  static encrypt(data: string): { encrypted: string; iv: string; tag: string; keyId: string } {
    const iv = randomBytes(12);
    const key = this.encryptionKeys.get(this.currentKeyId)!;
    const cipher = createCipheriv(this.ALGORITHM, key.key, iv);
    
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    return {
      encrypted,
      iv: iv.toString('hex'),
      tag: cipher.getAuthTag().toString('hex'),
      keyId: this.currentKeyId
    };
  }

  static decrypt(encrypted: string, iv: string, tag: string, keyId: string): string {
    const key = this.encryptionKeys.get(keyId);
    if (!key) {
      throw new Error('Encryption key not found');
    }

    const decipher = createDecipheriv(
      this.ALGORITHM,
      key.key,
      Buffer.from(iv, 'hex')
    );
    
    decipher.setAuthTag(Buffer.from(tag, 'hex'));
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }

  static validateRequest(req: Request): boolean {
    try {
      // Validate request headers and tokens
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) return false;

      // Additional security checks
      const isSecure = req.secure || req.headers['x-forwarded-proto'] === 'https';
      const hasValidOrigin = this.validateOrigin(req.headers.origin);
      const hasValidCSRF = this.validateCSRFToken(req);
      const hasValidSession = this.validateSession(req);

      return isSecure && hasValidOrigin && hasValidCSRF && hasValidSession;
    } catch (error) {
      logger.error('Request validation failed:', error);
      return false;
    }
  }

  private static validateOrigin(origin: string | undefined): boolean {
    if (!origin) return false;
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
      'https://pflacademy.com',
      'https://lms.pflacademy.com'
    ];
    return allowedOrigins.includes(origin);
  }

  private static validateCSRFToken(req: Request): boolean {
    const token = req.headers['x-csrf-token'];
    const cookie = req.cookies['csrf-token'];
    return token === cookie;
  }

  private static validateSession(req: Request): boolean {
    const sessionId = req.cookies['session-id'];
    if (!sessionId) return false;

    // Check session expiry and activity
    const session = this.getSession(sessionId);
    if (!session) return false;

    const isExpired = new Date(session.expiresAt) < new Date();
    const isInactive = new Date(session.lastActivity).getTime() + 30 * 60 * 1000 < Date.now();

    return !isExpired && !isInactive;
  }

  private static getSession(sessionId: string): any {
    // Implementation would depend on your session storage mechanism
    return null; // Placeholder
  }

  static generateCSRFToken(): string {
    return randomBytes(32).toString('hex');
  }

  static hashPassword(password: string, salt: string): string {
    return createHash('sha256')
      .update(password + salt)
      .digest('hex');
  }
}