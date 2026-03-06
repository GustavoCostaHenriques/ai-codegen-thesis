export interface WeekRange {
  weekStart: string;
  weekEnd: string;
  weekCode: string;
}

export function uniqueId(prefix: string): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).slice(2, 8);
  return `${prefix}-${timestamp}-${random}`;
}

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function weekCodeFromDate(weekStart: string): string {
  const date = new Date(`${weekStart}T00:00:00Z`);
  const day = date.getUTCDate();
  const weekIndex = Math.floor((day - 1) / 7) + 1;
  const month = date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
  const year = date.getUTCFullYear();
  return `W${weekIndex}${month}${year}`;
}

export function buildFutureWeek(seed: number): WeekRange {
  const start = new Date();
  const offsetDays = 14 + Math.abs(seed % 120);
  start.setUTCDate(start.getUTCDate() + offsetDays);

  const dayOfWeek = start.getUTCDay();
  const daysUntilMonday = (8 - dayOfWeek) % 7;
  start.setUTCDate(start.getUTCDate() + daysUntilMonday);

  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 4);

  const weekStart = toIsoDate(start);
  const weekEnd = toIsoDate(end);

  return {
    weekStart,
    weekEnd,
    weekCode: weekCodeFromDate(weekStart)
  };
}

export function parseOptionLabelName(optionLabel: string): string {
  const index = optionLabel.indexOf('(');
  if (index === -1) {
    return optionLabel.trim();
  }
  return optionLabel.slice(0, index).trim();
}

