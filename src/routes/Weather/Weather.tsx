import { clsx } from 'clsx';
import Lottie from 'lottie-react';
import { BiErrorCircle, BiWind } from 'react-icons/bi';
import { WiHumidity, WiRain } from 'react-icons/wi';

import { useWeather } from '@/api/weather/useWeather';
import clearDay from '@/assets/weather-lottie-animations/clear-day.json';
import clearNight from '@/assets/weather-lottie-animations/clear-night.json';
import cloudy from '@/assets/weather-lottie-animations/cloudy.json';
import drizzle from '@/assets/weather-lottie-animations/drizzle.json';
import fog from '@/assets/weather-lottie-animations/fog.json';
import partlyCloudyDay from '@/assets/weather-lottie-animations/partly-cloudy-day.json';
import partlyCloudyNight from '@/assets/weather-lottie-animations/partly-cloudy-night.json';
import rain from '@/assets/weather-lottie-animations/rain.json';
import snow from '@/assets/weather-lottie-animations/snow.json';
import thunderStormsRain from '@/assets/weather-lottie-animations/thunderstorms-rain.json';
import { Card } from '@/components/atoms/Card/Card';
import { IconBadge } from '@/components/atoms/IconBadge/IconBadge';
import { getDayName } from '@/utils/getDayName';

import { RainBars } from './components/RainBars';
import { getUpcomingRainSummary } from './utils/getUpcomingRainSummary';
import { getWeatherGradient } from './utils/getWeatherGradient';
import { getWeatherIcon } from './utils/getWeatherIcon';
import { getWindDirection } from './utils/getWindDirection';
import { getWindDirectionIcon } from './utils/getWindDirectionIcon';

const weatherCodeMap = {
  0: { day: clearDay, night: clearNight }, // Clear sky
  1: { day: partlyCloudyDay, night: partlyCloudyNight }, // Mainly clear
  2: { day: partlyCloudyDay, night: partlyCloudyNight }, // Partly cloudy
  3: { day: cloudy, night: cloudy }, // Overcast
  45: { day: fog, night: fog }, // Fog
  48: { day: fog, night: fog }, // Depositing rime fog
  51: { day: drizzle, night: drizzle }, // Light drizzle
  53: { day: drizzle, night: drizzle }, // Moderate drizzle
  55: { day: drizzle, night: drizzle }, // Dense drizzle
  56: { day: drizzle, night: drizzle }, // Light freezing drizzle
  57: { day: drizzle, night: drizzle }, // Dense freezing drizzle
  61: { day: rain, night: rain }, // Slight rain
  63: { day: rain, night: rain }, // Moderate rain
  65: { day: rain, night: rain }, // Heavy rain
  66: { day: rain, night: rain }, // Light freezing rain
  67: { day: rain, night: rain }, // Heavy freezing rain
  71: { day: snow, night: snow }, // Slight snow
  73: { day: snow, night: snow }, // Moderate snow
  75: { day: snow, night: snow }, // Heavy snow
  77: { day: snow, night: snow }, // Snow grains
  80: { day: rain, night: rain }, // Slight rain showers
  81: { day: rain, night: rain }, // Moderate rain showers
  82: { day: rain, night: rain }, // Violent rain showers
  85: { day: snow, night: snow }, // Slight snow showers
  86: { day: snow, night: snow }, // Heavy snow showers
  95: { day: thunderStormsRain, night: thunderStormsRain }, // Thunderstorm
  96: { day: thunderStormsRain, night: thunderStormsRain }, // Thunderstorm with slight hail
  99: { day: thunderStormsRain, night: thunderStormsRain }, // Thunderstorm with heavy hail
} as const;

const FloatingStat = ({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value: string;
}) => (
  <div className="bg-canvas/40 flex items-center gap-2 rounded-full px-3 py-2 backdrop-blur-md">
    {icon}
    <span className="text-sm font-semibold text-white">{value}</span>
  </div>
);

