import { e2eConfig } from '../src/env';
import { buildProject } from '../src/data';
import { expect, test } from '../src/fixtures';
import { chooseFieldOption, fillField, login, openRowAction, search, withinDialog } from '../src/ui';

test.describe('Project management', () => {
  test('admin can create, edit, persist, and delete a project', async ({ page }) => {
    const project = buildProject();
    const updatedName = `${project.name} Updated`;

    await login(page, {
      username: e2eConfig.adminUsername,
      password: e2eConfig.adminPassword,
    });

    await page.getByRole('link', { name: 'Project Management' }).first().click();
    await expect(page.getByRole('heading', { name: 'Project Management' }).first()).toBeVisible();

    await page.getByRole('button', { name: 'Create Project' }).click();
    const modal = await withinDialog(page, 'Create / Edit Project');
    await modal.getByRole('button', { name: 'Confirm' }).click();
    await expect(modal.getByText('This field is required.')).toHaveCount(2);

    await fillField(modal, 'Name', project.name);
    await fillField(modal, 'Project Code', project.code);
    await modal.getByRole('button', { name: 'Confirm' }).click();
    await expect(modal).toHaveCount(0);

    await search(page, project.name);
    const createdRow = page.locator('tbody tr').filter({ hasText: project.name }).first();
    await expect(createdRow).toContainText(project.code);
    await expect(createdRow).toContainText('ACTIVE');

    await openRowAction(page, project.name, 'Edit');
    const editModal = await withinDialog(page, 'Create / Edit Project');
    await fillField(editModal, 'Name', updatedName);
    await chooseFieldOption(editModal, 'Status', 'INACTIVE');
    await editModal.getByRole('button', { name: 'Confirm' }).click();
    await expect(editModal).toHaveCount(0);

    await search(page, updatedName);
    const updatedRow = page.locator('tbody tr').filter({ hasText: updatedName }).first();
    await expect(updatedRow).toContainText(project.code);
    await expect(updatedRow).toContainText('INACTIVE');

    await page.getByRole('link', { name: 'Weeks Overview' }).first().click();
    await expect(page.getByRole('heading', { name: 'Weeks Overview' }).first()).toBeVisible();
    await page.getByRole('link', { name: 'Project Management' }).first().click();
    await expect(page.getByRole('heading', { name: 'Project Management' }).first()).toBeVisible();
    await search(page, updatedName);
    await expect(page.locator('tbody tr').filter({ hasText: updatedName }).first()).toContainText('INACTIVE');

    await openRowAction(page, updatedName, 'Delete');
    const deleteModal = await withinDialog(page, 'Remove Project');
    await expect(deleteModal).toContainText(updatedName);
    await deleteModal.getByRole('button', { name: 'Confirm' }).click();
    await expect(deleteModal).toHaveCount(0);
    await expect(page.locator('tbody tr').filter({ hasText: updatedName })).toHaveCount(0);
  });
});
