import { expect, test } from '@playwright/test';
import { login, loginAndCaptureToken, logout } from '../utils/auth';
import {
  addPersonToFirstDay,
  addProjectToPersonInFirstDay,
  addTaskToPersonProjectInFirstDay,
  removePersonFromFirstDay,
  removeProjectFromPersonInFirstDay,
  removeTaskFromPersonProjectInFirstDay,
  createPerson,
  createProject,
  createWeek,
  deletePerson,
  deleteProject,
  deleteWeek,
  expectPlanningReadOnly,
  getPersonNameByEmail,
  getPlanningPersonNames,
  goToPersons,
  goToProjects,
  openPlanningForWeek
} from '../utils/app-flows';
import { buildFutureWeek, uniqueId } from '../utils/data';
import { E2E_ENV } from '../utils/env';

test.describe('Authorization and RBAC', () => {
  test('redirects anonymous users to login', async ({ page }) => {
    await page.goto('/weeks');
    await expect(page).toHaveURL(/\/login\?returnUrl=/);
    await expect(page.locator('#login-username')).toBeVisible();
  });

  test('enforces viewer restrictions in UI and blocks forbidden API operation', async ({
    page,
    request
  }) => {
    const token = await loginAndCaptureToken(page, E2E_ENV.viewer);

    await expect(page.getByRole('button', { name: 'Create Week' })).toHaveCount(0);
    await expect(page.locator('section.weeks-page th').filter({ hasText: 'Actions' })).toHaveCount(0);

    await goToPersons(page);
    await expect(page.getByRole('button', { name: 'Create Person' })).toHaveCount(0);
    await expect(page.locator('section.persons-page th').filter({ hasText: 'Actions' })).toHaveCount(0);

    await goToProjects(page);
    await expect(page.getByRole('button', { name: 'Create Project' })).toHaveCount(0);
    await expect(page.locator('section.projects-page th').filter({ hasText: 'Actions' })).toHaveCount(0);

    const id = uniqueId('forbidden');
    const forbidden = await request.post(`${E2E_ENV.apiBaseUrl}/projects`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      failOnStatusCode: false,
      data: {
        name: `Forbidden ${id}`,
        code: `FB-${id}`.slice(0, 40),
        status: 'ACTIVE'
      }
    });
    expect(forbidden.status()).toBe(403);

    await logout(page);
  });

  test('shows only viewer-owned planning cards and no planning edit actions', async ({ page }) => {
    const id = uniqueId('viewer-scope');
    const week = buildFutureWeek(Date.now() + Math.floor(Math.random() * 1000));

    const otherPerson = {
      name: `Other Person ${id}`,
      email: `other.person.${id}@example.com`,
      password: 'ViewerScope123!'
    };

    const project = {
      name: `RBAC Project ${id}`,
      code: `RBAC-${id}`.slice(0, 40)
    };

    const viewerTask = `Viewer task ${id}`;
    const otherTask = `Other task ${id}`;

    await login(page, E2E_ENV.admin);
    await createPerson(page, otherPerson);
    await createProject(page, project);
    await createWeek(page, week);

    const viewerName = await getPersonNameByEmail(page, E2E_ENV.viewerEmail);

    await openPlanningForWeek(page, week.weekCode);

    const addedViewerName = await addPersonToFirstDay(page, E2E_ENV.viewerEmail);
    expect(addedViewerName).toBe(viewerName);
    const viewerProjectName = await addProjectToPersonInFirstDay(page, viewerName, project.code);
    await addTaskToPersonProjectInFirstDay(page, viewerName, viewerProjectName, viewerTask);

    await addPersonToFirstDay(page, otherPerson.email);
    const otherProjectName = await addProjectToPersonInFirstDay(page, otherPerson.name, project.code);
    await addTaskToPersonProjectInFirstDay(page, otherPerson.name, otherProjectName, otherTask);

    await logout(page);

    await login(page, E2E_ENV.viewer);
    await openPlanningForWeek(page, week.weekCode);

    const visibleNames = await getPlanningPersonNames(page);
    expect(visibleNames.length).toBeGreaterThan(0);
    expect(visibleNames.every((name) => name === viewerName)).toBeTruthy();
    expect(visibleNames).not.toContain(otherPerson.name);

    await expectPlanningReadOnly(page);
    await logout(page);

    await login(page, E2E_ENV.admin);
    await openPlanningForWeek(page, week.weekCode);

    await removeTaskFromPersonProjectInFirstDay(page, viewerName, viewerProjectName, viewerTask);
    await removeProjectFromPersonInFirstDay(page, viewerName, viewerProjectName);
    await removePersonFromFirstDay(page, viewerName);

    await removeTaskFromPersonProjectInFirstDay(page, otherPerson.name, otherProjectName, otherTask);
    await removeProjectFromPersonInFirstDay(page, otherPerson.name, otherProjectName);
    await removePersonFromFirstDay(page, otherPerson.name);

    await page.goto('/weeks');
    await deleteWeek(page, week.weekCode);

    await deleteProject(page, project.code);
    await deletePerson(page, otherPerson.email);
    await logout(page);

  });
});

