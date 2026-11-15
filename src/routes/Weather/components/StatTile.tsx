import { clsx } from 'clsx';
import { ReactNode } from 'react';

import { IconBadge } from '@/components/atoms/IconBadge/IconBadge';

interface StatTileProps {
  icon: ReactNode;
  label: string;
  value: ReactNode;
  detail?: ReactNode;
  /** Dims the value when there is nothing noteworthy to report. */
  quiet?: boolean;
}

export const StatTile = ({
  icon,
  label,
  value,
  detail,
  quiet = false,
}: StatTileProps) => (
  <div className="weather-tile flex min-w-0 items-center gap-3 px-3 py-2">
    <IconBadge size={30} className="text-mist-muted bg-white/6">
      {icon}
    </IconBadge>
    <div className="min-w-0">
      <div className="text-mist-muted text-[10px] font-semibold tracking-[0.12em] uppercase">
        {label}
      </div>
      <div className="flex min-w-0 items-baseline gap-1.5">
        <span
          className={clsx(
            'shrink-0 text-sm leading-tight font-bold tabular-nums',
            quiet && 'text-mist-muted font-semibold'
          )}
        >
          {value}
        </span>
        {detail ? (
          <span className="text-mist-muted truncate text-xs">{detail}</span>
        ) : null}
      </div>
    </div>
  </div>
);
