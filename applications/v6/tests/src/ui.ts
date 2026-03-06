import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

function labelPattern(label: string): RegExp {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`^${escaped}(?:\\s*\\*)?$`);
}

export async function login(page: Page, credentials: { username: string; password: string }): Promise<void> {
  await page.goto('/login');
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  await page.getByLabel('Username').fill(credentials.username);
  await page.getByLabel('Password').fill(credentials.password);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/\/weeks$/);
}

export async function logout(page: Page): Promise<void> {
  await page.getByRole('button', { name: 'Logout' }).first().click();
  await expect(page).toHaveURL(/\/login$/);
}

export async function search(page: Page, query: string): Promise<void> {
  await page.getByPlaceholder('Search').fill(query);
  await page.getByRole('button', { name: 'Search' }).click();
}

export async function openRowAction(page: Page, uniqueText: string, action: 'Edit' | 'Delete' | 'Open' | 'Duplicate'): Promise<void> {
  const row = page.locator('tbody tr').filter({ hasText: uniqueText }).first();
  await expect(row).toBeVisible();
  await row.getByRole('button', { name: action }).click();
}

export async function chooseFieldOption(root: Page | Locator, label: string, option: string): Promise<void> {
  const field = root.getByText(labelPattern(label)).first().locator('xpath=..');
  await expect(field).toBeVisible();
  await field.locator('button').first().click();
  await root.getByRole('button', { name: option, exact: true }).click();
}

export async function fillField(root: Page | Locator, label: string, value: string): Promise<void> {
  const field = root.getByText(labelPattern(label)).first().locator('xpath=..');
  await expect(field).toBeVisible();
  await field.locator('input, textarea').first().fill(value);
}

export async function withinDialog(page: Page, name: string): Promise<Locator> {
  const dialog = page.getByRole('dialog', { name });
  await expect(dialog).toBeVisible();
  return dialog;
}

export function dayColumn(page: Page, dayName: string): Locator {
  return page.locator('article').filter({ has: page.getByRole('heading', { name: dayName, exact: true }) }).first();
}

export function projectCard(day: Locator, projectName: string): Locator {
  return day.locator('.project-card').filter({ has: day.getByText(projectName, { exact: true }) }).first();
}

export async function openWeek(page: Page, weekCode: string): Promise<void> {
  await search(page, weekCode);
  await openRowAction(page, weekCode, 'Open');
}
