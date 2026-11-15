import { z } from 'zod';

export const pollenSchema = z.object({
  current: z.object({
    time: z.string(),
    alder_pollen: z.number().nullable(),
    birch_pollen: z.number().nullable(),
    grass_pollen: z.number().nullable(),
    mugwort_pollen: z.number().nullable(),
    ragweed_pollen: z.number().nullable(),
  }),
});

export type PollenResponse = z.infer<typeof pollenSchema>;
