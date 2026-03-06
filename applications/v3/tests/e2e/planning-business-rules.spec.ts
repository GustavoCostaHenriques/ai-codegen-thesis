import { expect, test } from '@playwright/test';
import { login, logoutIfVisible } from '../support/auth';
import { uniqueSuffix, WeekRange } from '../support/data';
import { testUsers } from '../support/env';
import {
  addPersonToFirstDay,
  addProjectToPerson,
  createPerson,
  createPlannedWeek,
  createProject,
  deletePersonByEmailIfExists,
  deleteProjectByCodeIfExists,
  deleteWeekByRangeIfExists,
  openAddTaskModalForProject,
  openWeekPlanningByRange,
  removePersonCardIfExists,
  removeProjectFromPersonIfExists,
  removeTaskByDescriptionIfExists,
  setWeekStatus,
  submitAddTaskModalExpectRequired,
  submitAddTaskModalWithDescription,
  taskRow,
} from '../support/entities';

test.describe('Planning business rules', () => {
  test('enforces required task, planning lifecycle, and completed-week restrictions', async ({ page }) => {
    const id = uniqueSuffix();
    const person = {
      name: `A0 E2E Planner ${id}`,
      email: `e2e.planner.${id}@example.com`,
      password: `Pass-${id}x`,
      role: 'VIEWER' as const,
      status: 'ACTIVE' as const,
    };
    const project = {
      name: `A0 E2E Planning Project ${id}`,
      code: `PLN-${id.slice(-8)}`,
      status: 'ACTIVE' as const,
    };
    const taskDescription = `Task ${id}`;

    let weekRange: WeekRange | null = null;
    let personCreated = false;
    let projectCreated = false;

    await login(page, testUsers.admin);

    try {
      await createPerson(page, person);
      personCreated = true;

      await createProject(page, project);
      projectCreated = true;

      weekRange = await createPlannedWeek(page);
      await openWeekPlanningByRange(page, weekRange.display);
      await addPersonToFirstDay(page, person.name);
      await addProjectToPerson(page, person.name, project.name);

      const addTaskModal = await openAddTaskModalForProject(page, person.name, project.name);
      await submitAddTaskModalExpectRequired(page, addTaskModal);
      await submitAddTaskModalWithDescription(page, addTaskModal, taskDescription);

      await page.reload();
      await expect(taskRow(page, taskDescription)).toBeVisible();

      await removeTaskByDescriptionIfExists(page, taskDescription);
      await removeProjectFromPersonIfExists(page, person.name, project.name);
      await removePersonCardIfExists(page, person.name);

      await setWeekStatus(page, weekRange.display, 'COMPLETED');
      await openWeekPlanningByRange(page, weekRange.display);
      await expect(page.getByRole('button', { name: 'Add Person', exact: true })).toHaveCount(0);
      await expect(page.getByRole('button', { name: 'Add Project', exact: true })).toHaveCount(0);
      await expect(page.getByRole('button', { name: 'Add Task', exact: true })).toHaveCount(0);
      await expect(page.locator('.icon-danger')).toHaveCount(0);
    } finally {
      await login(page, testUsers.admin);

      if (weekRange) {
        try {
          await setWeekStatus(page, weekRange.display, 'PLANNED');
        } catch {
          // Ignore status reset failure and continue cleanup.
        }

        try {
          await openWeekPlanningByRange(page, weekRange.display);
          await removeTaskByDescriptionIfExists(page, taskDescription);
          await removeProjectFromPersonIfExists(page, person.name, project.name);
          await removePersonCardIfExists(page, person.name);
        } catch {
          // Ignore planning cleanup fallback errors and keep deleting by known identifiers.
        }

        await deleteWeekByRangeIfExists(page, weekRange.display);
      }

      if (projectCreated) {
        await deleteProjectByCodeIfExists(page, project.code);
      }

      if (personCreated) {
        await deletePersonByEmailIfExists(page, person.email);
      }

      await logoutIfVisible(page);
    }
  });
});
