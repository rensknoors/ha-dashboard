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
          'absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4',
          tarriffGroupEntity.state === 'low' && 'bg-green-600',
          tarriffGroupEntity.state === 'normal' && 'bg-white',
          tarriffGroupEntity.state === 'high' && 'bg-red-500'
        )}
      />
    );
  };

  return [
    {
      path: ROUTES.HOME,
      icon: 'mdi:tablet-dashboard',
      background: 'bg-blue-300',
      border: 'border-white',
    },
    {
      path: ROUTES.ENERGY,
      icon: 'mdi:lightning-bolt',
      background: 'bg-green-300',
      border: 'border-white',
      Badge: TariffGroupBadge,
    },
    {
      path: ROUTES.WEATHER,
      icon: 'mdi:weather-partly-cloudy',
      background: 'bg-amber-200',
      border: 'border-white',
    },
    {
      path: ROUTES.VACUUM,
      icon: 'mdi:vacuum',
      background: 'bg-white',
      border: 'border-gray-400',
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
