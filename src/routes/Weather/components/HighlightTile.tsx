import { ReactNode } from 'react';

interface HighlightTileProps {
  label: string;
  headline: ReactNode;
  detail: ReactNode;
  /** The visual that fills the middle of the tile. */
  children: ReactNode;
}

export const HighlightTile = ({
  label,
  headline,
  detail,
  children,
}: HighlightTileProps) => (
  <div className="weather-tile relative flex min-h-0 min-w-0 flex-col gap-2 px-3.5 py-3">
    {/* Floats over the corner so the visual can use the full tile height. */}
    <div className="text-mist-muted absolute top-3 left-3.5 text-[11px] font-semibold tracking-[0.12em] uppercase">
      {label}
    </div>
    <div className="flex min-h-0 flex-1 items-center justify-center">
      {children}
    </div>
    <div className="min-w-0">
      <div className="truncate text-lg leading-tight font-bold tracking-tight tabular-nums">
        {headline}
      </div>
      <div className="text-mist-muted truncate text-xs">{detail}</div>
    </div>
  </div>
);
