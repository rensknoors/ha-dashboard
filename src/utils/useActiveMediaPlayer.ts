import { EntityName, HassEntityWithService, useEntity } from '@hakit/core';

export const useActiveMediaPlayer = () => {
  // Only the first active media player will be shown, in this order:
  const mediaPlayers: Partial<
    Record<EntityName, HassEntityWithService<'media_player'>>
  > = {
    'media_player.tv': useEntity('media_player.tv'),
    'media_player.nest_hub': useEntity('media_player.nest_hub'),
    'media_player.google_home_mini': useEntity('media_player.google_home_mini'),
    'media_player.lg_c8': useEntity('media_player.lg_c8'),
    'media_player.nest_wifi_kantoor': useEntity(
      'media_player.nest_wifi_kantoor'
    ),
  };

  const findActiveMediaPlayerKey = (): EntityName | undefined => {
    const activeMediaPlayerKey = (
      Object.keys(mediaPlayers) as Array<EntityName>
    ).find((key) => {
      const state = mediaPlayers[key]?.state;
      return state === 'playing' || state === 'paused' || state === 'on';
    });

    return activeMediaPlayerKey;
  };

  return findActiveMediaPlayerKey();
};
