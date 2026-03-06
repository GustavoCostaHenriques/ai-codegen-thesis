import { expect, test } from '@playwright/test';
import { gotoLogin, login, logout } from '../utils/auth';
import { E2E_ENV } from '../utils/env';

test.describe('Authentication flows', () => {
  test('supports successful login and logout', async ({ page }) => {
    await login(page, E2E_ENV.admin);
    await expect(page).toHaveURL(/\/weeks(?:\?.*)?$/);

    await logout(page);
    await expect(page).toHaveURL(/\/login(?:\?.*)?$/);
  });

  test('shows error on failed login', async ({ page }) => {
    await gotoLogin(page);
    await page.locator('#login-username').fill(E2E_ENV.admin.username);
    await page.locator('#login-password').fill('wrong-password-12345');
    await page.getByRole('button', { name: /^(Login|Entrar)$/i }).click();

    await expect(page).toHaveURL(/\/login(?:\?.*)?$/);
    await expect(page.locator('.ui-alert')).toBeVisible();
  });

  test('validates required fields on login form', async ({ page }) => {
    await gotoLogin(page);
    await page.getByRole('button', { name: /^(Login|Entrar)$/i }).click();

    await expect(page.getByText('Required field')).toHaveCount(2);
  });
});

