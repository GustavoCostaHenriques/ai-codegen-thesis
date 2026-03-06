import { randomUUID } from 'node:crypto';

let generatedWeekOffset = 8 + Math.floor(Math.random() * 500);

export interface GeneratedUser {
  name: string;
  username: string;
  email: string;
  password: string;
}

function compactId(value: string): string {
  return value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 12).toLowerCase();
}

export function uniqueSuffix(seed?: string): string {
  return compactId(seed ?? randomUUID());
}

export function buildViewer(seed?: string): GeneratedUser {
  const suffix = uniqueSuffix(seed);
  return {
    name: `Viewer ${suffix}`,
    username: `viewer_${suffix}`,
    email: `viewer.${suffix}@weekly.local`,
    password: `Viewer!${suffix}123`,
  };
}

export function buildColleague(seed?: string): GeneratedUser {
  const suffix = uniqueSuffix(seed);
  return {
    name: `Colleague ${suffix}`,
    username: `colleague_${suffix}`,
    email: `colleague.${suffix}@weekly.local`,
    password: `Colleague!${suffix}123`,
  };
}

export function buildProject(seed?: string) {
  const suffix = uniqueSuffix(seed);
  return {
    name: `Project ${suffix}`,
    code: `PRJ-${suffix.slice(0, 8).toUpperCase()}`,
  };
}

export function buildTask(seed?: string): string {
  return `Task ${uniqueSuffix(seed)}`;
}

export function futureWorkWeek(offsetWeeks = generatedWeekOffset++) {
  const monday = nextMonday(offsetWeeks);
  const friday = new Date(monday);
  friday.setUTCDate(monday.getUTCDate() + 4);

  return {
    weekStart: formatDate(monday),
    weekEnd: formatDate(friday),
  };
}

export function nextMonday(offsetWeeks = 0): Date {
  const date = new Date();
  date.setUTCHours(0, 0, 0, 0);

  const day = date.getUTCDay();
  const daysUntilMonday = day === 1 ? 0 : day === 0 ? 1 : 8 - day;
  date.setUTCDate(date.getUTCDate() + daysUntilMonday + offsetWeeks * 7);
  return date;
}

export function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
