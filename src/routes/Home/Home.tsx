import { Time } from '@/components/atoms/Time/Time';

const Home = () => {
  return (
    <div className="flex h-full w-full gap-6">
      <div className="flex-grow">
        <Time />
      </div>
      <div className="flex-grow">World</div>
    </div>
  );
};

export { Home };
