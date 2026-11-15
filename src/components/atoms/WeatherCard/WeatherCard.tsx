import { Lottie } from 'lottie-react';
import { BiErrorCircle } from 'react-icons/bi';

import { useWeather } from '@/api/weather/useWeather';
import { getWeatherAnimation } from '@/utils/weather/weatherConditions';

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

  const animation = data
    ? getWeatherAnimation(data.current.weather_code, data.current.is_day === 1)
    : null;

  return (
    <div className="flex items-center gap-4 text-3xl">
      {animation && (
        <Lottie className="h-24 w-24" src={animation} autoplay loop />
      )}
      <div className="flex flex-col">
        <div>{`${data?.current.temperature_2m} °C`}</div>
      </div>
    </div>
  );
};

export { WeatherCard };
