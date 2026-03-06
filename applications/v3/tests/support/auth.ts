import { expect, Page } from '@playwright/test';
import { Credentials } from './env';

const LOGIN_URL_REGEX = /\/login(?:\?.*)?$/;

export async function openLoginPage(page: Page): Promise<void> {
  await page.goto('/login');

  if (!LOGIN_URL_REGEX.test(page.url())) {
    const logoutButton = page.getByRole('button', { name: 'Logout', exact: true });
    await expect(logoutButton).toBeVisible();
    await logoutButton.click();
    await expect(page).toHaveURL(LOGIN_URL_REGEX);
  }

  await expect(page.getByRole('heading', { name: 'Login', exact: true })).toBeVisible();
  await page.locator('#language-select').selectOption('en');
}

export async function login(page: Page, credentials: Credentials): Promise<void> {
  await openLoginPage(page);
  await page.locator('#username').fill(credentials.username);
  await page.locator('#password').fill(credentials.password);
  await page.getByRole('button', { name: 'Login', exact: true }).click();

  await expect(page).toHaveURL(/\/weeks(?:\?.*)?$/);
  await expect(page.getByRole('button', { name: 'Logout', exact: true })).toBeVisible();
}

export async function logout(page: Page): Promise<void> {
  const logoutButton = page.getByRole('button', { name: 'Logout', exact: true });
  await expect(logoutButton).toBeVisible();
  await logoutButton.click();
  await expect(page).toHaveURL(LOGIN_URL_REGEX);
  await expect(page.getByRole('heading', { name: 'Login', exact: true })).toBeVisible();
}

export async function logoutIfVisible(page: Page): Promise<void> {
  const logoutButton = page.getByRole('button', { name: 'Logout', exact: true });
  if ((await logoutButton.count()) === 0) {
    return;
  }

  if (!(await logoutButton.isVisible())) {
    return;
  }

  await logoutButton.click();
  await expect(page).toHaveURL(LOGIN_URL_REGEX);
}
