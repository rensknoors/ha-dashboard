import { useEntity } from '@hakit/core';
import { BiSolidThermometer, BiWater } from 'react-icons/bi';

import { Card } from '@/components/atoms/Card/Card';
import { IconBadge } from '@/components/atoms/IconBadge/IconBadge';
import { Label } from '@/components/atoms/Label/Label';
import { StatChip } from '@/components/atoms/StatChip/StatChip';

/** Baby room temp + humidity at a glance — no history needed here, just the
 * current reading, so two chips rather than a full GraphCard. */
const NurseryCard = () => {
  const temperature = useEntity('sensor.nursery_temperature');
  const humidity = useEntity('sensor.nursery_humidity');

  return (
    <Card className="flex flex-col gap-4">
      <Label>Babykamer</Label>
      <div className="flex flex-1 flex-col gap-3">
        <StatChip
          tone="blue"
          label="Temperatuur"
          value={`${temperature.state}°`}
          icon={
            <IconBadge size={32} className="bg-chip-blue-fg/15">
              <BiSolidThermometer className="text-chip-blue-fg h-4 w-4" />
            </IconBadge>
          }
          className="flex-1"
        />
        <StatChip
          tone="green"
          label="Vochtigheid"
          value={`${humidity.state}%`}
          icon={
            <IconBadge size={32} className="bg-chip-green-fg/15">
              <BiWater className="text-chip-green-fg h-4 w-4" />
            </IconBadge>
          }
          className="flex-1"
        />
      </div>
    </Card>
  );
};

export { NurseryCard };
