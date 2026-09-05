import { useEntity } from '@hakit/core';
import { useMemo } from 'react';

import { parseNumber } from '@/utils/parseNumber';

import { TariffPoint } from './types';
import { useSolarForecast } from './useSolarForecast';

const CAR_BATTERY_KWH = 57.5;
const CHARGE_POWER_KW = 11;
const QUARTER_HOURS = 0.25;

export type ChargeWindowStatus =
  'ready' | 'full' | 'away' | 'unplugged' | 'unavailable';

export interface ChargeWindow {
  status: ChargeWindowStatus;
  startsAt: Date | null;
  endsAt: Date | null;
  cost: number;
  savingsVsNow: number;
  solarShare: number;
}

interface UseBestChargeWindowArgs {
  points: TariffPoint[];
  nowIndex: number;
}

const emptyWindow = (status: ChargeWindowStatus): ChargeWindow => ({
  status,
  startsAt: null,
  endsAt: null,
  cost: 0,
  savingsVsNow: 0,
  solarShare: 0,
});

export const useBestChargeWindow = ({
  points,
  nowIndex,
}: UseBestChargeWindowArgs): ChargeWindow => {
  const batteryLevel = parseNumber(
    useEntity('sensor.tesla_model_3_battery_level').state
  );
  const chargeLimit = parseNumber(
    useEntity('number.tesla_model_3_charge_limit').state
  );
  const chargeCable = useEntity(
    'binary_sensor.tesla_model_3_charge_cable'
  ).state;
  const location = useEntity('device_tracker.tesla_model_3_location').state;
  const { getSolarKw } = useSolarForecast();

  return useMemo(() => {
    if (location !== 'home') {
      return emptyWindow('away');
    }
    if (chargeCable !== 'on') {
      return emptyWindow('unplugged');
    }
    if (batteryLevel === null || chargeLimit === null) {
      return emptyWindow('unavailable');
    }

    const energyNeeded = ((chargeLimit - batteryLevel) / 100) * CAR_BATTERY_KWH;
    if (energyNeeded <= 0.05) {
      return emptyWindow('full');
    }

    const upcoming = points.slice(nowIndex);
    const quartersNeeded = Math.max(
      1,
      Math.ceil(energyNeeded / (CHARGE_POWER_KW * QUARTER_HOURS))
    );
    if (upcoming.length < quartersNeeded) {
      return emptyWindow('unavailable');
    }

    const quarterCost = (point: TariffPoint) => {
      const solarKw = getSolarKw(point.startsAt);
      const gridKw = Math.max(0, CHARGE_POWER_KW - solarKw);
      const solarKwUsed = Math.min(CHARGE_POWER_KW, solarKw);
      return {
        cost: gridKw * QUARTER_HOURS * point.price,
        solarKwh: solarKwUsed * QUARTER_HOURS,
        gridKwh: gridKw * QUARTER_HOURS,
      };
    };

    const windowTotals = (start: number) => {
      let cost = 0;
      let solarKwh = 0;
      let gridKwh = 0;
      for (let offset = 0; offset < quartersNeeded; offset += 1) {
        const quarter = quarterCost(upcoming[start + offset]);
        cost += quarter.cost;
        solarKwh += quarter.solarKwh;
        gridKwh += quarter.gridKwh;
      }
      return { cost, solarKwh, gridKwh };
    };

    let bestStart = 0;
    let best = windowTotals(0);

    for (let start = 1; start <= upcoming.length - quartersNeeded; start += 1) {
      const candidate = windowTotals(start);
      if (candidate.cost < best.cost) {
        best = candidate;
        bestStart = start;
      }
    }

    const nowTotals = windowTotals(0);
    const last = upcoming[bestStart + quartersNeeded - 1];

    return {
      status: 'ready',
      startsAt: upcoming[bestStart].startsAt,
      endsAt: new Date(last.startsAt.getTime() + 15 * 60 * 1000),
      cost: best.cost,
      savingsVsNow: Math.max(0, nowTotals.cost - best.cost),
      solarShare:
        best.solarKwh + best.gridKwh === 0
          ? 0
          : best.solarKwh / (best.solarKwh + best.gridKwh),
    };
  }, [
    batteryLevel,
    chargeCable,
    chargeLimit,
    getSolarKw,
    location,
    nowIndex,
    points,
  ]);
};
