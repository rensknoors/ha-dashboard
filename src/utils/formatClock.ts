const timeZone = import.meta.env.VITE_TIMEZONE ?? 'Europe/Amsterdam';

const clockFormat = new Intl.DateTimeFormat('nl-NL', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone,
});

const weekdayClockFormat = new Intl.DateTimeFormat('nl-NL', {
  weekday: 'short',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone,
});

export const formatClock = (date: Date) => clockFormat.format(date);

export const formatWeekdayClock = (date: Date) =>
  weekdayClockFormat.format(date);
