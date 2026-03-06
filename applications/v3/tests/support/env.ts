export type Credentials = {
  username: string;
  password: string;
};

function readEnv(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (!value) {
    throw new Error(
      `Missing environment variable "${name}". Define it in tests/.env or the CI environment.`,
    );
  }

  return value;
}

export const testUsers: { admin: Credentials; viewer: Credentials } = {
  admin: {
    username: readEnv('E2E_ADMIN_EMAIL', 'admin@weekly.local'),
    password: readEnv('E2E_ADMIN_PASSWORD', 'admin12345'),
  },
  viewer: {
    username: readEnv('E2E_VIEWER_EMAIL', 'viewer@example.com'),
    password: readEnv('E2E_VIEWER_PASSWORD', 'viewer12345'),
  },
};
