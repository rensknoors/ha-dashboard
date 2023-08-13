import { Column } from '@hakit/components';
import {
  TileButton,
  TileButtonProps,
} from '@/components/atoms/TileButton/TileButton';

const buttons: Array<TileButtonProps> = [
  {
    path: '/',
    name: 'Home',
    icon: 'mdi:tablet-dashboard',
    color: 'bg-blue-300',
  },
  {
    path: '/vacuum',
    name: 'Vacuum',
    icon: 'mdi:vacuum',
    color: 'bg-green-300',
  },
  {
    path: '/weather',
    name: 'Weather',
    icon: 'mdi:weather-partly-cloudy',
    color: 'bg-amber-200',
  },
  {
    path: '/media',
    name: 'Media',
    icon: 'mdi:play-pause',
    color: 'bg-white',
  },
];

const SideBar = () => {
  return (
    <Column className="flex">
      {buttons.map((route) => (
        <TileButton {...route} />
      ))}
    </Column>
  );
};

export { SideBar };
