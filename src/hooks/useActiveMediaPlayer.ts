import { HassEntityWithService, useEntity } from '@hakit/core';
import { useEffect, useReducer } from 'react';

import { selectActiveMediaPlayer } from '@/utils/media/selectActiveMediaPlayer';

export type MediaPlayer = HassEntityWithService<'media_player'>;

const options = { returnNullIfNotFound: true } as const;

export const useActiveMediaPlayer = (): MediaPlayer | undefined => {
  // In priority order: the first active player wins.
  const players = [
    useEntity('media_player.tv', options),
    useEntity('media_player.nest_hub', options),
    useEntity('media_player.google_home_mini', options),
    useEntity('media_player.lg_c8', options),
    useEntity('media_player.nest_wifi_kantoor', options),
  ];

  const { player, expiresAt } = selectActiveMediaPlayer(players, Date.now());

  // Entities do not update when a paused player runs out of its grace period,
  // so re-evaluate the selection at that moment.
  const [, reevaluate] = useReducer((count: number) => count + 1, 0);
  useEffect(() => {
    if (expiresAt === undefined) return;

    const timer = setTimeout(reevaluate, Math.max(expiresAt - Date.now(), 0));
    return () => clearTimeout(timer);
  }, [expiresAt]);

  return player;
};
