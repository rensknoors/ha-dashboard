const timeZone = import.meta.env.VITE_TIMEZONE ?? 'Europe/Amsterdam';

const dayKeyFormat = new Intl.DateTimeFormat('en-CA', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  timeZone,
});

export const getDayKey = (date: Date) => dayKeyFormat.format(date);
