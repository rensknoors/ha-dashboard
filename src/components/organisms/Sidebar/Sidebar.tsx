import { useEntity } from '@hakit/core';
import clsx from 'clsx';
import { BiCar, BiSun } from 'react-icons/bi';
import { BsLightningCharge } from 'react-icons/bs';
import { RiHomeLine } from 'react-icons/ri';

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
      icon: <RiHomeLine size={22} />,
      label: 'Home',
    },
    {
      path: ROUTES.ENERGY,
      icon: <BsLightningCharge size={20} />,
      label: 'Energie',
      Badge: TariffGroupBadge,
    },
    {
      path: ROUTES.WEATHER,
      icon: <BiSun size={22} />,
      label: 'Weer',
    },
    {
      path: ROUTES.CAR,
      icon: <BiCar size={22} />,
      label: 'Auto',
    },
  ];
};

const SideBar = () => {
  const buttons = useSideBarButtons();

  return (
    <nav className="flex h-full flex-col items-center pr-6">
      <div className="flex flex-col items-center gap-5">
        {buttons.map((route) => (
          <TileButton key={route.path} {...route} />
        ))}
      </div>
    </nav>
  );
};

export { SideBar };
