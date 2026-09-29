import { useCallback, useEffect, useState } from 'react';

import { OPTIMISTIC_TIMEOUT_MS } from './constants';

export const useOptimisticState = (
  actual: boolean,
  setActual: (next: boolean) => unknown
) => {
  const [target, setTarget] = useState<boolean | null>(null);
  const [prevActual, setPrevActual] = useState(actual);

  if (actual !== prevActual) {
    setPrevActual(actual);
    setTarget(null);
  }

  const isPending = target !== null && target !== actual;

  useEffect(() => {
    if (!isPending) {
      return;
    }
    const timer = setTimeout(() => setTarget(null), OPTIMISTIC_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [isPending]);

  const toggle = useCallback(() => {
    const next = !(target ?? actual);
    setTarget(next);
    Promise.resolve(setActual(next)).catch(() => setTarget(null));
  }, [actual, setActual, target]);

  return { value: target ?? actual, isPending, toggle };
};
