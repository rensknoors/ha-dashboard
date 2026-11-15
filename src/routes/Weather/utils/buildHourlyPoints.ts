import { formatWallClockTime, toWallClock } from './wallClock';

export interface HourlyPoint {
  /** The wall-clock timestamp string, unique per point. */
  key: string;
  time: number;
  label: string;
  temperature: number;
  precipitationProbability: number;
  precipitation: number;
  weatherCode: number;
  isDay: boolean;
}

interface Hourly {
  time: string[];
  temperature_2m: number[];
  weather_code: number[];
  precipitation_probability: number[];
  precipitation: number[];
  is_day: number[];
}

const HOURS_AHEAD = 24;

/**
 * Shapes the hourly forecast for the chart: one calendar day when `day`
 * ("2026-11-19") is given, otherwise the current hour plus the next 24.
 */
export const buildHourlyPoints = (
  hourly: Hourly,
  now: number,
  day: string | null
): HourlyPoint[] => {
  const points = hourly.time.map((key, index) => {
    const time = toWallClock(key);
    return {
      key,
      time,
      label: formatWallClockTime(time),
      temperature: hourly.temperature_2m[index],
      precipitationProbability: hourly.precipitation_probability[index],
      precipitation: hourly.precipitation[index],
      weatherCode: hourly.weather_code[index],
      isDay: hourly.is_day[index] === 1,
    };
  });

  if (day !== null) {
    return points.filter((point) => point.key.startsWith(day));
  }

  const upcomingIndex = points.findIndex((point) => point.time > now);
  const start = Math.max(
    (upcomingIndex === -1 ? points.length : upcomingIndex) - 1,
    0
  );
  return points.slice(start, start + HOURS_AHEAD + 1);
};
