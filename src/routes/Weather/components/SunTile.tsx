import { formatWallClockTime } from '@/utils/weather/wallClock';

import { SunSummary } from '../utils/summarizeSun';
import { HighlightTile } from './HighlightTile';

const ARC = 'M10 46 A50 38 0 0 1 110 46';

interface SunTileProps {
  sun: SunSummary;
}

export const SunTile = ({ sun }: SunTileProps) => {
  const angle = Math.PI * (sun.progress ?? 0);
  const sunX = 60 - 50 * Math.cos(angle);
  const sunY = 46 - 38 * Math.sin(angle);

  return (
    <HighlightTile label="Zon" headline={sun.headline} detail={sun.detail}>
      <div className="flex h-full max-h-28 w-full flex-col gap-1">
        <svg viewBox="0 0 120 54" className="min-h-0 w-full flex-1" aria-hidden>
          <defs>
            <radialGradient id="sunGlow">
              <stop offset="0" stopColor="var(--color-sun)" stopOpacity="0.5" />
              <stop offset="1" stopColor="var(--color-sun)" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path
            d={ARC}
            fill="none"
            stroke="white"
            strokeOpacity="0.22"
            strokeWidth="1.5"
            strokeDasharray="3 4"
            strokeLinecap="round"
          />
          <line
            x1="2"
            y1="46"
            x2="118"
            y2="46"
            stroke="white"
            strokeOpacity="0.14"
            strokeWidth="1"
          />
          {sun.progress === null ? (
            <circle
              cx="10"
              cy="46"
              r="3.5"
              fill="var(--color-surface-elevated)"
              stroke="var(--color-sun)"
              strokeOpacity="0.6"
              strokeWidth="1.5"
            />
          ) : (
            <>
              <path
                d={ARC}
                fill="none"
                stroke="var(--color-sun)"
                strokeWidth="2"
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray={`${sun.progress} 1`}
              />
              <circle cx={sunX} cy={sunY} r="12" fill="url(#sunGlow)" />
              <circle cx={sunX} cy={sunY} r="4.5" fill="var(--color-sun)" />
            </>
          )}
        </svg>
        <div className="text-mist-muted flex justify-between text-[11px] leading-none font-medium tabular-nums">
          <span>{formatWallClockTime(sun.sunrise)}</span>
          <span>{formatWallClockTime(sun.sunset)}</span>
        </div>
      </div>
    </HighlightTile>
  );
};
