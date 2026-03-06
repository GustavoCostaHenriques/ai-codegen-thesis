import 'dotenv/config';

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const e2eConfig = {
  baseURL: process.env.BASE_URL?.trim() || 'http://localhost',
  adminUsername: requireEnv('ADMIN_USERNAME'),
  adminPassword: requireEnv('ADMIN_PASSWORD'),
};
