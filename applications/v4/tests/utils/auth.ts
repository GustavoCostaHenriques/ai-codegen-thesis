import { expect, Page } from '@playwright/test';
import { UserCredentials } from './env';

const LOGIN_BUTTON_NAME = /^(Login|Entrar)$/i;
const LOGOUT_BUTTON_NAME = /^(Logout|Terminar Sessao)$/i;

export async function gotoLogin(page: Page): Promise<void> {
  await page.goto('/login');
  await expect(page.locator('#login-username')).toBeVisible();
}

export async function login(page: Page, credentials: UserCredentials): Promise<void> {
  await gotoLogin(page);

  await page.locator('#login-username').fill(credentials.username);
  await page.locator('#login-password').fill(credentials.password);

  await Promise.all([
    page.waitForURL(/\/weeks(?:\?.*)?$/),
    page.getByRole('button', { name: LOGIN_BUTTON_NAME }).click()
  ]);

  await expect(page.locator('.weeks-page')).toBeVisible();
}

export async function loginAndCaptureToken(
  page: Page,
  credentials: UserCredentials
): Promise<string> {
  await gotoLogin(page);

  await page.locator('#login-username').fill(credentials.username);
  await page.locator('#login-password').fill(credentials.password);

  const loginResponsePromise = page.waitForResponse(
    (response) =>
      response.request().method() === 'POST' &&
      response.url().includes('/auth/sessions') &&
      response.status() === 200
  );

  await Promise.all([
    page.waitForURL(/\/weeks(?:\?.*)?$/),
    page.getByRole('button', { name: LOGIN_BUTTON_NAME }).click()
  ]);

  const loginResponse = await loginResponsePromise;
  const payload = (await loginResponse.json()) as { accessToken?: string };
  if (!payload.accessToken) {
    throw new Error('Login response did not include accessToken.');
  }
  return payload.accessToken;
}

export async function logout(page: Page): Promise<void> {
  await Promise.all([
    page.waitForURL(/\/login(?:\?.*)?$/),
    page.getByRole('button', { name: LOGOUT_BUTTON_NAME }).click()
  ]);
  await expect(page.locator('#login-username')).toBeVisible();
}

