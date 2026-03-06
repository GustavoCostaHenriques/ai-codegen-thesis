import { expect, Locator, Page } from '@playwright/test';
import { buildWeekRange, WeekRange } from './data';
import {
  findTableRowByText,
  getTableRowByTextOrThrow,
  modalByTitle,
  navigateToPersons,
  navigateToProjects,
  navigateToWeeks,
} from './ui';

export type PersonPayload = {
  name: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'VIEWER';
  status: 'ACTIVE' | 'INACTIVE';
};

export type ProjectPayload = {
  name: string;
  code: string;
  status: 'ACTIVE' | 'INACTIVE';
};

export async function getPersonNameByEmail(page: Page, email: string): Promise<string> {
  await navigateToPersons(page);
  const row = await getTableRowByTextOrThrow(page, email);
  const nameText = (await row.locator('td').first().textContent())?.trim() ?? '';

  if (!nameText) {
    throw new Error(`Person row found for "${email}" but the name cell is empty.`);
  }

  return nameText;
}

export async function createPerson(page: Page, person: PersonPayload): Promise<void> {
  await navigateToPersons(page);
  await page.getByRole('button', { name: 'Create Person', exact: true }).click();

  const modal = modalByTitle(page, 'Create / Edit Person');
  await expect(modal).toBeVisible();

  await modal.locator('#person-name').fill(person.name);
  await modal.locator('#person-email').fill(person.email);
  await modal.locator('#person-password').fill(person.password);
  await modal.locator('#person-role').selectOption(person.role);
  await modal.locator('#person-status').selectOption(person.status);
  await modal.getByRole('button', { name: 'Confirm', exact: true }).click();

  await expect(modal).toBeHidden();
  await expect(await getTableRowByTextOrThrow(page, person.email)).toContainText(person.name);
}

export async function deletePersonByEmail(page: Page, email: string): Promise<void> {
  await navigateToPersons(page);
  const row = await getTableRowByTextOrThrow(page, email);
  await row.getByRole('button', { name: 'Delete', exact: true }).click();

  const modal = modalByTitle(page, 'Remove Person');
  await expect(modal).toBeVisible();
  await modal.getByRole('button', { name: 'Confirm', exact: true }).click();
  await expect(modal).toBeHidden();

  await navigateToPersons(page);
  expect(await findTableRowByText(page, email)).toBeNull();
}

export async function deletePersonByEmailIfExists(page: Page, email: string): Promise<boolean> {
  await navigateToPersons(page);
  const row = await findTableRowByText(page, email);
  if (!row) {
    return false;
  }

  await row.getByRole('button', { name: 'Delete', exact: true }).click();
  const modal = modalByTitle(page, 'Remove Person');
  await expect(modal).toBeVisible();
  await modal.getByRole('button', { name: 'Confirm', exact: true }).click();
  await expect(modal).toBeHidden();
  return true;
}

export async function createProject(page: Page, project: ProjectPayload): Promise<void> {
  await navigateToProjects(page);
  await page.getByRole('button', { name: 'Create Project', exact: true }).click();

  const modal = modalByTitle(page, 'Create / Edit Project');
  await expect(modal).toBeVisible();

  await modal.locator('#project-name').fill(project.name);
  await modal.locator('#project-code').fill(project.code);
  await modal.locator('#project-status').selectOption(project.status);
  await modal.getByRole('button', { name: 'Confirm', exact: true }).click();

  await expect(modal).toBeHidden();
  await expect(await getTableRowByTextOrThrow(page, project.code)).toContainText(project.name);
}

export async function updateProjectByCode(
  page: Page,
  existingCode: string,
  update: ProjectPayload,
): Promise<void> {
  await navigateToProjects(page);
  const row = await getTableRowByTextOrThrow(page, existingCode);
  await row.getByRole('button', { name: 'Edit', exact: true }).click();

  const modal = modalByTitle(page, 'Create / Edit Project');
  await expect(modal).toBeVisible();

  await modal.locator('#project-name').fill(update.name);
  await modal.locator('#project-code').fill(update.code);
  await modal.locator('#project-status').selectOption(update.status);
  await modal.getByRole('button', { name: 'Confirm', exact: true }).click();

  await expect(modal).toBeHidden();

  const updatedRow = await getTableRowByTextOrThrow(page, update.code);
  await expect(updatedRow).toContainText(update.name);
  await expect(updatedRow).toContainText(update.status);
}

