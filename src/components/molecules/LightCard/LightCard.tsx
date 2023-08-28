import {
  EntityName,
  HassEntityWithApi,
  useEntity,
  useIconByEntity,
} from '@hakit/core';
import { clsx } from 'clsx';

import { Card, CardProps } from '@/components/atoms/Card/Card';

export type LightCardProps = {
  entity: EntityName;
} & CardProps;

const LightCard = ({ entity, className }: LightCardProps) => {
  const light = useEntity(entity) as HassEntityWithApi<'light'>;
  const icon = useIconByEntity(entity);
  const brightness = light.attributes.brightness
    ? Math.round(light.attributes.brightness / 2.55) + '%'
    : '0%';

  return (
    <>
      <Card
        className={clsx(
          className,
          'transition-background flex min-h-[120px] cursor-pointer flex-col duration-1000',
          light.state === 'on' && 'bg-orange-300 text-black',
          light.state === 'off' && 'text-white'
        )}
        style={{
          backgroundColor: light.attributes.rgb_color
            ? `rgb(${light.attributes.rgb_color?.join(',')})`
            : undefined,
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
                'transition-position absolute h-3 w-3 -translate-x-1/2 rounded-md duration-1000',
                light.state === 'on' && 'bg-black',
                light.state === 'off' && 'bg-white'
              )}
              style={{ left: brightness }}
            ></div>
          </div>
        </div>
      </Card>
    </>
  );
};

export { LightCard };
