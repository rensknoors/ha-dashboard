import clearDay from '@/assets/weather-lottie-animations/clear-day.json';
import clearNight from '@/assets/weather-lottie-animations/clear-night.json';
import drizzle from '@/assets/weather-lottie-animations/drizzle.json';
import fogDay from '@/assets/weather-lottie-animations/fog-day.json';
import fogNight from '@/assets/weather-lottie-animations/fog-night.json';
import notAvailable from '@/assets/weather-lottie-animations/not-available.json';
import overcast from '@/assets/weather-lottie-animations/overcast.json';
import partlyCloudyDayRain from '@/assets/weather-lottie-animations/partly-cloudy-day-rain.json';
import partlyCloudyDaySnow from '@/assets/weather-lottie-animations/partly-cloudy-day-snow.json';
import partlyCloudyDay from '@/assets/weather-lottie-animations/partly-cloudy-day.json';
import partlyCloudyNightRain from '@/assets/weather-lottie-animations/partly-cloudy-night-rain.json';
import partlyCloudyNightSnow from '@/assets/weather-lottie-animations/partly-cloudy-night-snow.json';
import partlyCloudyNight from '@/assets/weather-lottie-animations/partly-cloudy-night.json';
import rain from '@/assets/weather-lottie-animations/rain.json';
import sleet from '@/assets/weather-lottie-animations/sleet.json';
import snow from '@/assets/weather-lottie-animations/snow.json';
import thunderstormsDayRain from '@/assets/weather-lottie-animations/thunderstorms-day-rain.json';
import thunderstormsNightRain from '@/assets/weather-lottie-animations/thunderstorms-night-rain.json';
import thunderstormsRain from '@/assets/weather-lottie-animations/thunderstorms-rain.json';

export type WeatherGroup =
  'clear' | 'partly' | 'cloudy' | 'fog' | 'rain' | 'snow' | 'thunder';

export interface WeatherCondition {
  label: string;
  /** Used at night when the daytime wording does not fit ("Zonnig"). */
  nightLabel?: string;
  group: WeatherGroup;
  day: object;
  night: object;
}

const both = (animation: object) => ({ day: animation, night: animation });

/** WMO weather interpretation codes, as returned by Open-Meteo. */
const conditions: Record<number, WeatherCondition> = {
  0: {
    label: 'Zonnig',
    nightLabel: 'Helder',
    group: 'clear',
    day: clearDay,
    night: clearNight,
  },
  1: {
    label: 'Licht bewolkt',
    group: 'partly',
    day: partlyCloudyDay,
    night: partlyCloudyNight,
  },
  2: {
    label: 'Half bewolkt',
    group: 'partly',
    day: partlyCloudyDay,
    night: partlyCloudyNight,
  },
  3: { label: 'Bewolkt', group: 'cloudy', ...both(overcast) },
  45: { label: 'Mist', group: 'fog', day: fogDay, night: fogNight },
  48: { label: 'Rijpmist', group: 'fog', day: fogDay, night: fogNight },
  51: { label: 'Lichte motregen', group: 'rain', ...both(drizzle) },
  53: { label: 'Motregen', group: 'rain', ...both(drizzle) },
  55: { label: 'Dichte motregen', group: 'rain', ...both(drizzle) },
  56: { label: 'Lichte ijzel', group: 'rain', ...both(sleet) },
  57: { label: 'IJzel', group: 'rain', ...both(sleet) },
  61: { label: 'Lichte regen', group: 'rain', ...both(rain) },
  63: { label: 'Regen', group: 'rain', ...both(rain) },
  65: { label: 'Zware regen', group: 'rain', ...both(rain) },
  66: { label: 'Lichte ijzel', group: 'rain', ...both(sleet) },
  67: { label: 'IJzel', group: 'rain', ...both(sleet) },
  71: { label: 'Lichte sneeuw', group: 'snow', ...both(snow) },
  73: { label: 'Sneeuw', group: 'snow', ...both(snow) },
  75: { label: 'Zware sneeuw', group: 'snow', ...both(snow) },
  77: { label: 'Motsneeuw', group: 'snow', ...both(snow) },
  80: {
    label: 'Lichte buien',
    group: 'rain',
    day: partlyCloudyDayRain,
    night: partlyCloudyNightRain,
  },
  81: {
    label: 'Buien',
    group: 'rain',
    day: partlyCloudyDayRain,
    night: partlyCloudyNightRain,
  },
  82: { label: 'Zware buien', group: 'rain', ...both(rain) },
  85: {
    label: 'Lichte sneeuwbuien',
    group: 'snow',
    day: partlyCloudyDaySnow,
    night: partlyCloudyNightSnow,
  },
  86: { label: 'Zware sneeuwbuien', group: 'snow', ...both(snow) },
  95: {
    label: 'Onweer',
    group: 'thunder',
    day: thunderstormsDayRain,
    night: thunderstormsNightRain,
  },
  96: {
    label: 'Onweer met hagel',
    group: 'thunder',
    ...both(thunderstormsRain),
  },
  99: {
    label: 'Onweer met hagel',
    group: 'thunder',
    ...both(thunderstormsRain),
  },
};

const unknownCondition: WeatherCondition = {
  label: 'Onbekend',
  group: 'cloudy',
  ...both(notAvailable),
};

export const getWeatherCondition = (weatherCode: number): WeatherCondition =>
  conditions[weatherCode] ?? unknownCondition;

export const getWeatherLabel = (weatherCode: number, isDay: boolean) => {
  const condition = getWeatherCondition(weatherCode);
  return isDay ? condition.label : (condition.nightLabel ?? condition.label);
};

export const getWeatherAnimation = (weatherCode: number, isDay: boolean) => {
  const condition = getWeatherCondition(weatherCode);
  return isDay ? condition.day : condition.night;
};
