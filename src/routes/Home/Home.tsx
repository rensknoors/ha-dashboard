import { Card } from '@/components/atoms/Card/Card';
import { CurrentDate } from '@/components/atoms/CurrentDate/CurrentDate';
import { Time } from '@/components/atoms/Time/Time';
import { WeatherCard } from '@/components/atoms/WeatherCard/WeatherCard';
import { CalendarCard } from '@/components/molecules/CalendarCard/CalendarCard';
import { GraphCard } from '@/components/molecules/GraphCard/GraphCard';
import { LightCard } from '@/components/molecules/LightCard/LightCard';
import { MediaCard } from '@/components/molecules/MediaCard/MediaCard';
import { NurseryCard } from '@/components/molecules/NurseryCard/NurseryCard';
import { useLowBatteryNotification } from '@/hooks/useLowBatteryNotification';
import { useActiveMediaPlayer } from '@/utils/useActiveMediaPlayer';

const Home = () => {
  useLowBatteryNotification();

  const activeMediaPlayer = useActiveMediaPlayer();

  return (
    <div className="flex h-full w-full gap-6">
      {/* Left rail: the one warm hero panel, plus its two dark satellites */}
      <div className="flex w-[30%] min-w-[300px] flex-col gap-6">
        <Card
          variant="panel"
          className="flex flex-2 flex-col items-center justify-center gap-1 text-center"
        >
          <Time />
          <CurrentDate />
        </Card>
        <Card className="flex flex-1 items-center justify-center">
          <WeatherCard />
        </Card>
        <Card className="flex flex-2 flex-col">
          <CalendarCard />
        </Card>
      </div>

      <div className="flex flex-1 flex-col gap-6">
        <div className="grid grid-cols-3 gap-6">
          <GraphCard
            entity="sensor.living_room_temperature"
            label="Woonkamer"
          />
          <GraphCard entity="sensor.bedroom_temperature" label="Slaapkamer" />
          <NurseryCard />
        </div>

        <MediaCard entity={activeMediaPlayer} />

        <div className="grid grid-cols-4 gap-6">
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
