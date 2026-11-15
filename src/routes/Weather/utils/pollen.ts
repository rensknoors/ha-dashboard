export type PollenType = 'alder' | 'birch' | 'grass' | 'mugwort' | 'ragweed';

/** 0 = none, 1 = low, 2 = moderate, 3 = high, 4 = very high. */
export type PollenLevel = 0 | 1 | 2 | 3 | 4;

export const POLLEN_LEVEL_LABELS: Record<PollenLevel, string> = {
  0: 'Geen pollen',
  1: 'Laag',
  2: 'Matig',
  3: 'Hoog',
  4: 'Zeer hoog',
};

const POLLEN_NAMES: Record<PollenType, string> = {
  alder: 'Els',
  birch: 'Berk',
  grass: 'Gras',
  mugwort: 'Bijvoet',
  ragweed: 'Ambrosia',
};

/**
 * Lower bounds in grains/m³ for moderate, high and very high. There is no
 * official European scale; these are the US National Allergy Bureau bands,
 * which differ per plant family because grass is far more allergenic per grain
 * than tree pollen.
 */
const THRESHOLDS: Record<PollenType, [number, number, number]> = {
  alder: [15, 90, 1500],
  birch: [15, 90, 1500],
  grass: [5, 20, 200],
  mugwort: [10, 50, 500],
  ragweed: [10, 50, 500],
};

export const getPollenLevel = (
  type: PollenType,
  grains: number | null
): PollenLevel => {
  if (grains === null || grains < 1) {
    return 0;
  }
  const [moderate, high, veryHigh] = THRESHOLDS[type];
  if (grains >= veryHigh) {
    return 4;
  }
  if (grains >= high) {
    return 3;
  }
  return grains >= moderate ? 2 : 1;
};

export interface PollenSummary {
  level: PollenLevel;
  label: string;
  /** Names of the types at the worst level, strongest first. */
  drivers: string[];
}

export const summarizePollen = (
  counts: Record<PollenType, number | null>
): PollenSummary => {
  const entries = (Object.keys(POLLEN_NAMES) as PollenType[]).map((type) => ({
    type,
    grains: counts[type] ?? 0,
    level: getPollenLevel(type, counts[type]),
  }));
  const level = entries.reduce<PollenLevel>(
    (worst, entry) => (entry.level > worst ? entry.level : worst),
    0
  );

  return {
    level,
    label: POLLEN_LEVEL_LABELS[level],
    drivers:
      level === 0
        ? []
        : entries
            .filter((entry) => entry.level === level)
            .sort((a, b) => b.grains - a.grains)
            .slice(0, 3)
            .map((entry) => POLLEN_NAMES[entry.type]),
  };
};
