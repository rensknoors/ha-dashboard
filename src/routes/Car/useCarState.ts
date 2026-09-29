import { useEntity } from '@hakit/core';
import { useMemo } from 'react';

import { parseNumber } from '@/utils/parseNumber';

import { CarConnection, CarState, CarToggle, PartState } from './types';
import { useOptimisticState } from './useOptimisticState';

const UNAVAILABLE_STATES = new Set(['unavailable', 'unknown']);

const getConnection = (state: string): CarConnection => {
  if (UNAVAILABLE_STATES.has(state)) {
    return 'unavailable';
  }
  return state === 'on' ? 'online' : 'asleep';
};

const parseTimestamp = (state: string) => {
  const date = new Date(state);
  return Number.isNaN(date.getTime()) ? null : date;
};

type OptimisticState = ReturnType<typeof useOptimisticState>;

const toPart = ({ value, isPending }: OptimisticState): PartState => ({
  isOpen: value,
  isPending,
});

const toToggle = ({
  value,
  isPending,
  toggle,
}: OptimisticState): CarToggle => ({
  isActive: value,
  isPending,
  toggle,
});

const doorPart = (state: string): PartState => ({
  isOpen: state === 'on',
  isPending: false,
});

export const useCarState = (): CarState => {
  const connection = useEntity('binary_sensor.tesla_model_3_status');
  const batteryLevel = useEntity('sensor.tesla_model_3_battery_level');
  const range = useEntity('sensor.tesla_model_3_battery_range');
  const charging = useEntity('sensor.tesla_model_3_charging');
  const chargerPower = useEntity('sensor.tesla_model_3_charger_power');
  const timeToFull = useEntity('sensor.tesla_model_3_time_to_full_charge');
  const insideTemperature = useEntity(
    'sensor.tesla_model_3_inside_temperature'
  );
  const outsideTemperature = useEntity(
    'sensor.tesla_model_3_outside_temperature'
  );

  const frontLeftDoor = useEntity(
    'binary_sensor.tesla_model_3_front_driver_door'
  );
  const frontRightDoor = useEntity(
    'binary_sensor.tesla_model_3_front_passenger_door'
  );
  const rearLeftDoor = useEntity(
    'binary_sensor.tesla_model_3_rear_driver_door'
  );
  const rearRightDoor = useEntity(
    'binary_sensor.tesla_model_3_rear_passenger_door'
  );

  const frunkEntity = useEntity('cover.tesla_model_3_frunk');
  const trunkEntity = useEntity('cover.tesla_model_3_trunk');
  const chargePortEntity = useEntity('cover.tesla_model_3_charge_port_door');
  const lockEntity = useEntity('lock.tesla_model_3_lock');
  const climateEntity = useEntity('climate.tesla_model_3_climate');
  const defrostEntity = useEntity('switch.tesla_model_3_defrost');
  const sentryEntity = useEntity('switch.tesla_model_3_sentry_mode');
  const flashLights = useEntity('button.tesla_model_3_flash_lights');
  const honkHorn = useEntity('button.tesla_model_3_honk_horn');
  const wake = useEntity('button.tesla_model_3_wake');

  const frunk = useOptimisticState(frunkEntity.state === 'open', (isOpen) =>
    isOpen ? frunkEntity.service.openCover() : undefined
  );
  const trunk = useOptimisticState(trunkEntity.state === 'open', (isOpen) =>
    isOpen ? trunkEntity.service.openCover() : trunkEntity.service.closeCover()
  );
  const chargePort = useOptimisticState(
    chargePortEntity.state === 'open',
    (isOpen) =>
      isOpen
        ? chargePortEntity.service.openCover()
        : chargePortEntity.service.closeCover()
  );
  const lock = useOptimisticState(lockEntity.state === 'locked', (isLocked) =>
    isLocked ? lockEntity.service.lock() : lockEntity.service.unlock()
  );
  const climate = useOptimisticState(
    climateEntity.state !== 'off' &&
      !UNAVAILABLE_STATES.has(climateEntity.state),
    (isOn) =>
      isOn ? climateEntity.service.turnOn() : climateEntity.service.turnOff()
  );
  const defrost = useOptimisticState(defrostEntity.state === 'on', (isOn) =>
    isOn ? defrostEntity.service.turnOn() : defrostEntity.service.turnOff()
  );
  const sentry = useOptimisticState(sentryEntity.state === 'on', (isOn) =>
    isOn ? sentryEntity.service.turnOn() : sentryEntity.service.turnOff()
  );

  const isCharging = charging.state === 'charging';

  const status = useMemo(
    () => ({
      connection: getConnection(connection.state),
      batteryLevel: parseNumber(batteryLevel.state),
      range: parseNumber(range.state),
      isCharging,
      chargerPower: isCharging ? parseNumber(chargerPower.state) : null,
      fullyChargedAt: isCharging ? parseTimestamp(timeToFull.state) : null,
      insideTemperature: parseNumber(insideTemperature.state),
      outsideTemperature: parseNumber(outsideTemperature.state),
    }),
    [
      batteryLevel.state,
      chargerPower.state,
      connection.state,
      insideTemperature.state,
      isCharging,
      outsideTemperature.state,
      range.state,
      timeToFull.state,
    ]
  );

  return {
    status,
    parts: {
      frunk: toPart(frunk),
      trunk: toPart(trunk),
      frontLeftDoor: doorPart(frontLeftDoor.state),
      frontRightDoor: doorPart(frontRightDoor.state),
      rearLeftDoor: doorPart(rearLeftDoor.state),
      rearRightDoor: doorPart(rearRightDoor.state),
    },
    hotspots: {
      frunk: {
        ...toPart(frunk),
        toggle: frunk.toggle,
        canToggle: !frunk.value,
      },
      trunk: { ...toPart(trunk), toggle: trunk.toggle, canToggle: true },
      chargePort: {
        ...toPart(chargePort),
        toggle: chargePort.toggle,
        canToggle: true,
      },
    },
    controls: {
      lock: toToggle(lock),
      climate: toToggle(climate),
      defrost: toToggle(defrost),
      sentry: toToggle(sentry),
      flashLights: () => flashLights.service.press(),
      honkHorn: () => honkHorn.service.press(),
      wake: () => wake.service.press(),
    },
  };
};
