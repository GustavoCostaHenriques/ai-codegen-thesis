import { e2eConfig } from '../src/env';
import { buildColleague, buildProject, buildTask, buildViewer, futureWorkWeek } from '../src/data';
import { expect, test } from '../src/fixtures';
import { findDayPlan } from '../src/api';
import { login, openWeek } from '../src/ui';

test.describe('Authorization', () => {
  test('viewer does not see admin actions and receives 403 on forbidden API mutations', async ({ api, cleanup, page }) => {
    const adminSession = await api.login({
      username: e2eConfig.adminUsername,
      password: e2eConfig.adminPassword,
    });

    const viewer = buildViewer();
    const createdViewer = await api.createPerson(adminSession.accessToken, {
      ...viewer,
      role: 'VIEWER',
      status: 'ACTIVE',
    });
    cleanup.push(() => api.deletePerson(adminSession.accessToken, createdViewer.id));

    await login(page, viewer);

    await expect(page.getByRole('button', { name: 'Statistics' })).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Create Week' })).toHaveCount(0);

    await page.getByRole('link', { name: 'Person Management' }).first().click();
    await expect(page.getByRole('button', { name: 'Create Person' })).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Edit' })).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Delete' })).toHaveCount(0);

    await page.getByRole('link', { name: 'Project Management' }).first().click();
    await expect(page.getByRole('button', { name: 'Create Project' })).toHaveCount(0);

    const viewerToken = await page.evaluate(() => {
      const raw = sessionStorage.getItem('weekly-planning.session');
      if (!raw) {
        return null;
      }
      const parsed = JSON.parse(raw) as { session?: { accessToken?: string } };
      return parsed.session?.accessToken ?? null;
    });

    expect(viewerToken).toBeTruthy();

    const forbidden = await api.tryCreateProject(viewerToken!, {
      ...buildProject(),
      status: 'ACTIVE',
    });

    expect(forbidden.status()).toBe(403);
  });

  test('viewer sees only projects where they are assigned, while seeing all assignments inside those projects', async ({ api, cleanup, page }) => {
    const adminSession = await api.login({
      username: e2eConfig.adminUsername,
      password: e2eConfig.adminPassword,
    });

    const viewer = buildViewer();
    const colleague = buildColleague();
    const project = buildProject();
    const week = futureWorkWeek();

    const createdViewer = await api.createPerson(adminSession.accessToken, {
      ...viewer,
      role: 'VIEWER',
      status: 'ACTIVE',
    });
    cleanup.push(() => api.deletePerson(adminSession.accessToken, createdViewer.id));

    const createdColleague = await api.createPerson(adminSession.accessToken, {
      ...colleague,
      role: 'VIEWER',
      status: 'ACTIVE',
    });
    cleanup.push(() => api.deletePerson(adminSession.accessToken, createdColleague.id));

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
    await api.createAssignment(adminSession.accessToken, createdWeek.id, monday.id, createdProject.id, {
      personId: createdViewer.id,
      estimatedHours: 2,
      actualHours: null,
      taskDescription: buildTask(),
    });
    await api.createAssignment(adminSession.accessToken, createdWeek.id, monday.id, createdProject.id, {
      personId: createdColleague.id,
      estimatedHours: 3,
      actualHours: null,
      taskDescription: buildTask(),
    });

    await login(page, viewer);
    await openWeek(page, createdWeek.code);

    await expect(page.getByText('Active Persons')).toHaveCount(0);
    await expect(page.getByText('Active Projects')).toHaveCount(0);
    await expect(page.getByRole('button', { name: createdViewer.name, exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: createdColleague.name, exact: true })).toBeVisible();
    await expect(page.getByText(project.name, { exact: true })).toBeVisible();
  });
});
