import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  timeout: 60_000,
  use: {
    baseURL: process.env.BASE_URL || 'https://demo.vercel.store',
    headless: process.env.HEADLESS !== 'false',
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
});
