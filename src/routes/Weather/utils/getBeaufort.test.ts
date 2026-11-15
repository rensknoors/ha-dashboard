import { describe, expect, it } from 'vitest';

import { getBeaufort } from './getBeaufort';

describe('getBeaufort', () => {
  it.each([
    [0, 0, 'Windstil'],
    [1, 0, 'Windstil'],
    [5, 1, 'Zwak'],
    [19, 3, 'Matig'],
    [20, 4, 'Matig'],
    [38, 5, 'Vrij krachtig'],
    [50, 7, 'Hard'],
    [88, 9, 'Storm'],
    [117, 11, 'Zeer zware storm'],
    [118, 12, 'Orkaan'],
  ])('maps %i km/h to force %i (%s)', (speed, force, label) => {
    expect(getBeaufort(speed)).toEqual({ force, label });
  });
});
