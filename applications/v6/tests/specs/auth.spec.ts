import { e2eConfig } from '../src/env';
import { expect, test } from '../src/fixtures';
import { login, logout } from '../src/ui';

test.describe('Authentication', () => {
  test('redirects unauthenticated users to login and allows admin login/logout', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/login$/);

    await login(page, {
      username: e2eConfig.adminUsername,
      password: e2eConfig.adminPassword,
    });

    await expect(page.getByRole('heading', { name: 'Weeks Overview' }).first()).toBeVisible();
    await logout(page);
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  });

  test('shows validation and invalid credentials errors on login', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('This field is required.')).toHaveCount(2);

    await page.getByLabel('Username').fill(e2eConfig.adminUsername);
    await page.getByLabel('Password').fill('wrong-password');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Invalid username or password.').first()).toBeVisible();
    await expect(page).toHaveURL(/\/login$/);
  });
});
