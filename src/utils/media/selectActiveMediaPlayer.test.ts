import { describe, expect, it } from 'vitest';

import {
  PAUSED_GRACE_MS,
  selectActiveMediaPlayer,
} from './selectActiveMediaPlayer';

const now = Date.parse('2026-11-15T12:00:00Z');

const player = (id: string, state: string, changedMsAgo = 0) => ({
  id,
  state,
  last_changed: new Date(now - changedMsAgo).toISOString(),
});

describe('selectActiveMediaPlayer', () => {
  it('returns nothing when no player is active', () => {
    const result = selectActiveMediaPlayer(
      [player('tv', 'idle'), player('hub', 'off'), null, undefined],
      now
    );

    expect(result).toEqual({ player: undefined, expiresAt: undefined });
  });

  it('picks the first player in use, in priority order', () => {
    const result = selectActiveMediaPlayer(
      [player('tv', 'idle'), player('hub', 'playing'), player('mini', 'on')],
      now
    );

    expect(result.player?.id).toBe('hub');
    expect(result.expiresAt).toBeUndefined();
  });

  it('prefers a playing player over a higher-priority paused one', () => {
    const result = selectActiveMediaPlayer(
      [player('tv', 'paused', 1000), player('hub', 'playing')],
      now
    );

    expect(result.player?.id).toBe('hub');
  });

  it('keeps a recently paused player until the grace period ends', () => {
    const result = selectActiveMediaPlayer(
      [player('tv', 'paused', 60_000)],
      now
    );

    expect(result.player?.id).toBe('tv');
    expect(result.expiresAt).toBe(now - 60_000 + PAUSED_GRACE_MS);
  });

  it('ignores a player that has been paused for too long', () => {
    const result = selectActiveMediaPlayer(
      [
        player('tv', 'paused', PAUSED_GRACE_MS),
        player('hub', 'paused', 3 * 60 * 60 * 1000),
      ],
      now
    );

    expect(result.player).toBeUndefined();
  });

  it('skips a stale paused player in favour of a recently paused one', () => {
    const result = selectActiveMediaPlayer(
      [player('tv', 'paused', PAUSED_GRACE_MS * 2), player('hub', 'paused', 0)],
      now
    );

    expect(result.player?.id).toBe('hub');
  });

  it('ignores a paused player without a valid timestamp', () => {
    const result = selectActiveMediaPlayer(
      [{ state: 'paused', last_changed: 'nope' }],
      now
    );

    expect(result.player).toBeUndefined();
  });
});
