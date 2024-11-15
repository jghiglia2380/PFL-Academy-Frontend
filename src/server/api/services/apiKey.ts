import { createHash } from 'crypto';

export class ApiKeyService {
  private static readonly keys = new Map<string, {
    organization: string;
    permissions: string[];
    expiresAt: Date;
  }>();

  static async validateKey(apiKey: string): Promise<boolean> {
    const hashedKey = this.hashKey(apiKey);
    const keyData = this.keys.get(hashedKey);

    if (!keyData) return false;
    if (keyData.expiresAt < new Date()) return false;

    return true;
  }

  static async createKey(organization: string, permissions: string[]): Promise<string> {
    const apiKey = this.generateKey();
    const hashedKey = this.hashKey(apiKey);

    this.keys.set(hashedKey, {
      organization,
      permissions,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year
    });

    return apiKey;
  }

  private static generateKey(): string {
    return `pfl_${this.randomString(32)}`;
  }

  private static hashKey(key: string): string {
    return createHash('sha256').update(key).digest('hex');
  }

  private static randomString(length: number): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}