import { useIcon } from '@hakit/core';
import clsx from 'clsx';
import { ComponentType } from 'react';
import { NavLink } from 'react-router-dom';

export interface TileButtonProps {
  path: string;
  icon: string;
  background: string;
  border?: string;
  Badge?: ComponentType;
}

/**
 * @param path path to the route
 * @param icon mdi icon name
 * @param background tailwindcss color classes
 * @param border tailwindcss border classes
 * @param badge badge text
 */
const TileButton = ({
  icon,
  background,
  border = 'bg-black',
  Badge,
  path,
}: TileButtonProps) => {
  const svg = useIcon(icon);
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        clsx(
          'relative m-2 flex aspect-square w-16 place-content-center place-items-center rounded-3xl text-black',
          background,
          border && isActive && `border-4 ${border}`
        )
      }
    >
      {svg}
      {Badge && <Badge />}
    </NavLink>
  );
};

export { TileButton };
