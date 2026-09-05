import { ModalByEntityDomain } from '@hakit/components';
import {
  EntityName,
  HassEntityWithService,
  useEntity,
  useIconByEntity,
} from '@hakit/core';
import { clsx } from 'clsx';
import { ReactElement, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { Card, CardProps } from '@/components/atoms/Card/Card';
import { IconBadge } from '@/components/atoms/IconBadge/IconBadge';

export type IconBaseProps = React.SVGAttributes<SVGElement> & {
  children?: React.ReactNode;
  size?: string | number;
  color?: string;
  title?: string;
};

export type LightCardProps = {
  entity: EntityName;
  Icon?: (props: IconBaseProps) => ReactElement;
  label?: string;
} & CardProps;

const LightCard = ({ entity, className, Icon, label }: LightCardProps) => {
  const light = useEntity(entity) as HassEntityWithService<'light'>;
  const EntityIcon = useIconByEntity(entity);
  const [open, setOpen] = useState(false);
  const isOn = light.state === 'on';
  const brightness = light.attributes.brightness
    ? Math.round(light.attributes.brightness / 2.55) + '%'
    : '0%';
  // The card's own background is the bulb's actual live color when it
  // reports one — a light card's surface IS the light, not an icon of it.
  const glowColor = light.attributes.rgb_color
    ? `rgb(${light.attributes.rgb_color.join(',')})`
    : undefined;

  return (
    <>
      <Card
        className={twMerge(
          clsx(
            'flex min-h-[125px] flex-col gap-3 transition-colors duration-1000',
            isOn
              ? clsx('text-ink', !glowColor && 'bg-chip-amber')
              : 'text-mist-muted'
          ),
          className
        )}
        style={{ backgroundColor: glowColor }}
        onClick={light.service.toggle}
        onLongPress={() => setOpen(true)}
      >
        <IconBadge size={40} className={isOn ? 'bg-black/10' : undefined}>
          {Icon ? (
            <Icon size={20} />
          ) : (
            <div className="flex h-5 w-5 items-center justify-center">
              {EntityIcon}
            </div>
          )}
        </IconBadge>

        <div className="flex-1 font-semibold">
          {label ?? light.attributes.friendly_name}
        </div>

        <div
          className={clsx(
            'h-3 w-full rounded-full px-2',
            isOn ? 'bg-black/15' : 'bg-mist/10'
          )}
        >
          <div className="relative flex h-full w-full items-center">
            <div
              className={clsx(
                'absolute h-2.5 w-2.5 -translate-x-1/2 rounded-full transition-[left] duration-1000',
                isOn ? 'bg-ink' : 'bg-mist-muted'
              )}
              style={{ left: brightness }}
            />
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
