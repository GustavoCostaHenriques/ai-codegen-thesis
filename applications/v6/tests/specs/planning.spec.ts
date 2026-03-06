import { e2eConfig } from '../src/env';
import { buildProject, buildTask, buildViewer, futureWorkWeek } from '../src/data';
import { expect, test } from '../src/fixtures';
import { findDayPlan } from '../src/api';
import { dayColumn, fillField, login, openWeek } from '../src/ui';

test.describe('Planning and statistics', () => {
  test('admin can create an assignment, update task data, prevent duplicates, and keep data after reload', async ({
    api,
    cleanup,
    page,
  }) => {
    const adminSession = await api.login({
      username: e2eConfig.adminUsername,
      password: e2eConfig.adminPassword,
    });

    const viewer = buildViewer();
    const project = buildProject();
    const week = futureWorkWeek();
    const updatedTask = buildTask();

    const createdViewer = await api.createPerson(adminSession.accessToken, {
      ...viewer,
      role: 'VIEWER',
      status: 'ACTIVE',
    });
    cleanup.push(() => api.deletePerson(adminSession.accessToken, createdViewer.id));

    const createdProject = await api.createProject(adminSession.accessToken, {
      ...project,
      status: 'ACTIVE',
    });
    cleanup.push(() => api.deleteProject(adminSession.accessToken, createdProject.id));

    const createdWeek = await api.createWeek(adminSession.accessToken, week);
    cleanup.push(() => api.deleteWeek(adminSession.accessToken, createdWeek.id));

    await login(page, {
      username: e2eConfig.adminUsername,
      password: e2eConfig.adminPassword,
    });

    await openWeek(page, createdWeek.code);

    const monday = dayColumn(page, 'Monday');
    await expect(monday).toContainText(project.name);
    await page.locator('aside').getByRole('button', { name: createdViewer.name, exact: true }).click();

    await monday.getByText(project.name, { exact: true }).click();
    await expect(monday.getByRole('button', { name: createdViewer.name, exact: true })).toBeVisible();

    await page.locator('aside').getByRole('button', { name: createdViewer.name, exact: true }).click();
    await monday.getByText(project.name, { exact: true }).click();
    await expect(monday.getByRole('button', { name: createdViewer.name, exact: true })).toHaveCount(1);

    await monday.getByRole('button', { name: createdViewer.name, exact: true }).click();
    const tasksModal = page.getByRole('dialog', { name: 'Tasks' });
    await expect(tasksModal).toBeVisible();
    await fillField(tasksModal, 'Estimated Hours', '2.5');
    await fillField(tasksModal, 'Actual Hours', '1.5');
    await tasksModal.locator('textarea').first().fill(updatedTask);
    await tasksModal.getByRole('button', { name: 'Confirm' }).click();
    await expect(tasksModal).toHaveCount(0);

    await page.getByRole('link', { name: 'Weeks Overview' }).first().click();
    await openWeek(page, createdWeek.code);
    const mondayAfterReload = dayColumn(page, 'Monday');
    await mondayAfterReload.getByRole('button', { name: createdViewer.name, exact: true }).click();

    const persistedModal = page.getByRole('dialog', { name: 'Tasks' });
    await expect(persistedModal.getByRole('spinbutton').nth(0)).toHaveValue('2.5');
    await expect(persistedModal.getByRole('spinbutton').nth(1)).toHaveValue('1.5');
    await expect(persistedModal.locator('textarea').first()).toHaveValue(updatedTask);
  });

  test('completed weeks are read-only for admins in the planning UI', async ({ api, cleanup, page }) => {
    const adminSession = await api.login({
      username: e2eConfig.adminUsername,
      password: e2eConfig.adminPassword,
    });

    const viewer = buildViewer();
    const project = buildProject();
    const week = futureWorkWeek();

    const createdViewer = await api.createPerson(adminSession.accessToken, {
      ...viewer,
      role: 'VIEWER',
      status: 'ACTIVE',
    });
    cleanup.push(() => api.deletePerson(adminSession.accessToken, createdViewer.id));

    const createdProject = await api.createProject(adminSession.accessToken, {
      ...project,
      status: 'ACTIVE',
    });
    cleanup.push(() => api.deleteProject(adminSession.accessToken, createdProject.id));

    const createdWeek = await api.createWeek(adminSession.accessToken, week);
    cleanup.push(() => api.deleteWeek(adminSession.accessToken, createdWeek.id));

    const board = await api.getPlanningBoard(adminSession.accessToken, createdWeek.id);
    const monday = findDayPlan(board, 'MONDAY');
    await api.ensureProjectOnDay(adminSession.accessToken, createdWeek.id, monday.id, createdProject.id);
    const assignment = await api.createAssignment(adminSession.accessToken, createdWeek.id, monday.id, createdProject.id, {
      personId: createdViewer.id,
      estimatedHours: 4,
      actualHours: 2,
      taskDescription: buildTask(),
    });

    await api.updateWeek(adminSession.accessToken, createdWeek.id, {
      ...week,
      status: 'COMPLETED',
    });

    await login(page, {
      username: e2eConfig.adminUsername,
      password: e2eConfig.adminPassword,
    });

    await openWeek(page, createdWeek.code);
    await expect(page.getByText('COMPLETED').first()).toBeVisible();

    const mondayColumn = dayColumn(page, 'Monday');
    await expect(mondayColumn.getByRole('button', { name: assignment.person.name, exact: true })).toBeVisible();
    await expect(mondayColumn.getByRole('button', { name: 'X' })).toHaveCount(0);

    await mondayColumn.getByRole('button', { name: assignment.person.name, exact: true }).click();
    const modal = page.getByRole('dialog', { name: 'Tasks' });
    await expect(modal).toBeVisible();
    await expect(modal.getByRole('button', { name: 'Confirm' })).toHaveCount(0);
    await expect(modal.getByRole('button', { name: 'Add Task' })).toHaveCount(0);
  });

  test('admin can export statistics as an xlsx document', async ({ page }) => {
    await login(page, {
      username: e2eConfig.adminUsername,
      password: e2eConfig.adminPassword,
    });

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Statistics' }).first().click();
    const modal = page.getByRole('dialog', { name: 'Statistics' });
    await expect(modal).toBeVisible();
    await modal.getByRole('button', { name: 'Confirm' }).click();

    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe('weekly-planning-statistics.xlsx');
  });
});
