import { test as setup } from '@playwright/test';

setup('authenticate', async ({ page }) => {
  await page.goto(process.env.BASE_URL!);

  await page.getByLabel('Email').fill(process.env.E2E_ADMIN_USERNAME!);
  await page.getByLabel('Password').fill(process.env.E2E_ADMIN_PASSWORD!);
  await page.getByRole('button', { name: 'Login' }).click();

  await page.waitForURL(/weeks/);

  await page.context().storageState({ path: 'storageState.json' });
});
