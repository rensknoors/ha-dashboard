import { EntityName, HassEntityWithService, useEntity } from '@hakit/core';

import { CurrentDate } from '@/components/atoms/CurrentDate/CurrentDate';
import { Time } from '@/components/atoms/Time/Time';
import { WeatherCard } from '@/components/atoms/WeatherCard/WeatherCard';
import { CalendarCard } from '@/components/molecules/CalendarCard/CalendarCard';
import { GraphCard } from '@/components/molecules/GraphCard/GraphCard';
import { LightCard } from '@/components/molecules/LightCard/LightCard';
import { MediaCard } from '@/components/molecules/MediaCard/MediaCard';
import { useLowBatteryNotification } from '@/hooks/useLowBatteryNotification';

const Home = () => {
  useLowBatteryNotification();

  // Only the first active media player will be shown, in this order:
  const mediaPlayers: Partial<
    Record<EntityName, HassEntityWithService<'media_player'>>
  > = {
    'media_player.tv': useEntity('media_player.tv'),
    'media_player.nest_hub': useEntity('media_player.nest_hub'),
    'media_player.lg_c8': useEntity('media_player.lg_c8'),
    'media_player.google_home_mini': useEntity('media_player.google_home_mini'),
    'media_player.nest_wifi_kantoor': useEntity(
      'media_player.nest_wifi_kantoor'
    ),
  } as const;

  const findActiveMediaPlayerKey = (): EntityName | undefined => {
    const activeMediaPlayerKey = (
      Object.keys(mediaPlayers) as Array<EntityName>
    ).find((key) => {
      const state = mediaPlayers[key]?.state;
      return state === 'playing' || state === 'paused' || state === 'on';
    });

    return activeMediaPlayerKey;
  };

  const activeMediaPlayerKey = findActiveMediaPlayerKey();

  return (
    <div className="flex h-full w-full gap-6">
      <div className="flex-1">
        <div className="centered-row py-8">
          <Time />
        </div>
        <div className="centered-row">
          <CurrentDate />
        </div>
        <div className="centered-row py-8">
          <WeatherCard />
        </div>
        <div className="centered-row py-8">
          <CalendarCard />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-6">
        <div className="grid grid-cols-2 gap-6">
          <GraphCard
            entity="sensor.living_room_temperature"
            label="Woonkamer"
          />
          <GraphCard entity="sensor.bedroom_temperature" label="Slaapkamer" />
        </div>

        <MediaCard entity={activeMediaPlayerKey ?? 'fallback'} />

        <div className="wrap grid grid-cols-2 gap-6">
          <LightCard entity="light.kitchen_group" />
          <LightCard entity="light.living_room_group" />
          <LightCard entity="light.christmas_tree" />
          <LightCard entity="light.garden_group" />
        </div>
      </div>
    </div>
  );
};

export { Home };
