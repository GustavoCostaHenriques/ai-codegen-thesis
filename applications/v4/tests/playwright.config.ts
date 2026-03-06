import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export default defineConfig({
  testDir: './specs',
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [
    ['list'],
    ['html', { open: 'never' }]
  ],
  expect: {
    timeout: 10_000
  },
  timeout: 60_000,
  globalSetup: './global-setup.ts',
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: requireEnv('BASE_URL'),
        headless: true,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'on',
        storageState: 'storageState.json'
      }
    }
  ]
});

