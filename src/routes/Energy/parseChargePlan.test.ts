import { describe, expect, it } from 'vitest';

import { parseChargePlan } from './parseChargePlan';

describe('parseChargePlan', () => {
  it('parses a start|end window', () => {
    expect(
      parseChargePlan('2026-11-24T03:30:00+01:00|2026-11-24T04:00:00+01:00')
    ).toEqual({
      startsAt: new Date('2026-11-24T02:30:00Z'),
      endsAt: new Date('2026-11-24T03:00:00Z'),
    });
  });

  it.each([undefined, '', 'unknown', 'unavailable', 'nope|nope'])(
    'returns null for %j',
    (value) => {
      expect(parseChargePlan(value)).toBeNull();
    }
  );

  it('returns null when the end is not after the start', () => {
    expect(
      parseChargePlan('2026-11-24T04:00:00+01:00|2026-11-24T03:30:00+01:00')
    ).toBeNull();
  });
});
