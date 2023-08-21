import { useQuery } from '@tanstack/react-query';
import Lottie from 'lottie-react';

import clearDay from '@/assets/weather-lottie-animations/clear-day.json';
import cloudy from '@/assets/weather-lottie-animations/cloudy.json';
import drizzle from '@/assets/weather-lottie-animations/drizzle.json';
import fogNight from '@/assets/weather-lottie-animations/fog-night.json';
import hail from '@/assets/weather-lottie-animations/hail.json';
import fog from '@/assets/weather-lottie-animations/mist.json';
import moonWaxingCrescent from '@/assets/weather-lottie-animations/moon-waxing-crescent.json';
import overcastNight from '@/assets/weather-lottie-animations/overcast-night.json';
import overcast from '@/assets/weather-lottie-animations/overcast.json';
import partlyCloudyDayRain from '@/assets/weather-lottie-animations/partly-cloudy-day-rain.json';
import partlyCloudyDay from '@/assets/weather-lottie-animations/partly-cloudy-day.json';
import partlyCloudyMoon from '@/assets/weather-lottie-animations/partly-cloudy-night.json';
import rain from '@/assets/weather-lottie-animations/rain.json';
import snow from '@/assets/weather-lottie-animations/snow.json';
import thunderStormsRain from '@/assets/weather-lottie-animations/thunderstorms-rain.json';

const LATLONG = '50.9953,5.9016';

export const weatherStatesMap = {
  zonnig: clearDay,
  bliksem: thunderStormsRain,
  regen: drizzle,
  buien: rain,
  hagel: hail,
  mist: fog,
  sneeuw: snow,
  bewolkt: cloudy,
  lichtbewolkt: partlyCloudyDay,
  halfbewolkt: partlyCloudyDay,
  halfbewolkt_regen: partlyCloudyDayRain,
  zwaarbewolkt: overcast,
  nachtmist: fogNight,
  helderenacht: moonWaxingCrescent,
  nachtbewolkt: partlyCloudyMoon,
  wolkennacht: overcastNight,
} as const;

type WeatherImage = keyof typeof weatherStatesMap;

const fetchWeatherData = async () => {
  const response = await fetch(
    `https://weerlive.nl/api/json-data-10min.php?key=${
      import.meta.env.VITE_WEATHER_API_KEY
    }&locatie=${LATLONG}`
  );
  const data = await response.json();
  return data;
};

const WeatherCard = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['weather'],
    queryFn: fetchWeatherData,
    refetchInterval: 1000 * 60 * 10, // 10 minutes
  });
  const image: WeatherImage = data?.liveweer[0]?.image;

  const icon = weatherStatesMap[image] ?? null;

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    console.error(error);
    return <div>Error: {error?.toString()}</div>;
  }
  return (
    <div className="flex flex-col items-center">
      {data.liveweer[0]?.alarm === '1' && (
        <div className="bg-red-400 py-4 px-5 rounded-3xl text-black flex flex-col mb-4">
          <span className="font-bold">Waarschuwing:</span>
          <div>{data.liveweer[0]?.alarmtekst}</div>
        </div>
      )}
      <div className="flex items-center text-3xl gap-4">
        {icon && (
          <Lottie className="w-24 h-w-24" animationData={icon} loop={true} />
        )}
        <div>{`${data.liveweer[0]?.temp} °C`}</div>
      </div>
    </div>
  );
};

export { WeatherCard };
