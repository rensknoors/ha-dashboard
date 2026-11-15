import { formatDuration } from './wallClock';

export interface SunSummary {
  /** The sunrise and sunset the arc is drawn between. */
  sunrise: number;
  sunset: number;
  /** Position along the arc from 0 to 1, or null while the sun is down. */
  progress: number | null;
  headline: string;
  detail: string;
}

interface SunTimes {
  sunrise: number;
  sunset: number;
}

/**
 * Describes where the sun is relative to today's daylight, and after sunset
 * moves on to tomorrow's so the tile always points at the next event.
 */
export const summarizeSun = (
  now: number,
  today: SunTimes,
  tomorrow?: SunTimes
): SunSummary => {
  if (now < today.sunrise) {
    return {
      ...today,
      progress: null,
      headline: formatDuration(today.sunrise - now),
      detail: 'tot zonsopkomst',
    };
  }

  if (now < today.sunset) {
    return {
      ...today,
      progress: (now - today.sunrise) / (today.sunset - today.sunrise),
      headline: formatDuration(today.sunset - now),
      detail: 'tot zonsondergang',
    };
  }

  const next = tomorrow ?? today;
  return {
    ...next,
    progress: null,
    headline: tomorrow ? formatDuration(tomorrow.sunrise - now) : '—',
    detail: 'tot zonsopkomst',
  };
};
