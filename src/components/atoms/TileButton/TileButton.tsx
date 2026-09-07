import clsx from 'clsx';
import { ComponentType, type ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

export interface TileButtonProps {
  path: string;
  icon: ReactElement;
  background: string;
  Badge?: ComponentType;
}

/**
 * @param path path to the route
 * @param icon icon component
 * @param background tailwindcss color classes
 * @param Badge badge text
 */
const TileButton = ({ path, icon, background, Badge }: TileButtonProps) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        clsx(
          'relative m-2 flex aspect-square w-16 place-content-center place-items-center rounded-3xl text-black transition-all duration-200',
          background,
          !isActive &&
            'bg-[radial-gradient(circle,rgba(0,0,0,0.1),rgba(0,0,0,0.4))]',
          isActive && 'scale-105'
        )
      }
    >
      {icon}
      {Badge && <Badge />}
    </NavLink>
  );
};

export { TileButton };
