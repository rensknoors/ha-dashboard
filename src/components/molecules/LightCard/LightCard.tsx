import { ModalByEntityDomain } from '@hakit/components';
import {
  EntityName,
  HassEntityWithService,
  useEntity,
  useIconByEntity,
} from '@hakit/core';
import { clsx } from 'clsx';
import { useState } from 'react';

import { Card, CardProps } from '@/components/atoms/Card/Card';

export type LightCardProps = {
  entity: EntityName;
  Icon?: () => JSX.Element;
  label?: string;
} & CardProps;

const LightCard = ({ entity, className, Icon, label }: LightCardProps) => {
  const light = useEntity(entity) as HassEntityWithService<'light'>;
  const EntityIcon = useIconByEntity(entity);
  const [open, setOpen] = useState(false);
  const brightness = light.attributes.brightness
    ? Math.round(light.attributes.brightness / 2.55) + '%'
    : '0%';

  return (
    <>
      <Card
        className={clsx(
          className,
          'flex min-h-[120px] cursor-pointer flex-col transition-background duration-1000',
          light.state === 'on' && 'bg-orange-300 text-black',
          light.state === 'off' && 'text-white'
        )}
        style={{
          backgroundColor: light.attributes.rgb_color
            ? `rgb(${light.attributes.rgb_color?.join(',')})`
            : undefined,
        }}
        onClick={light.service.toggle}
        onLongPress={() => setOpen(true)}
      >
        {Icon ? <Icon /> : <div>{EntityIcon}</div>}
        <div className="flex-1">{label ?? light.attributes.friendly_name}</div>
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
                'absolute h-3 w-3 -translate-x-1/2 rounded-md transition-position duration-1000',
                light.state === 'on' && 'bg-black',
                light.state === 'off' && 'bg-white'
              )}
              style={{ left: brightness }}
            ></div>
          </div>
        </div>
      </Card>
      <ModalByEntityDomain
        title={light.attributes.friendly_name ?? 'Light'}
        entity={entity}
        id="light-card-modal"
        onClose={() => setOpen(false)}
        open={open}
      />
    </>
  );
};

export { LightCard };
