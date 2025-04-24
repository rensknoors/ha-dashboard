import Lottie from 'lottie-react';
import { BiErrorCircle } from 'react-icons/bi';

import { useWeather } from '@/api/weather/useWeather';
import clearDay from '@/assets/weather-lottie-animations/clear-day.json';
import cloudy from '@/assets/weather-lottie-animations/cloudy.json';
import drizzle from '@/assets/weather-lottie-animations/drizzle.json';
import fog from '@/assets/weather-lottie-animations/mist.json';
import partlyCloudyDay from '@/assets/weather-lottie-animations/partly-cloudy-day.json';
import rain from '@/assets/weather-lottie-animations/rain.json';
import snow from '@/assets/weather-lottie-animations/snow.json';
import thunderStormsRain from '@/assets/weather-lottie-animations/thunderstorms-rain.json';

const weatherCodeMap = {
  0: clearDay, // Clear sky
  1: partlyCloudyDay, // Mainly clear
  2: partlyCloudyDay, // Partly cloudy
  3: cloudy, // Overcast
  45: fog, // Fog
  48: fog, // Depositing rime fog
  51: drizzle, // Light drizzle
  53: drizzle, // Moderate drizzle
  55: drizzle, // Dense drizzle
  56: drizzle, // Light freezing drizzle
  57: drizzle, // Dense freezing drizzle
  61: rain, // Slight rain
  63: rain, // Moderate rain
  65: rain, // Heavy rain
  66: rain, // Light freezing rain
  67: rain, // Heavy freezing rain
  71: snow, // Slight snow
  73: snow, // Moderate snow
  75: snow, // Heavy snow
  77: snow, // Snow grains
  80: rain, // Slight rain showers
  81: rain, // Moderate rain showers
  82: rain, // Violent rain showers
  85: snow, // Slight snow showers
  86: snow, // Heavy snow showers
  95: thunderStormsRain, // Thunderstorm
  96: thunderStormsRain, // Thunderstorm with slight hail
  99: thunderStormsRain, // Thunderstorm with heavy hail
} as const;

const WeatherCard = () => {
  const { data, isPending, isError, error, refetch } = useWeather();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError && error) {
    console.error(error);
    return (
      <span className="flex flex-col items-center gap-2">
        <BiErrorCircle className="h-6 w-6 text-red-500" />
        {error.message}
        <button
          className="mt-4 rounded-md border border-blue-400 px-3 py-2 text-blue-400"
          onClick={() => refetch()}
        >
          Retry
        </button>
      </span>
    );
  }

  const weatherCode = data?.current.weather_code;
  const animation =
    weatherCode !== undefined
      ? weatherCodeMap[weatherCode as keyof typeof weatherCodeMap]
      : null;

  return (
    <div className="flex items-center gap-4 text-3xl">
      {animation && (
        <Lottie className="h-24 w-24" animationData={animation} loop={true} />
      )}
      <div className="flex flex-col">
        <div>{`${data?.current.temperature_2m} °C`}</div>
      </div>
    </div>
  );
};

export { WeatherCard };
