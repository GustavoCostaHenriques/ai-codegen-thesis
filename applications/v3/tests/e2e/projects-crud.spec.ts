import { expect, test } from '@playwright/test';
import { login, logoutIfVisible } from '../support/auth';
import { uniqueSuffix } from '../support/data';
import { testUsers } from '../support/env';
import {
  createProject,
  deleteProjectByCode,
  deleteProjectByCodeIfExists,
  updateProjectByCode,
} from '../support/entities';
import {
  findTableRowByText,
  getTableRowByTextOrThrow,
  modalByTitle,
  navigateToProjects,
} from '../support/ui';

test.describe('Project core business flow', () => {
  test('admin can create, list, update, delete project and keep data after reload', async ({ page }) => {
    const id = uniqueSuffix();
    const projectCode = `E2E-${id.slice(-8)}`;
    const project = {
      name: `A0 E2E Project ${id}`,
      code: projectCode,
      status: 'ACTIVE' as const,
    };

    await login(page, testUsers.admin);

    try {
      await navigateToProjects(page);
      await page.getByRole('button', { name: 'Create Project', exact: true }).click();

      const createModal = modalByTitle(page, 'Create / Edit Project');
      await expect(createModal).toBeVisible();
      await createModal.getByRole('button', { name: 'Confirm', exact: true }).click();

      // Required fields are enforced by keeping the modal open and rejecting submission.
      await expect(createModal).toBeVisible();
      await createModal.getByRole('button', { name: 'Cancel', exact: true }).click();
      await expect(createModal).toBeHidden();

      await createProject(page, project);

      await page.reload();
      const createdRow = await getTableRowByTextOrThrow(page, project.code);
      await expect(createdRow).toContainText(project.name);
      await expect(createdRow).toContainText(project.status);

      const updatedProject = {
        name: `${project.name} Updated`,
        code: project.code,
        status: 'INACTIVE' as const,
      };

      await updateProjectByCode(page, project.code, updatedProject);

      const updatedRow = await getTableRowByTextOrThrow(page, project.code);
      await expect(updatedRow).toContainText(updatedProject.name);
      await expect(updatedRow).toContainText(updatedProject.status);

      await deleteProjectByCode(page, project.code);
      await navigateToProjects(page);
      expect(await findTableRowByText(page, project.code)).toBeNull();
    } finally {
      await deleteProjectByCodeIfExists(page, project.code);
      await logoutIfVisible(page);
    }
  });
});
