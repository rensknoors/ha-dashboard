import { describe, expect, it } from 'vitest';

import { getPollenLevel, summarizePollen } from './pollen';

const none = { alder: 0, birch: 0, grass: 0, mugwort: 0, ragweed: 0 };

describe('getPollenLevel', () => {
  it('treats missing and sub-grain counts as none', () => {
    expect(getPollenLevel('grass', null)).toBe(0);
    expect(getPollenLevel('grass', 0.4)).toBe(0);
  });

  it('uses stricter bands for grass than for trees', () => {
    expect(getPollenLevel('grass', 25)).toBe(3);
    expect(getPollenLevel('birch', 25)).toBe(2);
  });

  it.each([
    [1, 1],
    [14, 1],
    [15, 2],
    [90, 3],
    [1500, 4],
  ])('rates %i birch grains as level %i', (grains, level) => {
    expect(getPollenLevel('birch', grains)).toBe(level);
  });
});

describe('summarizePollen', () => {
  it('reports no pollen out of season', () => {
    expect(summarizePollen(none)).toEqual({
      level: 0,
      label: 'Geen pollen',
      drivers: [],
    });
  });

  it('takes the worst type as the overall level', () => {
    const summary = summarizePollen({ ...none, birch: 200, grass: 2 });

    expect(summary.level).toBe(3);
    expect(summary.label).toBe('Hoog');
    expect(summary.drivers).toEqual(['Berk']);
  });

  it('lists every type at the worst level, strongest first', () => {
    const summary = summarizePollen({ ...none, alder: 20, birch: 60 });

    expect(summary.drivers).toEqual(['Berk', 'Els']);
  });

  it('survives missing values', () => {
    expect(summarizePollen({ ...none, grass: null }).level).toBe(0);
  });
});
