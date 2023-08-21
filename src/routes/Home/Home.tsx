import { CurrentDate } from '@/components/atoms/CurrentDate/CurrentDate';
import { Time } from '@/components/atoms/Time/Time';
import { WeatherCard } from '@/components/atoms/WeatherCard/WeatherCard';
import { MediaCard } from '@/components/molecules/MediaCard/MediaCard';

const Home = () => {
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
      <div className="basis-1/2">
        <MediaCard entity="media_player.nest_wifi_kantoor" />
      </div>
    </div>
  );
};

export { Home };
