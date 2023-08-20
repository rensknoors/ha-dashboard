import { CurrentDate } from '@/components/atoms/CurrentDate/CurrentDate';
import { Time } from '@/components/atoms/Time/Time';
import { Weather } from '@/components/atoms/Weather/Weather';

const Home = () => {
  return (
    <div className="flex h-full w-full gap-6">
      <div className="basis-1/2">
        <div className="centered-row">
          <Time />
        </div>
        <div className="centered-row">
          <CurrentDate />
        </div>
        <div className="centered-row py-8">
          <Weather />
        </div>
      </div>
      <div className="basis-1/2">World</div>
    </div>
  );
};

export { Home };
