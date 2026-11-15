import { describe, expect, it } from 'vitest';

import { getSkyPhase } from './sky';
import { toWallClock } from './wallClock';

const sunrise = toWallClock('2026-11-15T07:59');
const sunset = toWallClock('2026-11-15T16:48');

describe('getSkyPhase', () => {
  it.each([
    ['2026-11-15T03:00', 'night'],
    ['2026-11-15T07:20', 'twilight'],
    ['2026-11-15T08:40', 'twilight'],
    ['2026-11-15T12:00', 'day'],
    ['2026-11-15T16:10', 'twilight'],
    ['2026-11-15T17:30', 'twilight'],
    ['2026-11-15T17:40', 'night'],
  ])('is %s → %s', (time, phase) => {
    expect(getSkyPhase(toWallClock(time), sunrise, sunset)).toBe(phase);
  });
});
