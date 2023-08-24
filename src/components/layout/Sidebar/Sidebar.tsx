import { Column } from '@hakit/components';

import {
  TileButton,
  TileButtonProps,
} from '@/components/atoms/TileButton/TileButton';

const buttons: TileButtonProps[] = [
  {
    path: '/',
    icon: 'mdi:tablet-dashboard',
    color: 'bg-blue-300',
  },
  {
    path: '/vacuum',
    icon: 'mdi:vacuum',
    color: 'bg-green-300',
  },
  {
    path: '/weather',
    icon: 'mdi:weather-partly-cloudy',
    color: 'bg-amber-200',
  },
  {
    path: '/media',
    icon: 'mdi:play-pause',
    color: 'bg-white',
  },
];

const SideBar = () => {
  return (
    <Column className="flex">
      {buttons.map((route, index) => (
        <TileButton key={index} {...route} />
      ))}
    </Column>
  );
};

export { SideBar };
