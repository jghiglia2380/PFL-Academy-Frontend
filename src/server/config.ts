import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../../.env') });

export const config = {
  lti: {
    key: process.env.LTI_KEY_ID || 'KEYID',
    clientId: process.env.LTI_CLIENT_ID || 'CLIENTID',
    platformUrl: process.env.LTI_PLATFORM_URL || 'https://platform.url',
  },
  server: {
    port: parseInt(process.env.PORT || '3000', 10),
    env: process.env.NODE_ENV || 'development',
  },
  database: {
    url: 'sqlite::memory:', // Using in-memory SQLite for development
  }
};