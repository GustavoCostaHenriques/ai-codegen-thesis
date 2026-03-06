import { DayOfWeek } from '../models/api.models';

const dayOrder: DayOfWeek[] = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function computeWeekCode(weekStart: string): string {
  if (!weekStart) {
    return '';
  }

  const date = new Date(`${weekStart}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const weekNumber = Math.ceil((date.getDate() + firstDay.getDay()) / 7);
  const month = monthNames[date.getMonth()] ?? '';

  return `W${weekNumber}${month}${date.getFullYear()}`;
}

export function dayIndex(dayOfWeek: DayOfWeek): number {
  return dayOrder.indexOf(dayOfWeek);
}
