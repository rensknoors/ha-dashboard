import { useEffect, useState } from 'react';

const IDLE_RESET_MS = 60_000;

/**
 * Holds the day picked in the week list. The selection clears itself after a
 * minute without touches, so a wall tablet never keeps showing another day as
 * if it were the current forecast.
 */
export const useSelectedDay = () => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  useEffect(() => {
    if (selectedDay === null) {
      return;
    }

    const reset = () => setSelectedDay(null);
    let timer = setTimeout(reset, IDLE_RESET_MS);
    const restart = () => {
      clearTimeout(timer);
      timer = setTimeout(reset, IDLE_RESET_MS);
    };

    window.addEventListener('pointerdown', restart);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('pointerdown', restart);
    };
  }, [selectedDay]);

  return [selectedDay, setSelectedDay] as const;
};
