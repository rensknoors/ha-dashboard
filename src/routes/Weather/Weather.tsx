import Lottie from 'lottie-react';
import {
  BiErrorCircle,
  BiSolidCloudRain,
  BiSolidThermometer,
  BiWind,
} from 'react-icons/bi';
import { TbDroplets } from 'react-icons/tb';

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

const getWeatherIcon = (weatherCode: number, size = 'w-8 h-8') => {
  // Using smaller static weather icons for forecast
  if (weatherCode === 0)
    return (
      <div
        className={`${size} flex items-center justify-center rounded-full bg-yellow-400 text-xs font-bold text-white`}
      >
        ☀
      </div>
    );
  if ([1, 2].includes(weatherCode))
    return (
      <div
        className={`${size} flex items-center justify-center rounded-full bg-blue-400 text-xs font-bold text-white`}
      >
        ⛅
      </div>
    );
  if (weatherCode === 3)
    return (
      <div
        className={`${size} flex items-center justify-center rounded-full bg-gray-500 text-xs font-bold text-white`}
      >
        ☁
      </div>
    );
  if ([45, 48].includes(weatherCode))
    return (
      <div
        className={`${size} flex items-center justify-center rounded-full bg-gray-400 text-xs font-bold text-white`}
      >
        🌫
      </div>
    );
  if (
    [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)
  )
    return (
      <div
        className={`${size} flex items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white`}
      >
        🌧
      </div>
    );
  if ([71, 73, 75, 77, 85, 86].includes(weatherCode))
    return (
      <div
        className={`${size} flex items-center justify-center rounded-full bg-blue-200 text-xs font-bold text-gray-700`}
      >
        ❄
      </div>
    );
  if ([95, 96, 99].includes(weatherCode))
    return (
      <div
        className={`${size} flex items-center justify-center rounded-full bg-purple-600 text-xs font-bold text-white`}
      >
        ⛈
      </div>
    );
  return (
    <div
      className={`${size} flex items-center justify-center rounded-full bg-gray-400 text-xs font-bold text-white`}
    >
      ?
    </div>
  );
};

const getDayName = (dateString: string): string => {
  const date = new Date(dateString);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[date.getDay()];
};

const Weather = () => {
  const { data, isPending, isError, error, refetch } = useWeather();

  if (isPending) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-xl">Loading weather data...</div>
      </div>
    );
  }

  if (isError && error) {
    console.error(error);
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Card className="flex flex-col items-center gap-4 bg-neutral-900 p-8">
          <BiErrorCircle className="h-12 w-12 text-red-500" />
          <div className="text-center">
            <h2 className="mb-2 text-xl font-semibold">
              Weather data unavailable
            </h2>
            <p className="mb-4 text-gray-400">{error.message}</p>
            <button
              className="rounded-md border border-blue-400 px-4 py-2 text-blue-400 transition-colors hover:bg-blue-400 hover:text-white"
              onClick={() => refetch()}
            >
              Retry
            </button>
          </div>
        </Card>
      </div>
    );
  }

  if (!data) return null;

  const { current, daily } = data;
  const isDay = current.is_day === 1;
  const weatherCode = current.weather_code;
  const animation =
    weatherCode !== undefined
      ? weatherCodeMap[weatherCode as keyof typeof weatherCodeMap]?.[
          isDay ? 'day' : 'night'
        ]
      : null;

  return (
    <div className="flex h-full w-full gap-6">
      {/* Main content area */}
      <div className="flex h-full flex-1 flex-col gap-6">
        {/* Temperature overview - keeping as requested */}
        <Card className="flex items-center justify-between bg-gradient-to-br from-blue-900 to-blue-700 p-8">
          <div className="flex items-center gap-6">
            {animation && (
              <Lottie
                className="h-32 w-32"
                animationData={animation}
                loop={true}
              />
            )}
            <div className="flex flex-col">
              <div className="text-6xl font-light text-white">
                {Math.round(current.temperature_2m)}°
              </div>
              <div className="text-2xl text-blue-200">
                Feels like {Math.round(current.apparent_temperature)}°
              </div>
            </div>
          </div>
          <div className="text-right text-white">
            <div className="text-lg opacity-75">{isDay ? 'Day' : 'Night'}</div>
            <div className="text-sm opacity-60">
              Cloud cover: {current.cloud_cover}%
            </div>
          </div>
        </Card>

        {/* Precipitation - full width */}
        <Card className="flex flex-col justify-center bg-neutral-900 p-6">
          <div className="mb-3 flex items-center gap-3">
            <BiSolidCloudRain className="h-8 w-8 text-blue-500" />
            <span className="text-lg font-medium">Precipitation</span>
          </div>
          <div className="grid grid-cols-3 gap-8">
            <div className="flex justify-between">
              <span className="text-gray-400">Total:</span>
              <span className="text-xl font-semibold">
                {current.precipitation} mm
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Rain:</span>
              <span className="text-xl font-semibold">{current.rain} mm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Snow:</span>
              <span className="text-xl font-semibold">
                {current.snowfall} mm
              </span>
            </div>
          </div>
        </Card>

        {/* Weekly forecast - full width and twice as high */}
        <Card className="flex-1 bg-neutral-900 p-6">
          <div className="grid h-full grid-cols-7 gap-4">
            {daily.time.slice(0, 7).map((date, index) => (
              <div
                key={date}
                className="flex flex-col items-center justify-center text-center"
              >
                <div className="mb-4 text-sm font-bold text-gray-400">
                  {index === 0 ? 'Today' : getDayName(date)}
                </div>
                <div className="mb-4">
                  {getWeatherIcon(daily.weather_code[index], 'w-12 h-12')}
                </div>
                <div className="mb-4 text-base">
                  <div className="text-lg font-semibold">
                    {Math.round(daily.temperature_2m_max[index])}°
                  </div>
                  <div className="text-gray-400">
                    {Math.round(daily.temperature_2m_min[index])}°
                  </div>
                </div>
                <div className="text-sm text-blue-400">
                  {Math.round(daily.precipitation_probability_max[index])}%
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Narrower side panel */}
      <div className="grid h-full w-60 grid-cols-1 grid-rows-3 gap-6">
        <Card className="flex flex-col items-center justify-center bg-neutral-800 p-6">
          <span className="mb-1 text-sm text-gray-400">Temperature</span>
          <BiSolidThermometer className="mb-2 h-12 w-12 text-orange-500" />
          <span className="text-2xl font-bold">
            {Math.round(current.temperature_2m)}°C
          </span>
        </Card>

        <Card className="flex flex-col items-center justify-center bg-neutral-800 p-6">
          <span className="mb-1 text-sm text-gray-400">Humidity</span>
          <TbDroplets className="mb-2 h-12 w-12 text-blue-500" />
          <span className="text-2xl font-bold">
            {current.relative_humidity_2m}%
          </span>
        </Card>

        <Card className="flex flex-col items-center justify-center bg-neutral-800 p-6">
          <span className="mb-1 text-sm text-gray-400">Wind</span>
          <BiWind className="mb-2 h-12 w-12 text-gray-500" />
          <span className="text-2xl font-bold">
            {Math.round(current.wind_speed_10m)} km/h
          </span>
        </Card>
      </div>
    </div>
  );
};

export { Weather };
