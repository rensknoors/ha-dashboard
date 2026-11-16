import { PiArrowDownBold, PiArrowUpBold } from 'react-icons/pi';

import { Card } from '@/components/atoms/Card/Card';
import { SkyPhase, getSkyTheme } from '@/utils/weather/sky';
import {
  getWeatherCondition,
  getWeatherLabel,
} from '@/utils/weather/weatherConditions';

import { WeatherIcon } from './WeatherIcon';

interface HeroCardProps {
  temperature: number;
  apparentTemperature: number;
  weatherCode: number;
  isDay: boolean;
  phase: SkyPhase;
  high: number;
  low: number;
}

export const HeroCard = ({
  temperature,
  apparentTemperature,
  weatherCode,
  isDay,
  phase,
  high,
  low,
}: HeroCardProps) => {
  const theme = getSkyTheme(getWeatherCondition(weatherCode).group, phase);

  return (
    <Card
      className="relative flex min-h-0 flex-col justify-between border-white/10 p-5 text-white"
      style={{
        background: `linear-gradient(165deg, ${theme.top}, ${theme.bottom})`,
      }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-24 -left-24 size-80 rounded-full"
          style={{
            background: `radial-gradient(circle, ${theme.glow}b3 0%, ${theme.glow}33 38%, ${theme.glow}00 68%)`,
          }}
        />
        <div className="sky-blob top-1/3 -left-16 h-28 w-60 bg-white/10" />
        <div
          className="sky-blob -right-20 bottom-8 h-24 w-72 bg-white/8"
          style={{ animationDuration: '41s', animationDelay: '-12s' }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/5 to-transparent" />
      </div>

      <div className="relative flex items-start justify-between">
        <WeatherIcon
          weatherCode={weatherCode}
          isDay={isDay}
          className="-mt-4 -ml-4 size-28 drop-shadow-[0_8px_16px_rgb(0_0_0/25%)]"
        />
        <span className="text-xs font-semibold tracking-[0.12em] text-white/70 uppercase">
          Nu
        </span>
      </div>

      <div className="relative">
        <div className="text-7xl leading-none font-bold tracking-tighter tabular-nums">
          {Math.round(temperature)}°
        </div>
        <div className="mt-2 text-xl leading-tight font-semibold">
          {getWeatherLabel(weatherCode, isDay)}
        </div>
        <div className="text-sm text-white/70">
          Voelt als {Math.round(apparentTemperature)}°
        </div>
      </div>

      <div className="relative flex items-center justify-between border-t border-white/15 pt-3 text-sm">
        <span className="text-white/70">Vandaag</span>
        <span className="flex items-center gap-3 font-semibold tabular-nums">
          <span className="flex items-center gap-1">
            <PiArrowUpBold size={12} className="text-white/60" />
            {Math.round(high)}°
          </span>
          <span className="flex items-center gap-1">
            <PiArrowDownBold size={12} className="text-white/60" />
            {Math.round(low)}°
          </span>
        </span>
      </div>
    </Card>
  );
};
