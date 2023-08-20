import { useQuery } from '@tanstack/react-query';

import { ReactComponent as CloudRainSingleIcon } from '@/assets/icons/cloud-rain-single.svg';
import { ReactComponent as CloudRainIcon } from '@/assets/icons/cloud-rain.svg';
import { ReactComponent as CloudIcon } from '@/assets/icons/cloud.svg';
import { ReactComponent as CloudsIcon } from '@/assets/icons/clouds.svg';
import { ReactComponent as FogIcon } from '@/assets/icons/fog.svg';
import { ReactComponent as HailIcon } from '@/assets/icons/hail.svg';
import { ReactComponent as LightningIcon } from '@/assets/icons/lightning.svg';
import { ReactComponent as MoonCloudIcon } from '@/assets/icons/moon-cloud.svg';
import { ReactComponent as MoonFogIcon } from '@/assets/icons/moon-fog.svg';
import { ReactComponent as MoonWaxingCrescentIcon } from '@/assets/icons/moon-waxing-crescent.svg';
import { ReactComponent as SnowflakeIcon } from '@/assets/icons/snowflake.svg';
import { ReactComponent as SunCloudRainIcon } from '@/assets/icons/sun-cloud-rain.svg';
import { ReactComponent as SunCloudIcon } from '@/assets/icons/sun-cloud.svg';
import { ReactComponent as SunIcon } from '@/assets/icons/sun.svg';

const LATLONG = '50.9953,5.9016';

export const weatherStatesMap = {
  zonnig: SunIcon,
  bliksem: LightningIcon,
  regen: CloudRainIcon,
  buien: CloudRainSingleIcon,
  hagel: HailIcon,
  mist: FogIcon,
  sneeuw: SnowflakeIcon,
  bewolkt: CloudIcon,
  lichtbewolkt: SunCloudIcon,
  halfbewolkt: SunCloudIcon,
  halfbewolkt_regen: SunCloudRainIcon,
  zwaarbewolkt: CloudsIcon,
  nachtmist: MoonFogIcon,
  helderenacht: MoonWaxingCrescentIcon,
  nachtbewolkt: MoonCloudIcon,
  wolkennacht: MoonCloudIcon,
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

const Weather = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['weather'],
    queryFn: fetchWeatherData,
    cacheTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 10, // 10 minutes
  });
  const image: WeatherImage = data?.liveweer[0]?.image;
  console.log(image);

  const WeatherIcon = weatherStatesMap[image] ?? null;

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
      <div className="flex items-center text-3xl">
        {WeatherIcon && <WeatherIcon fill="white" width={64} height={64} />}
        <div>{`${data.liveweer[0]?.temp} °C`}</div>
      </div>
    </div>
  );
};

export { Weather };
