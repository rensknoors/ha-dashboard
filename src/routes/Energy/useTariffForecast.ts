import { useEntity } from '@hakit/core';
import { useMemo } from 'react';
import { z } from 'zod';

import { formatClock } from '@/utils/formatClock';
import { getDayKey } from '@/utils/getDayKey';

import { TariffDay, TariffPoint, TodayTariffStats } from './types';

const PRICE_SCALE = 10_000_000;
const CHART_LOOKBACK_MS = 4 * 60 * 60 * 1000;

const forecastEntrySchema = z.object({
  start_date: z.string(),
  end_date: z.string(),
  price_tax_included: z.object({
    amount: z.number(),
  }),
});

const forecastSchema = z.array(forecastEntrySchema);

const classifyDay = (
  startsAt: Date,
  todayKey: string,
  tomorrowKey: string
): TariffDay => {
  const key = getDayKey(startsAt);
  if (key === todayKey) {
    return 'today';
  }
  if (key === tomorrowKey) {
    return 'tomorrow';
  }
  return 'past';
};

export const useTariffForecast = () => {
  const entity = useEntity(
    'sensor.zonneplan_current_quarter_hourly_electricity_tariff'
  );

  return useMemo(() => {
    const parsed = forecastSchema.safeParse(entity.attributes.forecast);
    const now = new Date();
    const todayKey = getDayKey(now);
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    const tomorrowKey = getDayKey(tomorrow);

    const points: TariffPoint[] = parsed.success
      ? parsed.data.map((entry) => {
          const startsAt = new Date(entry.start_date);
          return {
            startsAt,
            label: formatClock(startsAt),
            price: entry.price_tax_included.amount / PRICE_SCALE,
            day: classifyDay(startsAt, todayKey, tomorrowKey),
          };
        })
      : [];

    const nowMs = now.getTime();
    let nowIndex = 0;
    for (let index = 0; index < points.length; index += 1) {
      if (points[index].startsAt.getTime() <= nowMs) {
        nowIndex = index;
      }
    }

    const lookbackStart = nowMs - CHART_LOOKBACK_MS;
    let chartStartIndex = 0;
    for (let index = 0; index < points.length; index += 1) {
      if (points[index].startsAt.getTime() <= lookbackStart) {
        chartStartIndex = index;
      }
    }

    const chartPoints = points.slice(chartStartIndex);
    const chartNowIndex = nowIndex - chartStartIndex;

    const dayBoundaries = chartPoints.flatMap((point, index) => {
      if (index === 0) {
        return [];
      }
      if (
        getDayKey(point.startsAt) === getDayKey(chartPoints[index - 1].startsAt)
      ) {
        return [];
      }
      return [index];
    });

    const todayPoints = points.filter((point) => point.day === 'today');
    const today: TodayTariffStats | null =
      todayPoints.length === 0
        ? null
        : todayPoints.reduce<TodayTariffStats>(
            (stats, point) => {
              if (point.price < stats.min) {
                return { ...stats, min: point.price, minAt: point.startsAt };
              }
              if (point.price > stats.max) {
                return { ...stats, max: point.price, maxAt: point.startsAt };
              }
              return stats;
            },
            {
              min: todayPoints[0].price,
              max: todayPoints[0].price,
              minAt: todayPoints[0].startsAt,
              maxAt: todayPoints[0].startsAt,
            }
          );

    return {
      points,
      nowIndex,
      chartPoints,
      chartNowIndex,
      dayBoundaries,
      today,
      currentPrice: points[nowIndex]?.price ?? null,
    };
  }, [entity.attributes.forecast]);
};
