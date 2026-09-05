interface UpcomingRainSummary {
  willRain: boolean;
  /** Minutes from now until the first wet 15-minute slot, if any within the
   *  requested window. */
  minutesUntilRain: number | null;
}

const RAIN_THRESHOLD_MM = 0.1;

/** Reads the minutely_15 nowcast and answers the one question that matters
 * at a glance: is it about to rain, and if so, roughly when. */
export const getUpcomingRainSummary = (
  minutely: { time: string[]; precipitation: number[] } | undefined
): UpcomingRainSummary => {
  if (!minutely || minutely.time.length === 0) {
    return { willRain: false, minutesUntilRain: null };
  }

  const wetIndex = minutely.precipitation.findIndex(
    (amount) => amount >= RAIN_THRESHOLD_MM
  );

  if (wetIndex === -1) {
    return { willRain: false, minutesUntilRain: null };
  }

  return { willRain: true, minutesUntilRain: wetIndex * 15 };
};
