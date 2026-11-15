import { describe, expect, it } from 'vitest';

import { getWindDirection } from './getWindDirection';

describe('getWindDirection', () => {
  it.each([
    [0, 'N'],
    [90, 'O'],
    [180, 'Z'],
    [202, 'ZZW'],
    [270, 'W'],
    [349, 'N'],
    [360, 'N'],
    [-90, 'W'],
  ])('names %i° as %s', (degrees, name) => {
    expect(getWindDirection(degrees)).toBe(name);
  });
});
