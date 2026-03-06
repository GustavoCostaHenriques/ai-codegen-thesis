export interface UserCredentials {
  username: string;
  password: string;
}

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function normalizeUrl(url: string): string {
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

const baseUrl = normalizeUrl(requireEnv('BASE_URL'));

const adminUsername = requireEnv('E2E_ADMIN_USERNAME');
const adminPassword = requireEnv('E2E_ADMIN_PASSWORD');

const viewerUsername = requireEnv('E2E_VIEWER_USERNAME');
const viewerPassword = requireEnv('E2E_VIEWER_PASSWORD');
const viewerEmailCandidate = process.env.E2E_VIEWER_EMAIL?.trim();
const viewerEmail = viewerEmailCandidate || (viewerUsername.includes('@') ? viewerUsername : '');

if (!viewerEmail) {
  throw new Error(
    'Missing viewer email. Set E2E_VIEWER_EMAIL or provide E2E_VIEWER_USERNAME as an email address.'
  );
}

const apiBaseUrl = normalizeUrl(
  process.env.API_BASE_URL?.trim() || `${new URL(baseUrl).origin}/api/v1`
);

export const E2E_ENV = {
  baseUrl,
  apiBaseUrl,
  admin: {
    username: adminUsername,
    password: adminPassword
  } satisfies UserCredentials,
  viewer: {
    username: viewerUsername,
    password: viewerPassword
  } satisfies UserCredentials,
  viewerEmail
};

