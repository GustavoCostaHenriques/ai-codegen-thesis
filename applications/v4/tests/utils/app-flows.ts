import { expect, Locator, Page } from '@playwright/test';
import { parseOptionLabelName, WeekRange } from './data';

export type AccountRole = 'ADMIN' | 'VIEWER';
export type PersonStatus = 'ACTIVE' | 'INACTIVE';
export type ProjectStatus = 'ACTIVE' | 'INACTIVE';
export type WeekStatus = 'PLANNED' | 'COMPLETED';

export interface CreatePersonInput {
  name: string;
  email: string;
  password: string;
  role?: AccountRole;
  status?: PersonStatus;
}

export interface CreateProjectInput {
  name: string;
  code: string;
  status?: ProjectStatus;
}

export interface UpdateProjectInput {
  name: string;
  code: string;
  status: ProjectStatus;
}

function modalByTitle(page: Page, title: string): Locator {
  return page.getByRole('dialog', { name: title });
}

function weekRowByCode(page: Page, weekCode: string): Locator {
  return page
    .locator('.weeks-page table.ui-table tbody tr')
    .filter({ hasText: weekCode })
    .first();
}

export function projectRowByCode(page: Page, code: string): Locator {
  return page
    .locator('section.projects-page table.ui-table tbody tr')
    .filter({ hasText: code })
    .first();
}

function personRowByEmail(page: Page, email: string): Locator {
  return page
    .locator('section.persons-page table.ui-table tbody tr')
    .filter({ hasText: email })
    .first();
}

async function selectOptionByPartialText(select: Locator, partialText: string): Promise<string> {
  const target = partialText.toLowerCase();
  const options = select.locator('option');
  const count = await options.count();

  for (let i = 0; i < count; i += 1) {
    const option = options.nth(i);
    const label = ((await option.textContent()) || '').trim();
    const value = (await option.getAttribute('value')) || '';

    if (!value) {
      continue;
    }

    if (label.toLowerCase().includes(target)) {
      await select.selectOption(value);
      return label;
    }
  }

  throw new Error(`Could not find an option containing "${partialText}".`);
}

async function selectDialogOption(container: Locator, value: string): Promise<void> {
  await container.locator('button').first().click();
  await container.locator('.dialog-option', { hasText: value }).first().click();
}

function firstDayColumn(page: Page): Locator {
  return page.locator('.day-column').first();
}

function personCardInFirstDay(page: Page, personName: string): Locator {
  return firstDayColumn(page)
    .locator('.person-card')
    .filter({
      has: page.locator('.person-header strong', { hasText: personName })
    })
    .first();
}


function projectBlockInFirstDay(page: Page, personName: string, projectName: string): Locator {
  return personCardInFirstDay(page, personName)
    .locator('section.project-block')
    .filter({ hasText: projectName })
    .first();
}

function taskRowInProject(
  page: Page,
  personName: string,
  projectName: string,
  taskDescription: string
): Locator {
  return projectBlockInFirstDay(page, personName, projectName)
    .locator('.task-row')
    .filter({ hasText: taskDescription })
    .first();
}

export async function goToWeeks(page: Page): Promise<void> {
  await page.goto('/weeks');
  await expect(page).toHaveURL(/\/weeks(?:\?.*)?$/);
  await expect(page.locator('.weeks-page table.ui-table')).toBeVisible();
}

export async function goToPersons(page: Page): Promise<void> {
  await page.goto('/persons');
  await expect(page).toHaveURL(/\/persons(?:\?.*)?$/);
  await expect(page.locator('section.persons-page table.ui-table')).toBeVisible();
}

export async function goToProjects(page: Page): Promise<void> {
  await page.goto('/projects');
  await expect(page).toHaveURL(/\/projects(?:\?.*)?$/);
  await expect(page.locator('section.projects-page table.ui-table')).toBeVisible();
}

export async function getPersonNameByEmail(page: Page, email: string): Promise<string> {
  await goToPersons(page);
  const row = personRowByEmail(page, email);
  await expect(row).toBeVisible();
  return (await row.locator('td').first().innerText()).trim();
}

