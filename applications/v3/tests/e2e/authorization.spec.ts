import { expect, test } from '@playwright/test';
import { login, logout, logoutIfVisible } from '../support/auth';
import { uniqueSuffix, WeekRange } from '../support/data';
import { testUsers } from '../support/env';
import {
  addPersonToFirstDay,
  createPerson,
  createPlannedWeek,
  deletePersonByEmailIfExists,
  deleteWeekByRangeIfExists,
  getPersonNameByEmail,
  openWeekPlanningByRange,
  personCard,
  removePersonCardIfExists,
} from '../support/entities';
import { navigateToPersons, navigateToProjects, navigateToWeeks } from '../support/ui';

test.describe('Authorization and role behavior', () => {
  test('viewer is read-only and only sees own planning cards', async ({ page }) => {
    const id = uniqueSuffix();
    const extraPerson = {
      name: `A0 E2E Scoped Person ${id}`,
      email: `e2e.scoped.${id}@example.com`,
      password: `Pass-${id}x`,
      role: 'VIEWER' as const,
      status: 'ACTIVE' as const,
    };

    let viewerPersonName = '';
    let weekRange: WeekRange | null = null;
    let extraPersonCreated = false;

    await login(page, testUsers.admin);

    try {
      viewerPersonName = await getPersonNameByEmail(page, testUsers.viewer.username);

      await createPerson(page, extraPerson);
      extraPersonCreated = true;

      weekRange = await createPlannedWeek(page);
      await openWeekPlanningByRange(page, weekRange.display);
      await addPersonToFirstDay(page, viewerPersonName);
      await addPersonToFirstDay(page, extraPerson.name);

      await logout(page);
      await login(page, testUsers.viewer);

      await openWeekPlanningByRange(page, weekRange.display);
      await expect(personCard(page, viewerPersonName)).toBeVisible();
      await expect(personCard(page, extraPerson.name)).toHaveCount(0);
      await expect(page.getByRole('button', { name: 'Add Person', exact: true })).toHaveCount(0);
      await expect(page.locator('.icon-danger')).toHaveCount(0);

      await navigateToWeeks(page);
      await expect(page.getByRole('button', { name: 'Create Week', exact: true })).toHaveCount(0);
      await expect(page.getByRole('columnheader', { name: 'Actions', exact: true })).toHaveCount(0);

      await navigateToPersons(page);
      await expect(page.getByRole('button', { name: 'Create Person', exact: true })).toHaveCount(0);
      await expect(page.getByRole('columnheader', { name: 'Actions', exact: true })).toHaveCount(0);

      await navigateToProjects(page);
      await expect(page.getByRole('button', { name: 'Create Project', exact: true })).toHaveCount(0);
      await expect(page.getByRole('columnheader', { name: 'Actions', exact: true })).toHaveCount(0);
    } finally {
      await login(page, testUsers.admin);

      if (weekRange) {
        try {
          await openWeekPlanningByRange(page, weekRange.display);
          await removePersonCardIfExists(page, extraPerson.name);
          if (viewerPersonName) {
            await removePersonCardIfExists(page, viewerPersonName);
          }
        } catch {
          // Ignore planning cleanup fallback errors and keep deleting by known identifiers.
        }

        await deleteWeekByRangeIfExists(page, weekRange.display);
      }

      if (extraPersonCreated) {
        await deletePersonByEmailIfExists(page, extraPerson.email);
      }

      await logoutIfVisible(page);
    }
  });
});
