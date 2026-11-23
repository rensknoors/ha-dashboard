import { useEntity } from '@hakit/core';
import { useMemo } from 'react';

import { parseNumber } from '@/utils/parseNumber';

import { ChargePlanWindow, parseChargePlan } from './parseChargePlan';

export interface ChargePlan {
  window: ChargePlanWindow | null;
  /** The HA plan wants the car charging right now. */
  isActive: boolean;
  batteryLevel: number | null;
  targetLevel: number | null;
  isHome: boolean;
  isPluggedIn: boolean;
}

/** Reads the charge plan that Home Assistant calculates for the Tesla. */
export const useChargePlan = (): ChargePlan => {
  const plan = useEntity('input_text.tesla_laadplan').state;
  const isActive =
    useEntity('binary_sensor.tesla_laden_gewenst').state === 'on';
  const batteryLevel = parseNumber(
    useEntity('sensor.tesla_model_3_battery_level').state
  );
  const targetLevel = parseNumber(
    useEntity('input_number.tesla_doelniveau').state
  );
  const isHome =
    useEntity('device_tracker.tesla_model_3_location').state === 'home';
  const isPluggedIn =
    useEntity('binary_sensor.tesla_model_3_charge_cable').state === 'on';

  const window = useMemo(() => parseChargePlan(plan), [plan]);

  return { window, isActive, batteryLevel, targetLevel, isHome, isPluggedIn };
};
