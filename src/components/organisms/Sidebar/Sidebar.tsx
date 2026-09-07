import { Column } from '@hakit/components';
import { useEntity } from '@hakit/core';
import clsx from 'clsx';
import { BiCar, BiSun } from 'react-icons/bi';
import { BsLightningCharge } from 'react-icons/bs';
import { RiDashboardHorizontalLine } from 'react-icons/ri';

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
      icon: <RiDashboardHorizontalLine size={20} />,
      background: 'bg-blue-300',
    },
    {
      path: ROUTES.ENERGY,
      icon: <BsLightningCharge size={18} />,
      background: 'bg-green-300',
      Badge: TariffGroupBadge,
    },
    {
      path: ROUTES.WEATHER,
      icon: <BiSun size={20} />,
      background: 'bg-amber-200',
    },
    {
      path: ROUTES.CAR,
      icon: <BiCar size={20} />,
      background: 'bg-white',
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