export async function deleteProjectByCode(page: Page, code: string): Promise<void> {
  await navigateToProjects(page);
  const row = await getTableRowByTextOrThrow(page, code);
  await row.getByRole('button', { name: 'Delete', exact: true }).click();

  const modal = modalByTitle(page, 'Remove Project');
  await expect(modal).toBeVisible();
  await modal.getByRole('button', { name: 'Confirm', exact: true }).click();
  await expect(modal).toBeHidden();

  await navigateToProjects(page);
  expect(await findTableRowByText(page, code)).toBeNull();
}

export async function deleteProjectByCodeIfExists(page: Page, code: string): Promise<boolean> {
  await navigateToProjects(page);
  const row = await findTableRowByText(page, code);
  if (!row) {
    return false;
  }

  await row.getByRole('button', { name: 'Delete', exact: true }).click();
  const modal = modalByTitle(page, 'Remove Project');
  await expect(modal).toBeVisible();
  await modal.getByRole('button', { name: 'Confirm', exact: true }).click();
  await expect(modal).toBeHidden();
  return true;
}

export async function createPlannedWeek(page: Page, maxAttempts: number = 10): Promise<WeekRange> {
  await navigateToWeeks(page);
  await page.getByRole('button', { name: 'Create Week', exact: true }).click();

  const modal = modalByTitle(page, 'Create / Edit Week');
  await expect(modal).toBeVisible();

  const baseOffset = Date.now() % 900;

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const candidate = buildWeekRange(baseOffset + attempt);

    await modal.locator('#week-start').fill(candidate.start);
    await modal.locator('#week-end').fill(candidate.end);
    await modal.locator('#week-status').selectOption('PLANNED');
    await modal.getByRole('button', { name: 'Confirm', exact: true }).click();

    try {
      await expect(modal).toBeHidden({ timeout: 3_000 });
      return candidate;
    } catch {
      await expect(modal).toBeVisible();
    }
  }

  throw new Error('Failed to create a unique PLANNED week after multiple attempts.');
}

export async function setWeekStatus(
  page: Page,
  weekRangeDisplay: string,
  status: 'PLANNED' | 'COMPLETED',
): Promise<void> {
  await navigateToWeeks(page);
  const row = await getTableRowByTextOrThrow(page, weekRangeDisplay);
  await row.getByRole('button', { name: 'Edit', exact: true }).click();

  const modal = modalByTitle(page, 'Create / Edit Week');
  await expect(modal).toBeVisible();

  await modal.locator('#week-status').selectOption(status);
  await modal.getByRole('button', { name: 'Confirm', exact: true }).click();
  await expect(modal).toBeHidden();

  const updatedRow = await getTableRowByTextOrThrow(page, weekRangeDisplay);
  await expect(updatedRow).toContainText(status);
}

export async function deleteWeekByRange(page: Page, weekRangeDisplay: string): Promise<void> {
  await navigateToWeeks(page);
  const row = await getTableRowByTextOrThrow(page, weekRangeDisplay);
  await row.getByRole('button', { name: 'Delete', exact: true }).click();

  const modal = modalByTitle(page, 'Remove Week');
  await expect(modal).toBeVisible();
  await modal.getByRole('button', { name: 'Confirm', exact: true }).click();
  await expect(modal).toBeHidden();

  await navigateToWeeks(page);
  expect(await findTableRowByText(page, weekRangeDisplay)).toBeNull();
}

export async function deleteWeekByRangeIfExists(
  page: Page,
  weekRangeDisplay: string,
): Promise<boolean> {
  await navigateToWeeks(page);
  const row = await findTableRowByText(page, weekRangeDisplay);
  if (!row) {
    return false;
  }

  await row.getByRole('button', { name: 'Delete', exact: true }).click();
  const modal = modalByTitle(page, 'Remove Week');
  await expect(modal).toBeVisible();
  await modal.getByRole('button', { name: 'Confirm', exact: true }).click();
  await expect(modal).toBeHidden();
  return true;
}

export async function openWeekPlanningByRange(page: Page, weekRangeDisplay: string): Promise<void> {
  await navigateToWeeks(page);
  const row = await getTableRowByTextOrThrow(page, weekRangeDisplay);
  const openButton = row.getByRole('button', { name: 'Open', exact: true });

  if ((await openButton.count()) > 0) {
    await openButton.click();
  } else {
    await row.click();
  }

  await expect(page).toHaveURL(/\/weeks\/[^/]+\/planning(?:\?.*)?$/);
  await expect(page.locator('.planning-page')).toBeVisible();
}

