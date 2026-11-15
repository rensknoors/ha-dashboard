import { pollenSchema } from './schema';

export const fetchPollen = async () => {
  const [latitude, longitude] = import.meta.env.VITE_LATLONG.split(',').map(
    (coord: string) => coord.trim()
  );

  const url = new URL('https://air-quality-api.open-meteo.com/v1/air-quality');
  url.searchParams.append('latitude', latitude);
  url.searchParams.append('longitude', longitude);
  url.searchParams.append(
    'current',
    'alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,ragweed_pollen'
  );
  url.searchParams.append('timezone', import.meta.env.VITE_TIMEZONE);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch pollen data');
  }

  return pollenSchema.parse(await response.json());
};
