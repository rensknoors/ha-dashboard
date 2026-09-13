import { useEntity } from '@hakit/core';
import clsx from 'clsx';
import { BiBell, BiCar, BiSun } from 'react-icons/bi';
import { BsLightningCharge } from 'react-icons/bs';
import { RiHomeLine } from 'react-icons/ri';

import { Badge } from '@/components/atoms/Badge/Badge';
import {
  TileButton,
  TileButtonProps,
} from '@/components/atoms/TileButton/TileButton';
import { ROUTES } from '@/routes/routes';

const REMINDERS_ENTITY = 'todo.reminders' as const;

const TodoCountBadge = () => {
  const entity = useEntity(REMINDERS_ENTITY);
  const parsedCount = parseInt(entity.state, 10);
  const count = Number.isNaN(parsedCount) ? 0 : parsedCount;

  if (count === 0) {
    return null;
  }

  return (
    <Badge
      text={count > 99 ? '99+' : String(count)}
      className="bg-tariff-high absolute -top-1 -right-1 text-white"
    />
  );
};

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

  const RemindersBadge = () => <TodoCountBadge />;

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
    {
      path: ROUTES.REMINDERS,
      icon: <BiBell size={20} />,
      label: 'Herinneringen',
      Badge: RemindersBadge,
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
