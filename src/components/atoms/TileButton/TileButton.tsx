import { useIcon } from '@hakit/core';
import clsx from 'clsx';
import { ComponentType } from 'react';
import { NavLink } from 'react-router-dom';

export type TileButtonTone = 'pink' | 'green' | 'blue' | 'amber';

export interface TileButtonProps {
  path: string;
  icon: string;
  tone: TileButtonTone;
  Badge?: ComponentType;
}

const toneActiveClasses: Record<TileButtonTone, string> = {
  pink: 'bg-chip-pink text-chip-pink-fg',
  green: 'bg-chip-green text-chip-green-fg',
  blue: 'bg-chip-blue text-chip-blue-fg',
  amber: 'bg-chip-amber text-chip-amber-fg',
};

/**
 * @param path path to the route
 * @param icon mdi icon name
 * @param tone pastel chip tone shown only when this route is active
 * @param Badge badge text
 */
const TileButton = ({ path, icon, tone, Badge }: TileButtonProps) => {
  const svg = useIcon(icon);
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        clsx(
          'rounded-tile relative m-2 flex aspect-square w-14 place-content-center place-items-center text-xl transition-all duration-200',
          isActive
            ? clsx(toneActiveClasses[tone], 'scale-105')
            : 'text-mist-muted hover:text-mist'
        )
      }
    >
      {svg}
      {Badge && <Badge />}
    </NavLink>
  );
};

export { TileButton };
