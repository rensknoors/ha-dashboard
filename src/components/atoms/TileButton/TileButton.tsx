import { useIcon } from '@hakit/core';
import { ComponentType } from 'react';
import { Link } from 'react-router-dom';

export interface TileButtonProps {
  path: string;
  icon: string;
  color: string;
  Badge?: ComponentType;
}

/**
 * @param color tailwindcss color classes
 * @param icon mdi icon name
 * @param badge badge text
 * @param path path to the route
 */
const TileButton = ({ icon, color, Badge, path }: TileButtonProps) => {
  const svg = useIcon(icon);
  return (
    <Link
      to={path}
      className={`${color} relative m-2 flex aspect-square w-16 place-content-center place-items-center rounded-3xl text-black`}
    >
      {svg}
      {Badge && <Badge />}
    </Link>
  );
};

export { TileButton };
