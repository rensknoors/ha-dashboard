import { useQuery } from '@tanstack/react-query';

import { fetchWeather } from './fetchWeather';

export const useWeather = (location?: string) =>
  useQuery({
    queryKey: ['weather', location],
    queryFn: () => fetchWeather(location),
    refetchInterval: 1000 * 60 * 10, // 10 minutes
  });
