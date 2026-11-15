import { Card } from '@/components/atoms/Card/Card';
import { formatDecimal } from '@/utils/formatDecimal';

import { HourlyPoint } from '../utils/buildHourlyPoints';
import { HourlyChart } from './HourlyChart';

interface HourlyChartCardProps {
  /** The selected day written out, or null for the next 24 hours. */
  dayLabel: string | null;
  points: HourlyPoint[];
  onReset: () => void;
}

const describe = (points: HourlyPoint[]) => {
  if (points.length === 0) {
    return '';
  }

  const temperatures = points.map((point) => Math.round(point.temperature));
  const rain = points.reduce((sum, point) => sum + point.precipitation, 0);
  const range = `${Math.min(...temperatures)}° tot ${Math.max(...temperatures)}°`;

  return rain >= 0.1
    ? `${range} · ${formatDecimal(rain, { decimals: 1 })} mm neerslag`
    : `${range} · droog`;
};

export const HourlyChartCard = ({
  dayLabel,
  points,
  onReset,
}: HourlyChartCardProps) => (
  <Card className="flex min-h-0 flex-col px-5 py-4">
    <div className="mb-1 flex items-start justify-between gap-4">
      <div className="min-w-0">
        <div className="truncate text-lg font-semibold first-letter:uppercase">
          {dayLabel ?? 'Komende 24 uur'}
        </div>
        <div className="text-mist-muted text-xs">{describe(points)}</div>
      </div>
      <div className="text-mist-muted flex shrink-0 items-center gap-4 text-xs">
        <span className="flex items-center gap-1.5">
          <span className="from-rain to-sun h-0.5 w-4 rounded-full bg-linear-to-r" />
          Temperatuur
        </span>
        <span className="flex items-center gap-1.5">
          <span className="bg-rain/60 h-2.5 w-1.5 rounded-t-sm" />
          Kans op neerslag
        </span>
        {dayLabel !== null && (
          <button
            type="button"
            onClick={onReset}
            className="bg-surface-elevated text-mist cursor-pointer rounded-full px-3 py-1 font-semibold transition-colors active:bg-white/15"
          >
            Terug naar nu
          </button>
        )}
      </div>
    </div>
    <div className="min-h-0 flex-1">
      <HourlyChart points={points} showNow={dayLabel === null} />
    </div>
  </Card>
);
