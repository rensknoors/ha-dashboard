import { clsx } from 'clsx';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

import { IconBadge } from '../IconBadge';

export type ChipTone = 'pink' | 'blue' | 'green' | 'amber';

const toneClasses: Record<ChipTone, string> = {
  pink: 'bg-chip-pink text-chip-pink-fg',
  blue: 'bg-chip-blue text-chip-blue-fg',
  green: 'bg-chip-green text-chip-green-fg',
  amber: 'bg-chip-amber text-chip-amber-fg',
};

export type StatChipProps = {
  tone: ChipTone;
  label: string;
  value: ReactNode;
  icon?: ReactNode;
  className?: string;
};

const StatChip = ({ tone, label, value, icon, className }: StatChipProps) => (
  <div
    className={twMerge(
      clsx('stat-chip flex flex-col justify-between gap-5', toneClasses[tone]),
      className
    )}
  >
    <IconBadge
      size={32}
      className="bg-white"
      style={{ color: toneClasses[tone] }}
    >
      {icon}
    </IconBadge>

    <div className="flex flex-col gap-0.5">
      <span className="text-md leading-tight font-bold">{value}</span>
      <span className="text-xs font-semibold tracking-wide uppercase opacity-70">
        {label}
      </span>
    </div>
  </div>
);

export { StatChip };
