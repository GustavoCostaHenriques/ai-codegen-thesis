import { AppLanguage } from '../i18n/i18n.service';

const MONTH_CODES: Record<number, string> = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Aug',
  8: 'Sep',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec',
};

export function generateWeekCode(weekStart: string): string {
  const date = new Date(weekStart);
  if (Number.isNaN(date.getTime())) {
    return weekStart;
  }

  const weekOfMonth = Math.floor((date.getDate() - 1) / 7) + 1;
  const monthCode = MONTH_CODES[date.getMonth()] ?? 'UNK';
  return `W${weekOfMonth}${monthCode}${date.getFullYear()}`;
}

export function formatDate(dateString: string, language: AppLanguage): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return new Intl.DateTimeFormat(language === 'pt-PT' ? 'pt-PT' : 'en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function formatDateCompact(dateString: string, language: AppLanguage): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return new Intl.DateTimeFormat(language === 'pt-PT' ? 'pt-PT' : 'en-GB', {
    day: 'numeric',
    month: 'short',
  }).format(date);
}

export function formatWeekRange(weekStart: string, weekEnd: string, language: AppLanguage): string {
  return `${formatDate(weekStart, language)} - ${formatDate(weekEnd, language)}`;
}
