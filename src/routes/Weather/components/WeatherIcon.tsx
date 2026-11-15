import { Lottie } from 'lottie-react';

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { getWeatherAnimation } from '@/utils/weather/weatherConditions';

interface WeatherIconProps {
  weatherCode: number;
  isDay?: boolean;
  /** Static icons show the first frame; used where many sit close together. */
  animated?: boolean;
  className?: string;
}

export const WeatherIcon = ({
  weatherCode,
  isDay = true,
  animated = true,
  className,
}: WeatherIconProps) => {
  const reducedMotion = usePrefersReducedMotion();
  const autoplay = animated && !reducedMotion;

  return (
    <Lottie
      // `autoplay` is only read when the animation loads.
      key={String(autoplay)}
      src={getWeatherAnimation(weatherCode, isDay)}
      className={className}
      autoplay={autoplay}
      loop
      aria-hidden
    />
  );
};
