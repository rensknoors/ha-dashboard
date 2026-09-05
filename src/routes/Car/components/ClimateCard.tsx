import { useEntity, useHass } from '@hakit/core';
import { ClimateEntity } from '@hakit/core';
import { BiMinus, BiPlus, BiWind } from 'react-icons/bi';
import { PiArmchairFill, PiSteeringWheelFill } from 'react-icons/pi';
import { WiSnowflakeCold } from 'react-icons/wi';

import { Card } from '@/components/atoms/Card/Card';
import { IconBadge } from '@/components/atoms/IconBadge/IconBadge';
import { useSwitchEntity } from '@/routes/Car/useSwitchEntity';

import { ToggleRow } from './ToggleRow';

const ClimateCard = () => {
  const climate = useEntity(
    'climate.tesla_model_3_climate'
  ) as ClimateEntity;
  const callService = useHass((state) => state.helpers.callService);
  const isClimateOn = climate.state !== 'off';

  const toggleClimate = () => {
    callService({
      domain: 'climate',
      service: isClimateOn ? 'turn_off' : 'turn_on',
      target: { entity_id: 'climate.tesla_model_3_climate' },
    });
  };

  const setTemperature = (delta: number) => {
    const step = climate.attributes.target_temp_step ?? 0.5;
    const next = climate.attributes.temperature + delta * step;
    callService({
      domain: 'climate',
      service: 'set_temperature',
      target: { entity_id: 'climate.tesla_model_3_climate' },
      serviceData: { temperature: next },
    });
  };

  const autoSeatLeft = useSwitchEntity(
    'switch.tesla_model_3_auto_seat_climate_left'
  );
  const autoSeatRight = useSwitchEntity(
    'switch.tesla_model_3_auto_seat_climate_right'
  );
  const autoWheel = useSwitchEntity(
    'switch.tesla_model_3_auto_steering_wheel_heater'
  );
  const defrost = useSwitchEntity('switch.tesla_model_3_defrost');

  return (
    <Card className="flex flex-1 flex-col gap-5">
      <div className="flex items-center gap-3">
        <button onClick={toggleClimate} className="card-interactive">
          <IconBadge
            size={40}
            className={
              isClimateOn ? 'bg-chip-blue text-chip-blue-fg' : undefined
            }
          >
            <BiWind className="h-5 w-5" />
          </IconBadge>
        </button>
        <div className="flex-1">
          <div className="font-semibold">Klimaat</div>
          <div className="text-mist-muted text-xs">
            Binnen {climate.attributes.current_temperature}°
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setTemperature(-1)}
            className="bg-surface-elevated card-interactive flex h-8 w-8 items-center justify-center rounded-full"
          >
            <BiMinus className="h-4 w-4" />
          </button>
          <span className="w-10 text-center text-lg font-bold">
            {climate.attributes.temperature}°
          </span>
          <button
            onClick={() => setTemperature(1)}
            className="bg-surface-elevated card-interactive flex h-8 w-8 items-center justify-center rounded-full"
          >
            <BiPlus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <ToggleRow
          icon={<PiArmchairFill className="h-4 w-4" />}
          label="Stoelverwarming links (auto)"
          isOn={autoSeatLeft.isOn}
          onToggle={autoSeatLeft.toggle}
        />
        <ToggleRow
          icon={<PiArmchairFill className="h-4 w-4" />}
          label="Stoelverwarming rechts (auto)"
          isOn={autoSeatRight.isOn}
          onToggle={autoSeatRight.toggle}
        />
        <ToggleRow
          icon={<PiSteeringWheelFill className="h-4 w-4" />}
          label="Stuurverwarming (auto)"
          isOn={autoWheel.isOn}
          onToggle={autoWheel.toggle}
        />
        <ToggleRow
          icon={<WiSnowflakeCold className="h-5 w-5" />}
          label="Ontdooien"
          isOn={defrost.isOn}
          onToggle={defrost.toggle}
        />
      </div>
    </Card>
  );
};

export { ClimateCard };
