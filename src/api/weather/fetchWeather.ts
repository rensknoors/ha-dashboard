import { weatherSchema } from './schema';

export const fetchWeather = async (latlong?: string) => {
  const loc = latlong ?? import.meta.env.VITE_LATLONG;

  const [latitude, longitude] = loc.split(',').map((coord) => coord.trim());

  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.searchParams.append('latitude', latitude);
  url.searchParams.append('longitude', longitude);
  url.searchParams.append(
    'current',
    'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m,wind_gusts_10m'
  );
  url.searchParams.append(
    'hourly',
    'temperature_2m,weather_code,precipitation_probability,precipitation'
  );
  url.searchParams.append(
    'daily',
    'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max'
  );
  url.searchParams.append('timezone', import.meta.env.VITE_TIMEZONE);
  url.searchParams.append('forecast_days', '7');

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
