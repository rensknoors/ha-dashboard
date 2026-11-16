import { Lottie } from 'lottie-react';
import { Link } from 'react-router-dom';

import { useWeather } from '@/api/weather/useWeather';
import { ROUTES } from '@/routes/routes';
import { getSkyPhase, getSkyTheme } from '@/utils/weather/sky';
import { getWallClockNow, toWallClock } from '@/utils/weather/wallClock';
import {
  getWeatherAnimation,
  getWeatherCondition,
} from '@/utils/weather/weatherConditions';

const WeatherCard = () => {
  const { data, isPending, dataUpdatedAt, refetch } = useWeather();

  if (!data) {
    return isPending ? (
      <div className="rounded-tile h-20 w-56 animate-pulse bg-white/6 motion-reduce:animate-none" />
    ) : (
      <button
        type="button"
        onClick={() => refetch()}
        className="text-mist-muted cursor-pointer text-sm"
      >
        Weer niet beschikbaar ·{' '}
        <span className="text-mist font-semibold">Opnieuw proberen</span>
      </button>
    );
  }

  const { current, daily } = data;
  const isDay = current.is_day === 1;
  // The same sky as the hero on the Weather screen, reduced to a faint haze.
  const sky = getSkyTheme(
    getWeatherCondition(current.weather_code).group,
    getSkyPhase(
      getWallClockNow(dataUpdatedAt, data.utc_offset_seconds),
      toWallClock(daily.sunrise[0]),
      toWallClock(daily.sunset[0])
    )
  );

  return (
    <Link
      to={ROUTES.WEATHER}
      aria-label="Weerbericht openen"
      className="card-interactive relative isolate flex items-center gap-4"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-x-28 -inset-y-14 -z-10 rounded-full blur-2xl"
        style={{
          background: `radial-gradient(closest-side, ${sky.bottom}73, ${sky.bottom}00)`,
        }}
      />
      <Lottie
        className="size-20"
        src={getWeatherAnimation(current.weather_code, isDay)}
        autoplay
        loop
        aria-hidden
      />
      <span className="text-4xl leading-tight font-bold tracking-tight">
        {Math.round(current.temperature_2m)}°
      </span>
    </Link>
  );
};

export { WeatherCard };
