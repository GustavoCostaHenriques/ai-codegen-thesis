export type WeekRange = {
  start: string;
  end: string;
  display: string;
};

const DISPLAY_DATE_FORMATTER = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

const WEEK_ANCHOR_UTC = new Date(Date.UTC(2010, 0, 4));

export function uniqueSuffix(): string {
  return `${Date.now()}-${Math.floor(Math.random() * 10_000)}`;
}

export function buildWeekRange(weekOffset: number): WeekRange {
  const startDate = new Date(WEEK_ANCHOR_UTC);
  startDate.setUTCDate(startDate.getUTCDate() + weekOffset * 7);

  const endDate = new Date(startDate);
  endDate.setUTCDate(endDate.getUTCDate() + 4);

  return {
    start: toIsoDate(startDate),
    end: toIsoDate(endDate),
    display: `${DISPLAY_DATE_FORMATTER.format(startDate)} - ${DISPLAY_DATE_FORMATTER.format(endDate)}`,
  };
}

function toIsoDate(date: Date): string {
  const year = String(date.getUTCFullYear());
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
