import { expect, test } from '@playwright/test';
import { login, logout } from '../utils/auth';
import {
  addPersonToFirstDay,
  addProjectToPersonInFirstDay,
  addTaskToPersonProjectInFirstDay,
  assertTaskRequiredValidation,
  createPerson,
  createProject,
  createWeek,
  deletePerson,
  deleteProject,
  deleteWeek,
  editWeekStatus,
  expectPlanningReadOnly,
  expectTaskVisibleInFirstDay,
  goToWeeks,
  openPlanningForWeek,
  projectRowByCode,
  removePersonFromFirstDay,
  removeProjectFromPersonInFirstDay,
  removeTaskFromPersonProjectInFirstDay,
  tryAddDuplicatePersonInFirstDayAndExpectError,
  tryAddDuplicateProjectToPersonInFirstDayAndExpectError,
  updateProject
} from '../utils/app-flows';
import { buildFutureWeek, uniqueId } from '../utils/data';
import { E2E_ENV } from '../utils/env';

test.describe('Core business flows and business rules', () => {
  test('executes project CRUD flow and keeps data after page reload', async ({ page }) => {
    const id = uniqueId('project-crud');
    const createdProject = {
      name: `Project ${id}`,
      code: `PC-${id}`.slice(0, 40)
    };
    const updatedProject = {
      name: `Project Updated ${id}`,
      code: `PU-${id}`.slice(0, 40),
      status: 'INACTIVE' as const
    };

    await login(page, E2E_ENV.admin);
    await createProject(page, createdProject);

    await page.reload();
    await expect(projectRowByCode(page, createdProject.code)).toBeVisible();

    await updateProject(page, createdProject.code, updatedProject);
    const updatedRow = projectRowByCode(page, updatedProject.code);
    await expect(updatedRow).toContainText(updatedProject.name);
    await expect(updatedRow).toContainText('INACTIVE');

    await deleteProject(page, updatedProject.code);
    await logout(page);
  });

  test('validates planning rules: required fields, duplicate prevention, persistence and completed week read-only', async ({
    page
  }) => {
    const id = uniqueId('planning');
    const week = buildFutureWeek(Date.now() + Math.floor(Math.random() * 1000));
    const person = {
      name: `Planning Person ${id}`,
      email: `planning.person.${id}@example.com`,
      password: 'Planning12345!'
    };
    const project = {
      name: `Planning Project ${id}`,
      code: `PL-${id}`.slice(0, 40)
    };
    const task = `Task ${id}`;

    await login(page, E2E_ENV.admin);

    await goToWeeks(page);
    await page.getByRole('button', { name: 'Create Week' }).click();
    const weekModal = page.getByRole('dialog', { name: 'Create / Edit Week' });
    await weekModal.getByRole('button', { name: 'Confirm' }).click();
    await expect(weekModal.getByText('Required field')).toHaveCount(2);
    await weekModal.getByRole('button', { name: 'Cancel' }).click();
    await expect(weekModal).toBeHidden();

    await createPerson(page, person);
    await createProject(page, project);
    await createWeek(page, week);

    await openPlanningForWeek(page, week.weekCode);

    await addPersonToFirstDay(page, person.email);
    await tryAddDuplicatePersonInFirstDayAndExpectError(page, person.email);

    const projectName = await addProjectToPersonInFirstDay(page, person.name, project.code);
    await tryAddDuplicateProjectToPersonInFirstDayAndExpectError(page, person.name, project.code);
    await assertTaskRequiredValidation(page, person.name, projectName);
    await addTaskToPersonProjectInFirstDay(page, person.name, projectName, task);

    await page.reload();
    await expectTaskVisibleInFirstDay(page, person.name, projectName, task);

    await removeTaskFromPersonProjectInFirstDay(page, person.name, projectName, task);
    await removeProjectFromPersonInFirstDay(page, person.name, projectName);
    await removePersonFromFirstDay(page, person.name);

    await editWeekStatus(page, week.weekCode, 'COMPLETED');
    await openPlanningForWeek(page, week.weekCode);
    await expectPlanningReadOnly(page);

    await deleteWeek(page, week.weekCode);
    await deleteProject(page, project.code);
    await deletePerson(page, person.email);
    await logout(page);
  });
});
