import { formatWallClockTime, toWallClock } from './wallClock';

/** Open-Meteo reports precipitation in steps of 0.1 mm. */
const WET_THRESHOLD = 0.1;

export interface RainStep {
  key: string;
  /** Millimetres falling in this quarter of an hour. */
  amount: number;
}

export interface RainSummary {
  steps: RainStep[];
  total: number;
  headline: string;
  detail: string;
}

interface QuarterHourly {
  time: string[];
  precipitation: (number | null)[];
}

export const summarizeRain = ({
  time,
  precipitation,
}: QuarterHourly): RainSummary => {
  const steps = time.map((key, index) => ({
    key,
    amount: precipitation[index] ?? 0,
  }));
  const total = steps.reduce((sum, step) => sum + step.amount, 0);
  const isWet = (step: RainStep) => step.amount >= WET_THRESHOLD;
  const clockAt = (step: RainStep) =>
    formatWallClockTime(toWallClock(step.key));

  const firstWet = steps.find(isWet);
  if (!firstWet) {
    return { steps, total, headline: 'Droog', detail: 'komende 2 uur' };
  }

  if (!isWet(steps[0])) {
    return {
      steps,
      total,
      headline: `Vanaf ${clockAt(firstWet)}`,
      detail: 'neerslag verwacht',
    };
  }

  const firstDry = steps.find((step) => !isWet(step));
  return firstDry
    ? {
        steps,
        total,
        headline: `Tot ${clockAt(firstDry)}`,
        detail: 'daarna droog',
      }
    : { steps, total, headline: 'Neerslag', detail: 'houdt aan' };
};
