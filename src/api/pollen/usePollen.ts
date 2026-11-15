import { useQuery } from '@tanstack/react-query';

import { fetchPollen } from './fetchPollen';

export const usePollen = () =>
  useQuery({
    queryKey: ['pollen'],
    queryFn: fetchPollen,
    refetchInterval: 1000 * 60 * 60, // 1 hour
  });
