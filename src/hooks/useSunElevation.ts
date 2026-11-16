import { useEntity } from '@hakit/core';

const options = { returnNullIfNotFound: true } as const;

/**
 * Degrees of the sun above the horizon as tracked by Home Assistant, or
 * undefined while its sun integration is unavailable.
 */
export const useSunElevation = (): number | undefined => {
  const elevation: unknown = useEntity('sun.sun', options)?.attributes
    .elevation;

  return typeof elevation === 'number' ? elevation : undefined;
};
