import { describe, expect, it } from 'vitest';

import { getTemperatureColor } from './getTemperatureColor';

describe('getTemperatureColor', () => {
  it('returns the anchor colours at their temperatures', () => {
    expect(getTemperatureColor(5)).toBe('rgb(90 169 230)');
    expect(getTemperatureColor(22)).toBe('rgb(245 196 81)');
  });

  it('clamps outside the range', () => {
    expect(getTemperatureColor(-30)).toBe(getTemperatureColor(-5));
    expect(getTemperatureColor(45)).toBe(getTemperatureColor(30));
  });

  it('blends between anchors', () => {
    expect(getTemperatureColor(0)).toBe('rgb(106 166 239)');
  });
});
