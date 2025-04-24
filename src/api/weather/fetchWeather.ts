import { weatherSchema } from './schema';

export const fetchWeather = async (latlong?: string) => {
  const loc = latlong ?? import.meta.env.VITE_LOCATION ?? '52.52,13.41';

  const [latitude, longitude] = loc.split(',').map((coord) => coord.trim());

  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.searchParams.append('latitude', latitude);
  url.searchParams.append('longitude', longitude);
  url.searchParams.append(
    'current',
    'temperature_2m,weather_code,precipitation'
  );
  url.searchParams.append('timezone', 'Europe/Amsterdam');

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  const data = await response.json();

  try {
    return weatherSchema.parse(data);
  } catch (error) {
    console.error('Weather API schema validation error:', error);
    throw new Error('Invalid weather data format received');
  }
};
