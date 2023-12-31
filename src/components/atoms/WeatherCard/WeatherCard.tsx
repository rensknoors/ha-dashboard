import { FabCard, Modal } from '@hakit/components';
import { useQuery } from '@tanstack/react-query';
import Lottie from 'lottie-react';
import { useState } from 'react';

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

const weatherStatesMap = {
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
    }&locatie=${import.meta.env.VITE_LOCATION}`
  );
  const data = await response.json();
  return data;
};

const WeatherCard = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['weather'],
    queryFn: fetchWeatherData,
    refetchInterval: 1000 * 60 * 10, // 10 minutes
  });
  const image: WeatherImage = data?.liveweer[0]?.image;

  const icon = weatherStatesMap[image] ?? null;

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError && error) {
    console.error(error);
    return (
      <span>
        {error.name}: {error.message}
      </span>
    );
  }

  return (
    <div className="flex items-center gap-4 text-3xl">
      {icon && (
        <Lottie className="h-24 w-24" animationData={icon} loop={true} />
      )}
      <div>{`${data?.liveweer[0]?.temp} °C`}</div>
      {data?.liveweer[0]?.alarm === '1' && (
        <>
          <FabCard
            icon="mdi:warning"
            onClick={() => setModalOpen(true)}
            className="!bg-red-500 !bg-opacity-20 !text-red-500"
          />
          <Modal id="test" open={modalOpen} onClose={() => setModalOpen(false)}>
            <div>{data?.liveweer[0]?.alarmtxt}</div>
          </Modal>
        </>
      )}
    </div>
  );
};

export { WeatherCard };