export async function createPerson(page: Page, data: CreatePersonInput): Promise<void> {
  await goToPersons(page);
  await page.getByRole('button', { name: 'Create Person' }).click();

  const modal = modalByTitle(page, 'Create / Edit Person');
  await expect(modal).toBeVisible();

  await modal.locator('input[formcontrolname="name"]').fill(data.name);
  await modal.locator('input[formcontrolname="password"]').fill(data.password);
  await modal.locator('input[formcontrolname="email"]').fill(data.email);

  if (data.role && data.role !== 'VIEWER') {
    await selectDialogOption(modal.locator('.picker-row .picker-field').nth(0), data.role);
  }

  if (data.status && data.status !== 'ACTIVE') {
    await selectDialogOption(modal.locator('.picker-row .picker-field').nth(1), data.status);
  }

  await modal.getByRole('button', { name: 'Confirm' }).click();
  await expect(modal).toBeHidden();
  await expect(personRowByEmail(page, data.email)).toBeVisible();
}

export async function deletePerson(page: Page, email: string): Promise<void> {
  await goToPersons(page);
  const row = personRowByEmail(page, email);
  await expect(row).toBeVisible();
  await row.getByRole('button', { name: 'Delete' }).click();

  const modal = modalByTitle(page, 'Remove Person');
  await expect(modal).toBeVisible();
  await modal.getByRole('button', { name: 'Confirm' }).click();
  await expect(modal).toBeHidden();
  await expect(personRowByEmail(page, email)).toHaveCount(0);
}

export async function createProject(page: Page, data: CreateProjectInput): Promise<void> {
  await goToProjects(page);
  await page.getByRole('button', { name: 'Create Project' }).click();

  const modal = modalByTitle(page, 'Create / Edit Project');
  await expect(modal).toBeVisible();

  await modal.locator('input[formcontrolname="name"]').fill(data.name);
  await modal.locator('input[formcontrolname="code"]').fill(data.code);

  const status = data.status || 'ACTIVE';
  if (status !== 'ACTIVE') {
    await selectDialogOption(modal.locator('.picker-field').first(), status);
  }

  await modal.getByRole('button', { name: 'Confirm' }).click();
  await expect(modal).toBeHidden();
  await expect(projectRowByCode(page, data.code)).toBeVisible();
}

export async function updateProject(
  page: Page,
  existingCode: string,
  updates: UpdateProjectInput
): Promise<void> {
  await goToProjects(page);
  const row = projectRowByCode(page, existingCode);
  await expect(row).toBeVisible();
  await row.getByRole('button', { name: 'Edit' }).click();

  const modal = modalByTitle(page, 'Create / Edit Project');
  await expect(modal).toBeVisible();

  await modal.locator('input[formcontrolname="name"]').fill(updates.name);
  await modal.locator('input[formcontrolname="code"]').fill(updates.code);

  await selectDialogOption(modal.locator('.picker-field').first(), updates.status);

  await modal.getByRole('button', { name: 'Confirm' }).click();
  await expect(modal).toBeHidden();
  await expect(projectRowByCode(page, updates.code)).toBeVisible();
}

export async function deleteProject(page: Page, code: string): Promise<void> {
  await goToProjects(page);
  const row = projectRowByCode(page, code);
  await expect(row).toBeVisible();
  await row.getByRole('button', { name: 'Delete' }).click();

  const modal = modalByTitle(page, 'Remove Project');
  await expect(modal).toBeVisible();
  await modal.getByRole('button', { name: 'Confirm' }).click();
  await expect(modal).toBeHidden();
  await expect(projectRowByCode(page, code)).toHaveCount(0);
}

export async function createWeek(page: Page, week: WeekRange, status: WeekStatus = 'PLANNED'): Promise<void> {
  await goToWeeks(page);
  await page.getByRole('button', { name: 'Create Week' }).click();

  const modal = modalByTitle(page, 'Create / Edit Week');
  await expect(modal).toBeVisible();

  await modal.locator('#week-start').fill(week.weekStart);
  await modal.locator('#week-end').fill(week.weekEnd);

  if (status !== 'PLANNED') {
    await selectDialogOption(modal.locator('.status-picker').first(), status);
  }

  await modal.getByRole('button', { name: 'Confirm' }).click();
  await expect(modal).toBeHidden();
  await expect(weekRowByCode(page, week.weekCode)).toBeVisible();
}

