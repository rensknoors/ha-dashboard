import { describe, expect, it } from 'vitest';

import { toWallClock } from '@/utils/weather/wallClock';

import { buildHourlyPoints } from './buildHourlyPoints';

const hours = Array.from({ length: 72 }, (_, index) => {
  const day = 15 + Math.floor(index / 24);
  const hour = String(index % 24).padStart(2, '0');
  return `2026-11-${day}T${hour}:00`;
});

const hourly = {
  time: hours,
  temperature_2m: hours.map((_, index) => index),
  weather_code: hours.map(() => 3),
  precipitation_probability: hours.map(() => 40),
  precipitation: hours.map(() => 0.2),
  is_day: hours.map((_, index) => (index % 24 >= 8 && index % 24 < 17 ? 1 : 0)),
};

describe('buildHourlyPoints', () => {
  it('starts at the current hour and covers the next 24', () => {
    const points = buildHourlyPoints(
      hourly,
      toWallClock('2026-11-15T20:40'),
      null
    );

    expect(points).toHaveLength(25);
    expect(points[0].key).toBe('2026-11-15T20:00');
    expect(points[0].label).toBe('20:00');
    expect(points[24].key).toBe('2026-11-16T20:00');
  });

  it('returns one calendar day when a day is selected', () => {
    const points = buildHourlyPoints(
      hourly,
      toWallClock('2026-11-15T20:40'),
      '2026-11-17'
    );

    expect(points).toHaveLength(24);
    expect(points[0].key).toBe('2026-11-17T00:00');
    expect(points[23].key).toBe('2026-11-17T23:00');
  });

  it('carries the values of each hour', () => {
    const [point] = buildHourlyPoints(
      hourly,
      toWallClock('2026-11-15T09:10'),
      null
    );

    expect(point).toMatchObject({
      temperature: 9,
      precipitationProbability: 40,
      precipitation: 0.2,
      weatherCode: 3,
      isDay: true,
    });
  });

  it('starts at the first hour when now precedes the forecast', () => {
    const points = buildHourlyPoints(
      hourly,
      toWallClock('2026-11-14T10:00'),
      null
    );

    expect(points[0].key).toBe('2026-11-15T00:00');
  });
});