export function personCard(page: Page, personName: string): Locator {
  return page.locator('.person-card').filter({ hasText: personName }).first();
}

export function projectBlock(page: Page, personName: string, projectName: string): Locator {
  return personCard(page, personName).locator('.project-block').filter({ hasText: projectName }).first();
}

export function taskRow(page: Page, taskDescription: string): Locator {
  return page.locator('.task-row').filter({ hasText: taskDescription }).first();
}

export async function addPersonToFirstDay(page: Page, personName: string): Promise<void> {
  const firstDayColumn = page.locator('.day-column').first();
  await expect(firstDayColumn).toBeVisible();
  await firstDayColumn.getByRole('button', { name: 'Add Person', exact: true }).click();

  const modal = modalByTitle(page, 'Add Person to Day');
  await expect(modal).toBeVisible();
  await modal.getByRole('combobox').selectOption({ label: personName });
  await modal.getByRole('button', { name: 'Confirm', exact: true }).click();
  await expect(modal).toBeHidden();

  await expect(personCard(page, personName)).toBeVisible();
}

export async function removePersonCardIfExists(page: Page, personName: string): Promise<boolean> {
  const card = personCard(page, personName);
  if ((await card.count()) === 0) {
    return false;
  }

  await card.locator('.person-header button.icon-danger').click();
  const modal = modalByTitle(page, 'Remove Person');
  await expect(modal).toBeVisible();
  await modal.getByRole('button', { name: 'Confirm', exact: true }).click();
  await expect(modal).toBeHidden();

  await expect(personCard(page, personName)).toHaveCount(0);
  return true;
}

export async function addProjectToPerson(
  page: Page,
  personName: string,
  projectName: string,
): Promise<void> {
  const card = personCard(page, personName);
  await expect(card).toBeVisible();
  await card.getByRole('button', { name: 'Add Project', exact: true }).click();

  const modal = modalByTitle(page, 'Add Project to Person');
  await expect(modal).toBeVisible();
  await modal.getByRole('combobox').selectOption({ label: projectName });
  await modal.getByRole('button', { name: 'Confirm', exact: true }).click();
  await expect(modal).toBeHidden();

  await expect(projectBlock(page, personName, projectName)).toBeVisible();
}

export async function removeProjectFromPersonIfExists(
  page: Page,
  personName: string,
  projectName: string,
): Promise<boolean> {
  const block = projectBlock(page, personName, projectName);
  if ((await block.count()) === 0) {
    return false;
  }

  await block.locator('.project-header button.icon-danger').click();
  const modal = modalByTitle(page, 'Remove Project');
  await expect(modal).toBeVisible();
  await modal.getByRole('button', { name: 'Confirm', exact: true }).click();
  await expect(modal).toBeHidden();

  await expect(projectBlock(page, personName, projectName)).toHaveCount(0);
  return true;
}

export async function openAddTaskModalForProject(
  page: Page,
  personName: string,
  projectName: string,
): Promise<Locator> {
  const block = projectBlock(page, personName, projectName);
  await expect(block).toBeVisible();
  await block.getByRole('button', { name: 'Add Task', exact: true }).click();

  const modal = modalByTitle(page, 'Add Task');
  await expect(modal).toBeVisible();
  return modal;
}

export async function submitAddTaskModalExpectRequired(page: Page, modal: Locator): Promise<void> {
  await modal.getByRole('button', { name: 'Confirm', exact: true }).click();
  await expect(modal).toBeVisible();
  await expect(
    page.locator('.feedback.error', { hasText: 'This field is required.' }).first(),
  ).toBeVisible();
}

export async function submitAddTaskModalWithDescription(
  page: Page,
  modal: Locator,
  description: string,
): Promise<void> {
  await modal.locator('textarea').fill(description);
  await modal.getByRole('button', { name: 'Confirm', exact: true }).click();
  await expect(modal).toBeHidden();
  await expect(taskRow(page, description)).toBeVisible();
}

export async function removeTaskByDescriptionIfExists(
  page: Page,
  description: string,
): Promise<boolean> {
  const row = taskRow(page, description);
  if ((await row.count()) === 0) {
    return false;
  }

  await row.locator('button.icon-danger').click();
  const modal = modalByTitle(page, 'Remove Task');
  await expect(modal).toBeVisible();
  await modal.getByRole('button', { name: 'Confirm', exact: true }).click();
  await expect(modal).toBeHidden();

  await expect(taskRow(page, description)).toHaveCount(0);
  return true;
}
