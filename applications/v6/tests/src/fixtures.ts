import { test as base } from '@playwright/test';
import { CleanupStack } from './cleanup';
import { WeeklyPlanningApi } from './api';

type TestFixtures = {
  api: WeeklyPlanningApi;
  cleanup: CleanupStack;
};

export const test = base.extend<TestFixtures>({
  api: async ({ playwright, baseURL }, use) => {
    const request = await playwright.request.newContext({
      baseURL,
    });

    await use(new WeeklyPlanningApi(request));
    await request.dispose();
  },
  cleanup: async ({}, use) => {
    const cleanup = new CleanupStack();
    try {
      await use(cleanup);
    } finally {
      await cleanup.run();
    }
  },
});

export { expect } from '@playwright/test';
