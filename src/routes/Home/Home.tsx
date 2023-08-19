import { Time } from '@/components/atoms/Time/Time';

const Home = () => {
  return (
    <div className="flex h-full w-full gap-6">
      <div className="basis-1/2">
        <Time />
      </div>
      <div className="basis-1/2">World</div>
    </div>
  );
};

export { Home };
