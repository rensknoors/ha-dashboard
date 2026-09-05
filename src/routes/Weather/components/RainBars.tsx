import { clsx } from 'clsx';

export interface RainBarsProps {
  labels: string[];
  values: number[];
  /** mm value a bar needs to reach to render at full height */
  maxValue?: number;
  className?: string;
}

/** A plain bar row for precipitation amount — deliberately simpler than the
 * Energy chart's touch-scrub bars: this is glanceable weather texture, not
 * an interactive instrument. */
const RainBars = ({
  labels,
  values,
  maxValue = 2,
  className,
}: RainBarsProps) => {
  const scale = Math.max(maxValue, ...values, 0.1);

  return (
    <div className={clsx('flex h-full items-end gap-2', className)}>
      {labels.map((label, index) => {
        const value = values[index] ?? 0;
        const heightPercent = Math.min(100, (value / scale) * 100);
        const isWet = value >= 0.1;

        return (
          <div
            key={label}
            className="flex h-full flex-1 flex-col items-center justify-end gap-2"
          >
            <div className="bg-mist/10 relative flex h-full w-full items-end overflow-hidden rounded-full">
              <div
                className={clsx(
                  'w-full rounded-full transition-[height] duration-500',
                  isWet ? 'bg-chip-blue-fg' : 'bg-mist/15'
                )}
                style={{ height: `${Math.max(heightPercent, 4)}%` }}
              />
            </div>
            <span className="text-mist-muted text-xs font-medium">
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export { RainBars };
