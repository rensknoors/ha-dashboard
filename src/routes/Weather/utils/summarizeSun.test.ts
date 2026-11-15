import { describe, expect, it } from 'vitest';

import { summarizeSun } from './summarizeSun';
import { toWallClock } from './wallClock';

const today = {
  sunrise: toWallClock('2026-11-15T08:00'),
  sunset: toWallClock('2026-11-15T16:00'),
};
const tomorrow = {
  sunrise: toWallClock('2026-11-16T08:02'),
  sunset: toWallClock('2026-11-16T15:58'),
};

describe('summarizeSun', () => {
  it('counts down to sunrise before dawn', () => {
    const summary = summarizeSun(
      toWallClock('2026-11-15T05:30'),
      today,
      tomorrow
    );

    expect(summary).toMatchObject({
      ...today,
      progress: null,
      headline: '2 u 30 min',
      detail: 'tot zonsopkomst',
    });
  });

  it('places the sun along the arc during the day', () => {
    const summary = summarizeSun(
      toWallClock('2026-11-15T10:00'),
      today,
      tomorrow
    );

    expect(summary.progress).toBe(0.25);
    expect(summary.headline).toBe('6 u');
    expect(summary.detail).toBe('tot zonsondergang');
  });

  it('moves on to tomorrow after sunset', () => {
    const summary = summarizeSun(
      toWallClock('2026-11-15T20:02'),
      today,
      tomorrow
    );

    expect(summary).toMatchObject({
      ...tomorrow,
      progress: null,
      headline: '12 u',
      detail: 'tot zonsopkomst',
    });
  });

  it('falls back to today when tomorrow is unknown', () => {
    const summary = summarizeSun(toWallClock('2026-11-15T20:00'), today);

    expect(summary).toMatchObject({ ...today, headline: '—' });
  });
});
