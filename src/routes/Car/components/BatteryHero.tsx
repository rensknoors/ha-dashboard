import { useEntity } from '@hakit/core';
import { BiSolidBattery, BiSolidBatteryCharging } from 'react-icons/bi';

import { Card } from '@/components/atoms/Card/Card';

// The tesla_custom integration's raw state casing has varied across
// versions ("Charging" vs "charging") — normalize to lowercase for lookup.
const chargingStateLabels: Record<string, string> = {
  charging: 'Bezig met laden',
  stopped: 'Laden gestopt',
  complete: 'Volledig opgeladen',
  disconnected: 'Niet aangesloten',
  nopower: 'Geen stroom beschikbaar',
};

/** The one warm hero panel on this screen — battery is the single fact
 * everyone glances at first, same role Time plays on Home. */
const BatteryHero = () => {
  const batteryLevel = useEntity('sensor.tesla_model_3_battery_level');
  const batteryRange = useEntity('sensor.tesla_model_3_battery_range');
  const chargingState = useEntity('sensor.tesla_model_3_charging');
  const timeToFull = useEntity('sensor.tesla_model_3_time_to_full_charge');

  const isCharging = chargingState.state.toLowerCase() === 'charging';
  const rangeUnit = batteryRange.attributes.unit_of_measurement ?? 'km';
  const stateLabel =
    chargingStateLabels[chargingState.state.toLowerCase()] ??
    chargingState.state;
  const rangeValue = Number(batteryRange.state);
  const roundedRange = Number.isFinite(rangeValue)
    ? Math.round(rangeValue)
    : batteryRange.state;

  return (
    <Card
      variant="panel"
      className="flex flex-1 flex-col items-center justify-center gap-2 text-center"
    >
      <div className="flex items-center gap-3">
        {isCharging ? (
          <BiSolidBatteryCharging className="text-chip-green-fg h-10 w-10" />
        ) : (
          <BiSolidBattery className="h-10 w-10" />
        )}
        <span className="text-7xl font-bold">{batteryLevel.state}%</span>
      </div>
      <span className="text-ink-muted text-lg font-medium">
        {roundedRange} {rangeUnit} bereik
      </span>
      <span className="text-ink-muted text-sm">
        {stateLabel}
        {isCharging &&
          timeToFull.state &&
          timeToFull.state !== 'unavailable' &&
          ` · nog ${timeToFull.state} u tot vol`}
      </span>
    </Card>
  );
};

export { BatteryHero };
