import { describe, expect, it } from 'vitest';

import {
  formatDuration,
  formatWallClockDate,
  formatWallClockTime,
  formatWallClockWeekday,
  getWallClockNow,
  toWallClock,
} from './wallClock';

describe('wallClock', () => {
  it('reads timestamps and dates in the same frame', () => {
    expect(toWallClock('2026-11-15T00:00')).toBe(toWallClock('2026-11-15'));
    expect(
      toWallClock('2026-11-15T19:45') - toWallClock('2026-11-15T19:00')
    ).toBe(45 * 60 * 1000);
  });

  it('shifts the real clock into the forecast timezone', () => {
    const epoch = Date.UTC(2026, 10, 15, 19, 0);

    expect(getWallClockNow(epoch, 3600)).toBe(toWallClock('2026-11-15T20:00'));
  });

  it('formats back to the same wall-clock time', () => {
    const moment = toWallClock('2026-11-19T07:05');

    expect(formatWallClockTime(moment)).toBe('07:05');
    expect(formatWallClockWeekday(moment)).toBe('do');
    expect(formatWallClockDate(moment)).toBe('donderdag 19 november');
  });

  it.each([
    [0, '0 min'],
    [45 * 60_000, '45 min'],
    [120 * 60_000, '2 u'],
    [135 * 60_000, '2 u 15 min'],
    [-5000, '0 min'],
  ])('formats %i ms as %s', (milliseconds, text) => {
    expect(formatDuration(milliseconds)).toBe(text);
  });
});
