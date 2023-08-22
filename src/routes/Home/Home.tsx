import { HassEntityWithApi, useEntity } from '@hakit/core';

import { CurrentDate } from '@/components/atoms/CurrentDate/CurrentDate';
import { Time } from '@/components/atoms/Time/Time';
import { WeatherCard } from '@/components/atoms/WeatherCard/WeatherCard';
import { LightCard } from '@/components/molecules/LightCard/LightCard';
import { MediaCard } from '@/components/molecules/MediaCard/MediaCard';

const Home = () => {
  // Only the first active media player will be shown, in this order:
  const mediaPlayers: Record<string, HassEntityWithApi<'media_player'>> = {
    tv: useEntity('media_player.tv'),
    nest_hub: useEntity('media_player.nest_hub'),
    lg_c8: useEntity('media_player.lg_c8'),
    google_home_mini: useEntity('media_player.google_home_mini'),
    nest_wifi_kantoor: useEntity('media_player.nest_wifi_kantoor'),
  };

  const findActiveMediaPlayerKey = (): string | null => {
    for (const key in mediaPlayers) {
      if (
        mediaPlayers[key].state === 'playing' ||
        mediaPlayers[key].state === 'paused' ||
        mediaPlayers[key].state === 'on'
      ) {
        return key;
      }
    }
    return null;
  };
  const activeMediaPlayerKey = findActiveMediaPlayerKey();

  return (
    <div className="flex h-full w-full gap-6">
      <div className="basis-1/2">
        <div className="centered-row py-8">
          <Time />
        </div>
        <div className="centered-row">
          <CurrentDate />
        </div>
        <div className="centered-row py-8">
          <WeatherCard />
        </div>
      </div>

      <div className="basis-1/2 flex flex-col gap-6">
        {activeMediaPlayerKey && (
          <MediaCard entity={`media_player.${activeMediaPlayerKey}`} />
        )}

        <div className="flex gap-6">
          <LightCard entity="light.living_room_group" />
          <LightCard entity="light.garden_group" />
        </div>
      </div>
    </div>
  );
};

export { Home };
