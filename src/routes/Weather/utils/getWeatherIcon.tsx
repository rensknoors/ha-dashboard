import { clsx } from 'clsx';
import {
  WiCloud,
  WiDaySunny,
  WiDaySunnyOvercast,
  WiFog,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from 'react-icons/wi';

export const getWeatherIcon = (weatherCode: number, size = 'w-8 h-8') => {
  // Using smaller static weather icons for forecast
  if (weatherCode === 0)
    return (
      <div
        className={clsx(
          size,
          'flex items-center justify-center rounded-full bg-yellow-500 text-xs font-bold text-white'
        )}
      >
        <WiDaySunny className="h-1/2 w-1/2" />
      </div>
    );
  if ([1, 2].includes(weatherCode))
    return (
      <div
        className={clsx(
          size,
          'flex items-center justify-center rounded-full bg-blue-400 text-xs font-bold text-white'
        )}
      >
        <WiDaySunnyOvercast className="h-1/2 w-1/2" />
      </div>
    );
  if (weatherCode === 3)
    return (
      <div
        className={clsx(
          size,
          'flex items-center justify-center rounded-full bg-gray-500 text-xs font-bold text-white'
        )}
      >
        <WiCloud className="h-1/2 w-1/2" />
      </div>
    );
  if ([45, 48].includes(weatherCode))
    return (
      <div
        className={clsx(
          size,
          'flex items-center justify-center rounded-full bg-gray-400 text-xs font-bold text-white'
        )}
      >
        <WiFog className="h-1/2 w-1/2" />
      </div>
    );
  if (
    [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)
  )
    return (
      <div
        className={clsx(
          size,
          'flex items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white'
        )}
      >
        <WiRain className="h-1/2 w-1/2" />
      </div>
    );
  if ([71, 73, 75, 77, 85, 86].includes(weatherCode))
    return (
      <div
        className={clsx(
          size,
          'flex items-center justify-center rounded-full bg-blue-200 text-xs font-bold text-gray-700'
        )}
      >
        <WiSnow className="h-1/2 w-1/2" />
      </div>
    );
  if ([95, 96, 99].includes(weatherCode))
    return (
      <div
        className={clsx(
          size,
          'flex items-center justify-center rounded-full bg-purple-600 text-xs font-bold text-white'
        )}
      >
        <WiThunderstorm className="h-1/2 w-1/2" />
      </div>
    );
  return (
    <div
      className={clsx(
        size,
        'flex items-center justify-center rounded-full bg-gray-400 text-xs font-bold text-white'
      )}
    >
      ?
    </div>
  );
};
