import { e2eConfig } from '../src/env';
import { futureWorkWeek } from '../src/data';
import { expect, test } from '../src/fixtures';
import { chooseFieldOption, login, openRowAction, withinDialog } from '../src/ui';

test.describe('Week management', () => {
  test('admin validates week range, creates a week, duplicates it with a new range, updates status, and deletes both', async ({ page }) => {
    const invalidWeek = futureWorkWeek();
    const validWeek = futureWorkWeek();
    const duplicateWeek = futureWorkWeek();
    const rowKey = `${validWeek.weekStart} to ${validWeek.weekEnd}`;
    const duplicateRowKey = `${duplicateWeek.weekStart} to ${duplicateWeek.weekEnd}`;

    await login(page, {
      username: e2eConfig.adminUsername,
      password: e2eConfig.adminPassword,
    });

    await expect(page.getByRole('heading', { name: 'Weeks Overview' }).first()).toBeVisible();
    await page.getByRole('button', { name: 'Create Week' }).click();

    const modal = await withinDialog(page, 'Create / Edit Week');
    await modal.getByLabel('Week Start').fill(invalidWeek.weekEnd);
    await modal.getByLabel('Week End').fill(invalidWeek.weekStart);
    await modal.getByRole('button', { name: 'Confirm' }).click();
    await expect(modal.getByText('Week end must be after week start.')).toBeVisible();

    await modal.getByLabel('Week Start').fill(validWeek.weekStart);
    await modal.getByLabel('Week End').fill(validWeek.weekEnd);
    const createResponsePromise = page.waitForResponse(
      (response) => response.url().endsWith('/weeks') && response.request().method() === 'POST' && response.status() === 201,
    );
    await modal.getByRole('button', { name: 'Confirm' }).click();
    const createdWeek = (await createResponsePromise).json();
    await expect(modal).toHaveCount(0);

    const weekCode = (await createdWeek).code as string;

    await page.getByPlaceholder('Search').fill(weekCode);
    await page.getByRole('button', { name: 'Search' }).click();

    const createdRow = page.locator('tbody tr').filter({ hasText: weekCode }).first();
    await expect(createdRow).toContainText('PLANNED');
    await expect(createdRow).toContainText(rowKey);

    await openRowAction(page, weekCode, 'Duplicate');
    const duplicateModal = await withinDialog(page, 'Create / Edit Week');
    await duplicateModal.getByLabel('Week Start').fill(duplicateWeek.weekStart);
    await duplicateModal.getByLabel('Week End').fill(duplicateWeek.weekEnd);
    const duplicateResponsePromise = page.waitForResponse(
      (response) =>
        response.url().includes(`/weeks/`) &&
        response.url().endsWith('/duplicates') &&
        response.request().method() === 'POST' &&
        response.status() === 201,
    );
    await duplicateModal.getByRole('button', { name: 'Confirm' }).click();
    const duplicatedWeek = (await duplicateResponsePromise).json();
    await expect(duplicateModal).toHaveCount(0);

    const duplicatedWeekCode = (await duplicatedWeek).code as string;
    await page.getByPlaceholder('Search').fill(duplicatedWeekCode);
    await page.getByRole('button', { name: 'Search' }).click();
    const duplicatedRow = page.locator('tbody tr').filter({ hasText: duplicatedWeekCode }).first();
    await expect(duplicatedRow).toContainText('PLANNED');
    await expect(duplicatedRow).toContainText(duplicateRowKey);

    await page.getByPlaceholder('Search').fill(weekCode);
    await page.getByRole('button', { name: 'Search' }).click();
    await openRowAction(page, weekCode, 'Edit');
    const editModal = await withinDialog(page, 'Create / Edit Week');
    await chooseFieldOption(editModal, 'Status', 'COMPLETED');
    await editModal.getByRole('button', { name: 'Confirm' }).click();
    await expect(editModal).toHaveCount(0);

    await page.getByPlaceholder('Search').fill(weekCode);
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.locator('tbody tr').filter({ hasText: weekCode }).first()).toContainText('COMPLETED');

    await page.getByPlaceholder('Search').fill(duplicatedWeekCode);
    await page.getByRole('button', { name: 'Search' }).click();
    await openRowAction(page, duplicatedWeekCode, 'Delete');
    const duplicatedDeleteModal = await withinDialog(page, 'Remove Week');
    await duplicatedDeleteModal.getByRole('button', { name: 'Confirm' }).click();
    await expect(duplicatedDeleteModal).toHaveCount(0);
    await expect(page.locator('tbody tr').filter({ hasText: duplicatedWeekCode })).toHaveCount(0);

    await page.getByPlaceholder('Search').fill(weekCode);
    await page.getByRole('button', { name: 'Search' }).click();
    await openRowAction(page, weekCode, 'Delete');
    const deleteModal = await withinDialog(page, 'Remove Week');
    await expect(deleteModal).toContainText('Remove Week');
    await deleteModal.getByRole('button', { name: 'Confirm' }).click();
    await expect(deleteModal).toHaveCount(0);
    await expect(page.locator('tbody tr').filter({ hasText: weekCode })).toHaveCount(0);
  });
});
