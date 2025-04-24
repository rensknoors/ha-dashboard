import { z } from 'zod';

export const weatherSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  timezone: z.string(),
  timezone_abbreviation: z.string(),
  elevation: z.number(),
  current_units: z.object({
    time: z.string(),
    temperature_2m: z.string(),
    weather_code: z.string(),
    precipitation: z.string(),
  }),
  current: z.object({
    time: z.string(),
    temperature_2m: z.number(),
    weather_code: z.number(),
    precipitation: z.number(),
  }),
});

export type WeatherResponse = z.infer<typeof weatherSchema>;
