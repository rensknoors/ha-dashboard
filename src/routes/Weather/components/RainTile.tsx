import { RainSummary } from '../utils/summarizeRain';
import { HighlightTile } from './HighlightTile';

/** Millimetres per quarter of an hour that fill the tile; about 10 mm/h. */
const HEAVY_RAIN = 2.5;

interface RainTileProps {
  rain: RainSummary;
}

export const RainTile = ({ rain }: RainTileProps) => (
  <HighlightTile
    label="Neerslag 2 uur"
    headline={rain.headline}
    detail={rain.detail}
  >
    <div className="flex h-full w-full flex-col gap-1.5 pt-7">
      <div className="flex min-h-0 flex-1 items-end gap-1.5">
        {rain.steps.map((step) => {
          const isWet = step.amount > 0;
          // Square-root scale, so light drizzle is still clearly visible.
          const height = Math.min(Math.sqrt(step.amount / HEAVY_RAIN), 1);

          return (
            <div
              key={step.key}
              className={
                isWet
                  ? 'bg-rain flex-1 rounded-full'
                  : 'flex-1 rounded-full bg-white/10'
              }
              style={{ height: isWet ? `${Math.max(height * 100, 14)}%` : 4 }}
            />
          );
        })}
      </div>
      <div className="text-mist-muted flex justify-between text-[10px] leading-none font-medium">
        <span>nu</span>
        <span>+1 u</span>
        <span>+2 u</span>
      </div>
    </div>
  </HighlightTile>
);
