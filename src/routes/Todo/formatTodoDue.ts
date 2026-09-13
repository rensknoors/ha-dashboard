import { formatClock } from '@/utils/formatClock';

const timeZone = import.meta.env.VITE_TIMEZONE ?? 'Europe/Amsterdam';

const dateFormat = new Intl.DateTimeFormat('nl-NL', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone,
});

export const formatTodoDue = (due: string): string => {
  const dateOnlyMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(due);
  if (dateOnlyMatch) {
    const [, year, month, day] = dateOnlyMatch;
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return dateFormat.format(date);
  }

  const date = new Date(due);
  if (Number.isNaN(date.getTime())) {
    return due;
  }

  const hasTime = due.includes('T') || /\d{2}:\d{2}/.test(due);
  if (!hasTime) {
    return dateFormat.format(date);
  }

  return `${dateFormat.format(date)} · ${formatClock(date)}`;
};
