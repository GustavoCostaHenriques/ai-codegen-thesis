import { expect, test } from '@playwright/test';
import { login, logout, openLoginPage } from '../support/auth';
import { testUsers } from '../support/env';

test.describe('Authentication flows', () => {
  test('redirects unauthenticated access to login', async ({ page }) => {
    await page.goto('/weeks');
    await expect(page).toHaveURL(/\/login(?:\?.*)?$/);
    await expect(page.getByRole('heading', { name: 'Login', exact: true })).toBeVisible();
  });

  test('supports successful login and logout', async ({ page }) => {
    await login(page, testUsers.admin);
    await expect(page.getByRole('button', { name: 'Weeks', exact: true })).toBeVisible();

    await logout(page);
  });

  test('shows validation for required login fields', async ({ page }) => {
    await openLoginPage(page);
    await page.getByRole('button', { name: 'Login', exact: true }).click();

    await expect(page).toHaveURL(/\/login(?:\?.*)?$/);
    await expect(page.locator('.field-error', { hasText: 'This field is required.' })).toHaveCount(2);
  });

  test('shows an error for invalid credentials', async ({ page }) => {
    await openLoginPage(page);
    await page.locator('#username').fill(testUsers.admin.username);
    await page.locator('#password').fill('invalid-password-123');
    await page.getByRole('button', { name: 'Login', exact: true }).click();

    await expect(page).toHaveURL(/\/login(?:\?.*)?$/);
    await expect(page.locator('.feedback.error')).toBeVisible();
    await expect(page.locator('.feedback.error')).not.toHaveText('');
  });
});
