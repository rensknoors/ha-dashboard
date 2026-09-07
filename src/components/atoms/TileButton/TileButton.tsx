import clsx from 'clsx';
import { ComponentType, type ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

export interface TileButtonProps {
  path: string;
  icon: ReactElement;
  label: string;
  Badge?: ComponentType;
}

const TileButton = ({ path, icon, label, Badge }: TileButtonProps) => {
  return (
    <NavLink
      to={path}
      end
      aria-label={label}
      className={({ isActive }) =>
        clsx(
          'relative flex size-11 items-center justify-center rounded-2xl transition-colors duration-200',
          'focus-visible:ring-mist/40 focus-visible:ring-2 focus-visible:outline-none',
          isActive
            ? 'bg-nav-active text-canvas'
            : 'text-mist-muted hover:text-mist'
        )
      }
    >
      {icon}
      {Badge && <Badge />}
    </NavLink>
  );
};

export { TileButton };