export async function editWeekStatus(page: Page, weekCode: string, status: WeekStatus): Promise<void> {
  await goToWeeks(page);
  const row = weekRowByCode(page, weekCode);
  await expect(row).toBeVisible();
  await row.getByRole('button', { name: 'Edit' }).click();

  const modal = modalByTitle(page, 'Create / Edit Week');
  await expect(modal).toBeVisible();

  await selectDialogOption(modal.locator('.status-picker').first(), status);
  await modal.getByRole('button', { name: 'Confirm' }).click();
  await expect(modal).toBeHidden();
  await expect(weekRowByCode(page, weekCode)).toContainText(status);
}

export async function deleteWeek(page: Page, weekCode: string): Promise<void> {
  await goToWeeks(page);
  const row = weekRowByCode(page, weekCode);
  await expect(row).toBeVisible();
  await row.getByRole('button', { name: 'Delete' }).click();

  const modal = modalByTitle(page, 'Remove Week');
  await expect(modal).toBeVisible();
  await modal.getByRole('button', { name: 'Confirm' }).click();
  await expect(modal).toBeHidden();
  await expect(weekRowByCode(page, weekCode)).toHaveCount(0);
}

export async function openPlanningForWeek(page: Page, weekCode: string): Promise<void> {
  await goToWeeks(page);
  const row = weekRowByCode(page, weekCode);
  await expect(row).toBeVisible();
  await row.click();
  await expect(page).toHaveURL(/\/weeks\/[^/]+\/planning(?:\?.*)?$/);
  await expect(page.locator('section.planning-page')).toBeVisible();
  await expect(page.locator('.calendar')).toBeVisible();
}

export async function addPersonToFirstDay(page: Page, personLookupText: string): Promise<string> {
  const dayColumn = firstDayColumn(page);
  await dayColumn.getByRole('button', { name: 'Add Person' }).click();

  const modal = modalByTitle(page, 'Add Person to Day');
  await expect(modal).toBeVisible();

  const label = await selectOptionByPartialText(
    modal.locator('select[formcontrolname="personId"]'),
    personLookupText
  );
  const personName = parseOptionLabelName(label);

  await modal.getByRole('button', { name: 'Confirm' }).click();
  await expect(modal).toBeHidden();
  await expect(personCardInFirstDay(page, personName)).toBeVisible();

  return personName;
}

export async function tryAddDuplicatePersonInFirstDayAndExpectError(
  page: Page,
  personLookupText: string
): Promise<void> {
  const dayColumn = firstDayColumn(page);
  await dayColumn.getByRole('button', { name: 'Add Person' }).click();

  const modal = modalByTitle(page, 'Add Person to Day');
  await expect(modal).toBeVisible();

  await selectOptionByPartialText(modal.locator('select[formcontrolname="personId"]'), personLookupText);
  await modal.getByRole('button', { name: 'Confirm' }).click();

  const alert = modal.locator('.ui-alert');
  await expect(alert).toBeVisible();
  await expect(alert).not.toHaveText('');

  await modal.getByRole('button', { name: 'Cancel' }).click();
  await expect(modal).toBeHidden();
}

export async function addProjectToPersonInFirstDay(
  page: Page,
  personName: string,
  projectLookupText: string
): Promise<string> {
  const personCard = personCardInFirstDay(page, personName);
  await expect(personCard).toBeVisible();
  await personCard.getByRole('button', { name: 'Add Project' }).click();

  const modal = modalByTitle(page, 'Add Project to Person');
  await expect(modal).toBeVisible();

  const projectLabel = await selectOptionByPartialText(
    modal.locator('select[formcontrolname="projectId"]'),
    projectLookupText
  );
  const projectName = parseOptionLabelName(projectLabel);

  await modal.getByRole('button', { name: 'Confirm' }).click();
  await expect(modal).toBeHidden();
  await expect(projectBlockInFirstDay(page, personName, projectName)).toBeVisible();

  return projectName;
}

export async function tryAddDuplicateProjectToPersonInFirstDayAndExpectError(
  page: Page,
  personName: string,
  projectLookupText: string
): Promise<void> {
  const personCard = personCardInFirstDay(page, personName);
  await expect(personCard).toBeVisible();
  await personCard.getByRole('button', { name: 'Add Project' }).click();

  const modal = modalByTitle(page, 'Add Project to Person');
  await expect(modal).toBeVisible();

  await selectOptionByPartialText(modal.locator('select[formcontrolname="projectId"]'), projectLookupText);
  await modal.getByRole('button', { name: 'Confirm' }).click();

  const alert = modal.locator('.ui-alert');
  await expect(alert).toBeVisible();
  await expect(alert).not.toHaveText('');

  await modal.getByRole('button', { name: 'Cancel' }).click();
  await expect(modal).toBeHidden();
}

