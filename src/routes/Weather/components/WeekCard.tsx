import { clsx } from 'clsx';

import { Card } from '@/components/atoms/Card/Card';
import { formatDecimal } from '@/utils/formatDecimal';

import { getTemperatureColor } from '../utils/getTemperatureColor';
import { WeatherIcon } from './WeatherIcon';

export interface DayForecast {
  /** The calendar day, "2026-11-19". */
  key: string;
  label: string;
  weatherCode: number;
  high: number;
  low: number;
  precipitationSum: number;
  precipitationProbability: number;
}

interface WeekCardProps {
  days: DayForecast[];
  selectedDay: string;
  onSelect: (day: string) => void;
}

export const WeekCard = ({ days, selectedDay, onSelect }: WeekCardProps) => {
  const weekLow = Math.min(...days.map((day) => day.low));
  const weekHigh = Math.max(...days.map((day) => day.high));
  const span = Math.max(weekHigh - weekLow, 1);

  return (
    <Card className="flex min-h-0 flex-col p-2">
      {days.map((day) => {
        const isSelected = day.key === selectedDay;
        const isDry = day.precipitationProbability < 10;

        return (
          <button
            key={day.key}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onSelect(day.key)}
            className={clsx(
              'rounded-tile grid min-h-0 flex-1 cursor-pointer grid-cols-[3.75rem_1.75rem_2.75rem_minmax(0,1fr)] items-center gap-2 px-3 text-left transition-colors duration-200',
              'focus-visible:ring-mist/40 focus-visible:ring-2 focus-visible:outline-none',
              isSelected ? 'bg-surface-elevated' : 'active:bg-white/5'
            )}
          >
            <span className="text-sm font-semibold first-letter:uppercase">
              {day.label}
            </span>
            <WeatherIcon weatherCode={day.weatherCode} className="size-7" />
            <span className="flex flex-col text-[11px] leading-tight tabular-nums">
              <span
                className={clsx(
                  'font-semibold',
                  isDry ? 'text-mist-muted' : 'text-rain'
                )}
              >
                {Math.round(day.precipitationProbability)}%
              </span>
              {day.precipitationSum > 0 && (
                <span className="text-mist-muted">
                  {formatDecimal(day.precipitationSum, {
                    decimals: day.precipitationSum < 10 ? 1 : 0,
                  })}{' '}
                  mm
                </span>
              )}
            </span>
            <span className="flex items-center gap-2 text-sm tabular-nums">
              <span className="text-mist-muted w-7 text-right">
                {Math.round(day.low)}°
              </span>
              <span className="relative h-1.5 flex-1 rounded-full bg-white/8">
                <span
                  className="absolute inset-y-0 rounded-full"
                  style={{
                    left: `${((day.low - weekLow) / span) * 100}%`,
                    right: `${((weekHigh - day.high) / span) * 100}%`,
                    background: `linear-gradient(90deg, ${getTemperatureColor(day.low)}, ${getTemperatureColor(day.high)})`,
                  }}
                />
              </span>
              <span className="w-7 text-right font-semibold">
                {Math.round(day.high)}°
              </span>
            </span>
          </button>
        );
      })}
    </Card>
  );
};
