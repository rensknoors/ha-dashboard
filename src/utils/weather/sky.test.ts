import { describe, expect, it } from 'vitest';

import { getSkyPhase } from './sky';

describe('getSkyPhase', () => {
  it.each([
    [38, 'day'],
    [6.1, 'day'],
    [6, 'twilight'],
    [0, 'twilight'],
    [-4, 'twilight'],
    [-4.1, 'night'],
    [-30, 'night'],
  ])('is %s° → %s', (sunElevation, phase) => {
    // The day flag must not override a known elevation.
    expect(getSkyPhase(sunElevation, true)).toBe(phase);
    expect(getSkyPhase(sunElevation, false)).toBe(phase);
  });

  it('falls back to the day flag without an elevation', () => {
    expect(getSkyPhase(undefined, true)).toBe('day');
    expect(getSkyPhase(undefined, false)).toBe('night');
  });
});
