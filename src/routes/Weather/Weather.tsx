import { usePollen } from '@/api/pollen/usePollen';
import { useWeather } from '@/api/weather/useWeather';
import { getSkyPhase } from '@/utils/weather/sky';
import {
  formatWallClockDate,
  formatWallClockWeekday,
  getWallClockNow,
  toWallClock,
} from '@/utils/weather/wallClock';

import { HeroCard } from './components/HeroCard';
import { HighlightsCard } from './components/HighlightsCard';
import { HourlyChartCard } from './components/HourlyChartCard';
import { WeatherError } from './components/WeatherError';
import { WEATHER_GRID, WeatherSkeleton } from './components/WeatherSkeleton';
import { DayForecast, WeekCard } from './components/WeekCard';
import { useSelectedDay } from './useSelectedDay';
import { buildHourlyPoints } from './utils/buildHourlyPoints';
import { summarizePollen } from './utils/pollen';
import { summarizeRain } from './utils/summarizeRain';
import { summarizeSun } from './utils/summarizeSun';

const Weather = () => {
  const { data, isPending, dataUpdatedAt, refetch } = useWeather();
  const pollen = usePollen();
  const [selectedDay, setSelectedDay] = useSelectedDay();

  if (!data) {
    return isPending ? (
      <WeatherSkeleton />
    ) : (
      <WeatherError onRetry={() => refetch()} />
    );
  }

  const { current, daily, hourly } = data;
  const now = getWallClockNow(dataUpdatedAt, data.utc_offset_seconds);

  const days: DayForecast[] = daily.time.map((key, index) => ({
    key,
    label: index === 0 ? 'Vandaag' : formatWallClockWeekday(toWallClock(key)),
    weatherCode: daily.weather_code[index],
    high: daily.temperature_2m_max[index],
    low: daily.temperature_2m_min[index],
    precipitationSum: daily.precipitation_sum[index],
    precipitationProbability: daily.precipitation_probability_max[index],
  }));
  const today = days[0].key;
  // A selection can outlive its day when the forecast rolls over at midnight.
  const activeDay =
    selectedDay !== null && days.some((day) => day.key === selectedDay)
      ? selectedDay
      : null;

  const sunTimes = daily.time.map((_, index) => ({
    sunrise: toWallClock(daily.sunrise[index]),
    sunset: toWallClock(daily.sunset[index]),
  }));

  return (
    <div className={`text-mist ${WEATHER_GRID}`}>
      <HeroCard
        temperature={current.temperature_2m}
        apparentTemperature={current.apparent_temperature}
        weatherCode={current.weather_code}
        isDay={current.is_day === 1}
        phase={getSkyPhase(now, sunTimes[0].sunrise, sunTimes[0].sunset)}
        high={days[0].high}
        low={days[0].low}
      />
      <HighlightsCard
        dateLabel={formatWallClockDate(toWallClock(today))}
        rain={summarizeRain(data.minutely_15)}
        sun={summarizeSun(now, sunTimes[0], sunTimes[1])}
        wind={{
          speed: current.wind_speed_10m,
          gusts: current.wind_gusts_10m,
          direction: current.wind_direction_10m,
        }}
        humidity={current.relative_humidity_2m}
        precipitationSum={days[0].precipitationSum}
        precipitationProbability={days[0].precipitationProbability}
        pollen={
          pollen.data
            ? summarizePollen({
                alder: pollen.data.current.alder_pollen,
                birch: pollen.data.current.birch_pollen,
                grass: pollen.data.current.grass_pollen,
                mugwort: pollen.data.current.mugwort_pollen,
                ragweed: pollen.data.current.ragweed_pollen,
              })
            : null
        }
      />
      <WeekCard
        days={days}
        selectedDay={activeDay ?? today}
        onSelect={(day) => setSelectedDay(day === today ? null : day)}
      />
      <HourlyChartCard
        dayLabel={
          activeDay === null
            ? null
            : formatWallClockDate(toWallClock(activeDay))
        }
        points={buildHourlyPoints(hourly, now, activeDay)}
        onReset={() => setSelectedDay(null)}
      />
    </div>
  );
};

export { Weather };
