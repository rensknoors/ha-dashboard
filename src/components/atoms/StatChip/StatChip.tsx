import { clsx } from 'clsx';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

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

/** A single soft pastel glass chip carrying one value — never a solid
 * saturated block. The system's signature "one stat, one color" unit. */
const StatChip = ({ tone, label, value, icon, className }: StatChipProps) => (
  <div className={twMerge(clsx('stat-chip', toneClasses[tone]), className)}>
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-2xl font-bold">{value}</span>
    </div>
    <span className="text-xs font-semibold tracking-wide uppercase opacity-70">
      {label}
    </span>
  </div>
);

export { StatChip };
