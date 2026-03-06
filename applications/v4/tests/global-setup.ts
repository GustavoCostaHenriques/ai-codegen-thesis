import { chromium, FullConfig } from '@playwright/test';

export default async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const baseURL = process.env.BASE_URL!;
  await page.goto(baseURL);

  // Espera pelo formulário de login
  await page.getByRole('heading', { name: /login/i }).waitFor();

  await page.getByLabel('Username').fill(process.env.E2E_ADMIN_USERNAME!);
  await page.getByLabel('Password').fill(process.env.E2E_ADMIN_PASSWORD!);
  await page.getByRole('button', { name: /^login$/i }).click();

  await page.waitForURL(/weeks/);

  await page.context().storageState({ path: 'storageState.json' });

  await browser.close();
}