const Weather = () => {
  const { data, isPending, isError, error, refetch } = useWeather();

  if (isPending) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-mist-muted text-xl">Weer laden...</div>
      </div>
    );
  }

  if (isError && error) {
    console.error(error);
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Card className="flex flex-col items-center gap-4 p-8">
          <IconBadge size={64}>
            <BiErrorCircle className="text-danger h-8 w-8" />
          </IconBadge>
          <div className="text-center">
            <h2 className="mb-2 text-xl font-semibold">
              Weergegevens niet beschikbaar
            </h2>
            <p className="text-mist-muted mb-4">{error.message}</p>
            <button
              className="bg-chip-blue text-chip-blue-fg rounded-full px-5 py-2.5 font-semibold transition-opacity hover:opacity-80"
              onClick={() => refetch()}
            >
              Opnieuw proberen
            </button>
          </div>
        </Card>
      </div>
    );
  }

  if (!data) return null;

  const { current, daily, hourly, minutely_15: minutely } = data;
  const isDay = current.is_day === 1;
  const weatherCode = current.weather_code;
  const animation =
    weatherCode !== undefined
      ? weatherCodeMap[weatherCode as keyof typeof weatherCodeMap]?.[
          isDay ? 'day' : 'night'
        ]
      : null;

  const gradientClasses =
    weatherCode !== undefined
      ? getWeatherGradient(weatherCode, isDay)
      : 'from-blue-900 to-blue-400';

  const rainSummary = getUpcomingRainSummary(minutely);
  const rainHeadline = !rainSummary.willRain
    ? 'Geen regen verwacht de komende 2 uur'
    : rainSummary.minutesUntilRain === 0
      ? 'Het regent nu'
      : `Regen verwacht over ${rainSummary.minutesUntilRain} minuten`;

  const nowcastLabels = minutely.time.map((time) =>
    new Date(time).toLocaleTimeString('nl-NL', {
      hour: '2-digit',
      minute: '2-digit',
    })
  );

  const currentHourPrefix = current.time.slice(0, 13);
  const hourlyStart = Math.max(
    0,
    hourly.time.findIndex((time) => time.slice(0, 13) === currentHourPrefix)
  );
  const hourlyWindow = 10;
  const hourlyLabels = hourly.time
    .slice(hourlyStart, hourlyStart + hourlyWindow)
    .map((time) => time.slice(11, 13));
  const hourlyPrecipitation = hourly.precipitation.slice(
    hourlyStart,
    hourlyStart + hourlyWindow
  );

  return (
    <div className="flex h-full w-full flex-col gap-6">
      {/* Temperature overview */}
      <Card
        className={clsx(
          'relative flex flex-[1.3] items-center justify-between bg-gradient-to-br p-8',
          gradientClasses
        )}
      >
        <div className="flex items-center gap-6">
          {animation && (
            <Lottie
              className="h-40 w-40"
              animationData={animation}
              loop={true}
            />
          )}
          <div className="flex flex-col">
            <div className="text-6xl font-light text-white">
              {Math.round(current.temperature_2m)}°
            </div>
            <div className="text-xl text-white/70">
              Voelt als {Math.round(current.apparent_temperature)}°
            </div>
          </div>
        </div>

        <div className="absolute top-6 right-6 flex gap-2">
          <FloatingStat
            icon={<WiHumidity className="h-5 w-5 text-white" />}
            value={`${current.relative_humidity_2m}%`}
          />
          <FloatingStat
            icon={<BiWind className="h-4 w-4 text-white" />}
            value={`${Math.round(current.wind_speed_10m)} km/h`}
          />
          <FloatingStat
            icon={getWindDirectionIcon(
              current.wind_direction_10m,
              'h-4 w-4 text-white'
            )}
            value={getWindDirection(current.wind_direction_10m)}
          />
        </div>
      </Card>

      <div className="flex flex-1 gap-6">
        {/* Rain: near-term nowcast + today's hourly amounts */}
        <Card className="flex flex-[1.4] flex-col gap-6">
          <div className="flex items-center gap-3">
            <IconBadge size={40}>
              <WiRain className="text-chip-blue-fg h-6 w-6" />
            </IconBadge>
            <span className="text-lg font-semibold">{rainHeadline}</span>
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <span className="text-mist-muted text-xs font-semibold tracking-wide uppercase">
              Komende 2 uur
            </span>
            <RainBars
              labels={nowcastLabels}
              values={minutely.precipitation}
              maxValue={1}
              className="flex-1"
            />
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <span className="text-mist-muted text-xs font-semibold tracking-wide uppercase">
              Vandaag, per uur
            </span>
            <RainBars
              labels={hourlyLabels}
              values={hourlyPrecipitation}
              maxValue={2}
              className="flex-1"
            />
          </div>
        </Card>

        {/* 7-day forecast */}
        <Card className="flex flex-1 flex-col gap-3 overflow-hidden">
          {daily.time.slice(0, 7).map((date, index) => (
            <div key={date} className="flex flex-1 items-center gap-3">
              <span className="text-mist-muted w-8 text-sm font-semibold">
                {index === 0 ? 'Nu' : getDayName(date)}
              </span>
              {getWeatherIcon(daily.weather_code[index], 'w-6 h-6')}
              <span className="text-chip-blue-fg ml-auto text-xs font-semibold">
                {Math.round(daily.precipitation_probability_max[index])}%
              </span>
              <span className="w-10 text-right text-sm font-semibold">
                {Math.round(daily.temperature_2m_max[index])}°
              </span>
              <span className="text-mist-muted w-10 text-right text-sm">
                {Math.round(daily.temperature_2m_min[index])}°
              </span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

export { Weather };
