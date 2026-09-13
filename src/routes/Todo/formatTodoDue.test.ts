import { describe, expect, it } from 'vitest';

import { formatTodoDue } from './formatTodoDue';

describe('formatTodoDue', () => {
  it('formats date-only values', () => {
    expect(formatTodoDue('2026-09-13')).toMatch(/13 sep\.? 2026/i);
  });

  it('formats datetime values with time', () => {
    const formatted = formatTodoDue('2026-09-13T14:30:00');
    expect(formatted).toMatch(/13 sep\.? 2026/i);
    expect(formatted).toMatch(/14:30/);
  });
});
