import { useEntity, useHass } from '@hakit/core';
import { BiPlug } from 'react-icons/bi';

import { Card } from '@/components/atoms/Card/Card';
import { StatChip } from '@/components/atoms/StatChip/StatChip';
import { useSwitchEntity } from '@/routes/Car/useSwitchEntity';

import { ToggleRow } from './ToggleRow';

interface NumberAttributes {
  min?: number;
  max?: number;
  step?: number;
}

const ChargingCard = () => {
  const { isOn: isCharging, toggle: toggleCharge } = useSwitchEntity(
    'switch.tesla_model_3_charge'
  );
  const callService = useHass((state) => state.helpers.callService);

  const chargeLimit = useEntity('number.tesla_model_3_charge_limit');
  const { min = 50, max = 100, step = 5 } =
    chargeLimit.attributes as NumberAttributes;
  const limitValue = Number(chargeLimit.state) || max;

  const chargerPower = useEntity('sensor.tesla_model_3_charger_power');
  const chargeRate = useEntity('sensor.tesla_model_3_charge_rate');
  const energyAdded = useEntity('sensor.tesla_model_3_charge_energy_added');

  const setChargeLimit = (value: number) => {
    callService({
      domain: 'number',
      service: 'set_value',
      target: { entity_id: 'number.tesla_model_3_charge_limit' },
      serviceData: { value: String(value) },
    });
  };

  return (
    <Card className="flex flex-1 flex-col gap-5">
      <ToggleRow
        icon={<BiPlug className="h-5 w-5" />}
        label={isCharging ? 'Bezig met laden' : 'Laden starten'}
        isOn={isCharging}
        onToggle={toggleCharge}
      />

      <div className="flex flex-col gap-2">
        <div className="text-mist-muted flex justify-between text-xs font-semibold tracking-wide uppercase">
          <span>Laadlimiet</span>
          <span>{limitValue}%</span>
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={limitValue}
          onChange={(event) => setChargeLimit(Number(event.target.value))}
          className="accent-chip-amber-fg h-2 w-full cursor-pointer"
        />
      </div>

      <div className="flex gap-3">
        <StatChip
          tone="amber"
          label="Vermogen"
          value={`${chargerPower.state} ${chargerPower.attributes.unit_of_measurement ?? 'kW'}`}
          className="flex-1"
        />
        <StatChip
          tone="green"
          label="Snelheid"
          value={`${chargeRate.state}`}
          className="flex-1"
        />
        <StatChip
          tone="blue"
          label="Toegevoegd"
          value={`${energyAdded.state} ${energyAdded.attributes.unit_of_measurement ?? 'kWh'}`}
          className="flex-1"
        />
      </div>
    </Card>
  );
};

export { ChargingCard };