export async function assertTaskRequiredValidation(
  page: Page,
  personName: string,
  projectName: string
): Promise<void> {
  const projectBlock = projectBlockInFirstDay(page, personName, projectName);
  await expect(projectBlock).toBeVisible();
  await projectBlock.getByRole('button', { name: 'Add Task' }).click();

  const modal = modalByTitle(page, 'Add Task');
  await expect(modal).toBeVisible();
  await modal.getByRole('button', { name: 'Confirm' }).click();
  await expect(modal.locator('.ui-error')).toContainText('Required field');
  await modal.getByRole('button', { name: 'Cancel' }).click();
  await expect(modal).toBeHidden();
}

export async function addTaskToPersonProjectInFirstDay(
  page: Page,
  personName: string,
  projectName: string,
  description: string
): Promise<void> {
  const projectBlock = projectBlockInFirstDay(page, personName, projectName);
  await expect(projectBlock).toBeVisible();
  await projectBlock.getByRole('button', { name: 'Add Task' }).click();

  const modal = modalByTitle(page, 'Add Task');
  await expect(modal).toBeVisible();
  await modal.locator('textarea[formcontrolname="description"]').fill(description);
  await modal.getByRole('button', { name: 'Confirm' }).click();
  await expect(modal).toBeHidden();

  await expect(taskRowInProject(page, personName, projectName, description)).toBeVisible();
}

export async function expectTaskVisibleInFirstDay(
  page: Page,
  personName: string,
  projectName: string,
  description: string
): Promise<void> {
  await expect(taskRowInProject(page, personName, projectName, description)).toBeVisible();
}

export async function removeTaskFromPersonProjectInFirstDay(
  page: Page,
  personName: string,
  projectName: string,
  description: string
): Promise<void> {
  const taskRow = taskRowInProject(page, personName, projectName, description);
  await expect(taskRow).toBeVisible();
  await taskRow.getByRole('button', { name: 'Remove task' }).click();

  const modal = modalByTitle(page, 'Remove Task');
  await expect(modal).toBeVisible();
  await modal.getByRole('button', { name: 'Confirm' }).click();
  await expect(modal).toBeHidden();
  await expect(taskRowInProject(page, personName, projectName, description)).toHaveCount(0);
}

export async function removeProjectFromPersonInFirstDay(
  page: Page,
  personName: string,
  projectName: string
): Promise<void> {
  const projectBlock = projectBlockInFirstDay(page, personName, projectName);
  await expect(projectBlock).toBeVisible();
  await projectBlock.getByRole('button', { name: 'Remove project' }).click();

  const modal = modalByTitle(page, 'Remove Project');
  await expect(modal).toBeVisible();
  await modal.getByRole('button', { name: 'Confirm' }).click();
  await expect(modal).toBeHidden();
  await expect(projectBlockInFirstDay(page, personName, projectName)).toHaveCount(0);
}

export async function removePersonFromFirstDay(page: Page, personName: string): Promise<void> {
  const personCard = personCardInFirstDay(page, personName);
  await expect(personCard).toBeVisible();
  await personCard.getByRole('button', { name: 'Remove person' }).click();

  const modal = modalByTitle(page, 'Remove Person');
  await expect(modal).toBeVisible();
  await modal.getByRole('button', { name: 'Confirm' }).click();
  await expect(modal).toBeHidden();
  await expect(personCardInFirstDay(page, personName)).toHaveCount(0);
}

export async function getPlanningPersonNames(page: Page): Promise<string[]> {
  const names = await page.locator('.person-card .person-header strong').allInnerTexts();
  return names.map((name) => name.trim()).filter((name) => !!name);
}

export async function expectPlanningReadOnly(page: Page): Promise<void> {
  await expect(page.getByRole('button', { name: 'Add Person' })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Add Project' })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Add Task' })).toHaveCount(0);
  await expect(page.locator('button[aria-label="Remove person"]')).toHaveCount(0);
  await expect(page.locator('button[aria-label="Remove project"]')).toHaveCount(0);
  await expect(page.locator('button[aria-label="Remove task"]')).toHaveCount(0);
}
