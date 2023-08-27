import { useEntity, useIconByEntity } from '@hakit/core';
import { clsx } from 'clsx';

import { Card, CardProps } from '@/components/atoms/Card/Card';

export type LightCardProps = {
  entity: `light.${string}`;
} & CardProps;

const LightCard = ({ entity, className }: LightCardProps) => {
  const light = useEntity(entity);
  const icon = useIconByEntity(entity);
  const brightness = light.attributes.brightness
    ? Math.round(light.attributes.brightness / 2.55) + '%'
    : '0%';
  const textColor = light.state === 'on' ? 'black' : 'white';

  console.log(light);
  console.log(light.attributes.brightness, brightness);

  return (
    <Card
      className={clsx(
        className,
        'flex min-h-[120px] cursor-pointer flex-col',
        `text-${textColor}`
      )}
      style={{
        backgroundColor: `rgb(${light.attributes.rgb_color?.join(',')})`,
      }}
      onClick={() => light.api.toggle()}
    >
      <div>{icon}</div>
      <div className="flex-1">{light.attributes.friendly_name}</div>
      <div
        className={clsx(
          'h-4 w-full rounded-lg px-2',
          light.state === 'on' && 'bg-gradient-to-r from-white/30 to-white',
          light.state === 'off' && 'bg-slate-500/20'
        )}
      >
        <div className="relative flex h-full w-full items-center">
          <div
            className={clsx(
              'absolute h-3 w-3 -translate-x-1/2 rounded-md',
              `bg-${textColor}`
            )}
            style={{ left: brightness }}
          ></div>
        </div>
      </div>
    </Card>
  );
};

export { LightCard };
