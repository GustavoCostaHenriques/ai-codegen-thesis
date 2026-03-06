import { expect, Locator, Page } from '@playwright/test';

export function modalByTitle(page: Page, title: string): Locator {
  return page
    .locator('.modal-frame')
    .filter({ has: page.getByRole('heading', { name: title, exact: true }) })
    .first();
}

export async function navigateToWeeks(page: Page): Promise<void> {
  await page.getByRole('button', { name: 'Weeks', exact: true }).click();
  await expect(page).toHaveURL(/\/weeks(?:\?.*)?$/);
}

export async function navigateToPersons(page: Page): Promise<void> {
  await page.getByRole('button', { name: 'Persons', exact: true }).click();
  await expect(page).toHaveURL(/\/persons(?:\?.*)?$/);
}

export async function navigateToProjects(page: Page): Promise<void> {
  await page.getByRole('button', { name: 'Projects', exact: true }).click();
  await expect(page).toHaveURL(/\/projects(?:\?.*)?$/);
}

export async function findTableRowByText(page: Page, text: string): Promise<Locator | null> {
  await expect(page.locator('table.base-table tbody')).toBeVisible();

  let row = page.locator('table.base-table tbody tr').filter({ hasText: text });
  if ((await row.count()) > 0) {
    return row.first();
  }

  const nextButton = page.getByRole('button', { name: 'Next', exact: true });
  const pageInfo = page.locator('.pagination .page-info');

  if ((await nextButton.count()) === 0) {
    return null;
  }

  while (!(await nextButton.isDisabled())) {
    const before = (await pageInfo.count()) > 0 ? (await pageInfo.textContent()) ?? '' : '';
    await nextButton.click();
    if ((await pageInfo.count()) > 0) {
      await expect(pageInfo).not.toHaveText(before);
    }

    row = page.locator('table.base-table tbody tr').filter({ hasText: text });
    if ((await row.count()) > 0) {
      return row.first();
    }
  }

  return null;
}

export async function getTableRowByTextOrThrow(page: Page, text: string): Promise<Locator> {
  const row = await findTableRowByText(page, text);
  if (!row) {
    throw new Error(`Unable to find table row containing text "${text}".`);
  }

  return row;
}
