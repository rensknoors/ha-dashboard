import { Column } from '@hakit/components';
import { useEntity } from '@hakit/core';
import clsx from 'clsx';

import { Badge } from '@/components/atoms/Badge/Badge';
import {
  TileButton,
  TileButtonProps,
} from '@/components/atoms/TileButton/TileButton';
import { ROUTES } from '@/routes/routes';

const useSideBarButtons = (): TileButtonProps[] => {
  const tarriffGroupEntity = useEntity('sensor.zonneplan_current_tariff_group');

  const TariffGroupBadge = () => {
    return (
      <Badge
        className={clsx(
          'absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4',
          tarriffGroupEntity.state === 'low' && 'bg-chip-green-fg',
          tarriffGroupEntity.state === 'normal' && 'bg-mist',
          tarriffGroupEntity.state === 'high' && 'bg-danger'
        )}
      />
    );
  };

  return [
    {
      path: ROUTES.HOME,
      icon: 'mdi:tablet-dashboard',
      tone: 'pink',
    },
    {
      path: ROUTES.ENERGY,
      icon: 'mdi:lightning-bolt',
      tone: 'green',
      Badge: TariffGroupBadge,
    },
    {
      path: ROUTES.WEATHER,
      icon: 'mdi:weather-partly-cloudy',
      tone: 'blue',
    },
    {
      path: ROUTES.CAR,
      icon: 'mdi:car-electric',
      tone: 'amber',
    },
  ];
};

const SideBar = () => {
  const buttons = useSideBarButtons();

  return (
    <Column className="flex">
      {buttons.map((route, index) => (
        <TileButton key={index} {...route} />
      ))}
    </Column>
  );
};

export { SideBar };
