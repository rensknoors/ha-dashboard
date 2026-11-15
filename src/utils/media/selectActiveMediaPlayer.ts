/**
 * How long a paused player keeps its spot on the dashboard. Cast devices stay
 * `paused` (with the last track attached) long after a session has ended, so
 * without a limit an old session would be shown forever.
 */
export const PAUSED_GRACE_MS = 10 * 60 * 1000;

type PlayerState = {
  state: string;
  last_changed: string;
};

export type ActiveMediaPlayer<T> = {
  player: T | undefined;
  /** Timestamp at which the selection has to be re-evaluated, if any. */
  expiresAt: number | undefined;
};

const isInUse = ({ state }: PlayerState) =>
  state === 'playing' || state === 'buffering' || state === 'on';

const getPausedExpiry = (player: PlayerState) => {
  const pausedAt = Date.parse(player.last_changed);

  return Number.isNaN(pausedAt) ? undefined : pausedAt + PAUSED_GRACE_MS;
};

/**
 * Picks the media player to show. `players` is in priority order.
 *
 * 1. The first player that is in use (playing, buffering or switched on).
 * 2. Otherwise the first player that was paused less than
 *    `PAUSED_GRACE_MS` ago, so it can still be resumed.
 */
export const selectActiveMediaPlayer = <T extends PlayerState>(
  players: ReadonlyArray<T | null | undefined>,
  now: number
): ActiveMediaPlayer<T> => {
  const available = players.filter((player) => player != null);

  const inUse = available.find(isInUse);
  if (inUse) return { player: inUse, expiresAt: undefined };

  for (const player of available) {
    if (player.state !== 'paused') continue;

    const expiresAt = getPausedExpiry(player);
    if (expiresAt !== undefined && expiresAt > now) {
      return { player, expiresAt };
    }
  }

  return { player: undefined, expiresAt: undefined };
};
