/**
 * Open-Meteo returns timestamps as local wall-clock strings without an offset
 * ("2026-11-15T19:45"). We keep them in that frame by reading them as if they
 * were UTC, so arithmetic and formatting never depend on the timezone of the
 * browser showing the dashboard.
 */
export const toWallClock = (iso: string) =>
  Date.parse(iso.length === 10 ? iso : `${iso}Z`);

/** The current moment in the same frame as {@link toWallClock}. */
export const getWallClockNow = (epochMs: number, utcOffsetSeconds: number) =>
  epochMs + utcOffsetSeconds * 1000;

const timeFormat = new Intl.DateTimeFormat('nl-NL', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: 'UTC',
});

const shortWeekdayFormat = new Intl.DateTimeFormat('nl-NL', {
  weekday: 'short',
  timeZone: 'UTC',
});

const longDateFormat = new Intl.DateTimeFormat('nl-NL', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  timeZone: 'UTC',
});

export const formatWallClockTime = (wallClock: number) =>
  timeFormat.format(wallClock);

export const formatWallClockWeekday = (wallClock: number) =>
  shortWeekdayFormat.format(wallClock).replace('.', '');

export const formatWallClockDate = (wallClock: number) =>
  longDateFormat.format(wallClock);

export const formatDuration = (milliseconds: number) => {
  const totalMinutes = Math.max(0, Math.round(milliseconds / 60_000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) {
    return `${minutes} min`;
  }
  return minutes === 0 ? `${hours} u` : `${hours} u ${minutes} min`;
};
