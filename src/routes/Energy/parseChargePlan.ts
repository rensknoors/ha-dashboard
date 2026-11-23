export interface ChargePlanWindow {
  startsAt: Date;
  endsAt: Date;
}

/**
 * Parses `input_text.tesla_laadplan`, which the HA automation
 * "Tesla - laadplan berekenen" writes as `start|end` (ISO with offset).
 * An empty or malformed value means there is no plan.
 */
export const parseChargePlan = (
  value: string | undefined
): ChargePlanWindow | null => {
  const parts = (value ?? '').split('|');
  if (parts.length !== 2) {
    return null;
  }

  const startsAt = new Date(parts[0]);
  const endsAt = new Date(parts[1]);
  if (
    Number.isNaN(startsAt.getTime()) ||
    Number.isNaN(endsAt.getTime()) ||
    endsAt <= startsAt
  ) {
    return null;
  }

  return { startsAt, endsAt };
};
