import { describe, expect, it } from 'vitest';

import { summarizeRain } from './summarizeRain';

const time = [
  '2026-11-15T20:00',
  '2026-11-15T20:15',
  '2026-11-15T20:30',
  '2026-11-15T20:45',
];

describe('summarizeRain', () => {
  it('reports a dry spell', () => {
    const summary = summarizeRain({ time, precipitation: [0, 0, 0, 0] });

    expect(summary.headline).toBe('Droog');
    expect(summary.total).toBe(0);
    expect(summary.steps).toHaveLength(4);
  });

  it('says when rain starts', () => {
    const summary = summarizeRain({ time, precipitation: [0, 0, 0.4, 0.2] });

    expect(summary.headline).toBe('Vanaf 20:30');
    expect(summary.detail).toBe('neerslag verwacht');
    expect(summary.total).toBeCloseTo(0.6);
  });

  it('says when rain stops', () => {
    const summary = summarizeRain({ time, precipitation: [0.3, 0.1, 0, 0] });

    expect(summary.headline).toBe('Tot 20:30');
    expect(summary.detail).toBe('daarna droog');
  });

  it('reports continuous rain', () => {
    const summary = summarizeRain({ time, precipitation: [1, 1, 2, 1] });

    expect(summary.headline).toBe('Neerslag');
    expect(summary.detail).toBe('houdt aan');
  });

  it('treats missing values as dry', () => {
    const summary = summarizeRain({ time, precipitation: [null, 0, 0, 0] });

    expect(summary.headline).toBe('Droog');
    expect(summary.steps[0].amount).toBe(0);
  });
});
