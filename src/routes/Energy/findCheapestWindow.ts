import { PriceWindow, TariffPoint } from './types';

const QUARTER_MS = 15 * 60 * 1000;

export const findCheapestWindow = (
  points: TariffPoint[],
  quarterCount: number
): PriceWindow | null => {
  if (quarterCount <= 0 || points.length < quarterCount) {
    return null;
  }

  let windowSum = 0;
  for (let index = 0; index < quarterCount; index += 1) {
    windowSum += points[index].price;
  }

  let bestSum = windowSum;
  let bestStart = 0;

  for (let index = quarterCount; index < points.length; index += 1) {
    windowSum += points[index].price - points[index - quarterCount].price;
    if (windowSum < bestSum) {
      bestSum = windowSum;
      bestStart = index - quarterCount + 1;
    }
  }

  const start = points[bestStart];
  const last = points[bestStart + quarterCount - 1];

  return {
    startIndex: bestStart,
    endIndex: bestStart + quarterCount,
    startsAt: start.startsAt,
    endsAt: new Date(last.startsAt.getTime() + QUARTER_MS),
    averagePrice: bestSum / quarterCount,
  };
};
