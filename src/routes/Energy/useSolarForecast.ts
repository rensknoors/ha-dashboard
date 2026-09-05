import { useEntity } from '@hakit/core';
import { useCallback, useMemo } from 'react';

import { useWeather } from '@/api/weather/useWeather';
import { getDayKey } from '@/utils/getDayKey';
import { parseNumber } from '@/utils/parseNumber';

const HOUR_MS = 60 * 60 * 1000;

export const useSolarForecast = () => {
  const { data } = useWeather();
  const productionToday = parseNumber(
    useEntity('sensor.energy_production_today').state
  );
  const productionTomorrow = parseNumber(
    useEntity('sensor.energy_production_tomorrow').state
  );

  const scaleByDay = useMemo(() => {
    const scales = new Map<string, number>();
    if (!data) {
      return scales;
    }

    const radiationByDay = new Map<string, number>();
    data.hourly.time.forEach((time, index) => {
      const key = getDayKey(new Date(time));
      radiationByDay.set(
        key,
        (radiationByDay.get(key) ?? 0) + data.hourly.shortwave_radiation[index]
      );
    });

    const todayKey = getDayKey(new Date());
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowKey = getDayKey(tomorrow);

    for (const [dayKey, radiationSum] of radiationByDay) {
      const targetKwh =
        dayKey === tomorrowKey
          ? productionTomorrow
          : dayKey === todayKey
            ? productionToday
            : productionToday;
      if (!targetKwh || radiationSum <= 0) {
        continue;
      }
      scales.set(dayKey, targetKwh / radiationSum);
    }

    return scales;
  }, [data, productionToday, productionTomorrow]);

  const getSolarKw = useCallback(
    (at: Date) => {
      if (!data) {
        return 0;
      }

      const { time, shortwave_radiation: radiation } = data.hourly;
      const atMs = at.getTime();
      const index = time.findIndex((value, current) => {
        const next = time[current + 1];
        const start = new Date(value).getTime();
        const end = next ? new Date(next).getTime() : start + HOUR_MS;
        return atMs >= start && atMs < end;
      });

      if (index === -1) {
        return 0;
      }

      const startMs = new Date(time[index]).getTime();
      const nextTime = time[index + 1];
      const endMs = nextTime ? new Date(nextTime).getTime() : startMs + HOUR_MS;
      const progress =
        endMs === startMs ? 0 : (atMs - startMs) / (endMs - startMs);
      const nextRadiation = radiation[index + 1] ?? radiation[index];
      const interpolated =
        radiation[index] + (nextRadiation - radiation[index]) * progress;
      const scale = scaleByDay.get(getDayKey(at)) ?? 0;

      return Math.max(0, interpolated * scale);
    },
    [data, scaleByDay]
  );

  return { getSolarKw };
};
