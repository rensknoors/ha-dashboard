import { Card } from '@/components/atoms/Card/Card';

export const WEATHER_GRID =
  'grid h-full w-full grid-cols-[20rem_minmax(0,1fr)] grid-rows-[minmax(0,1fr)_minmax(0,1fr)] gap-6';

const Block = ({ className }: { className: string }) => (
  <div className={`rounded-tile bg-white/6 ${className}`} />
);

export const WeatherSkeleton = () => (
  <div
    className={`${WEATHER_GRID} animate-pulse motion-reduce:animate-none`}
    role="status"
    aria-label="Weerbericht laden"
  >
    <Card className="flex flex-col justify-between p-5">
      <Block className="size-20 rounded-full" />
      <div className="flex flex-col gap-3">
        <Block className="h-16 w-28" />
        <Block className="h-5 w-36" />
      </div>
      <Block className="h-4 w-full" />
    </Card>
    <Card className="flex flex-col gap-3 px-5 py-4">
      <Block className="h-6 w-28" />
      <div className="grid flex-1 grid-cols-3 gap-3">
        <Block className="h-full" />
        <Block className="h-full" />
        <Block className="h-full" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <Block className="h-12" />
        <Block className="h-12" />
        <Block className="h-12" />
      </div>
    </Card>
    <Card className="flex flex-col gap-2 p-4">
      {Array.from({ length: 7 }, (_, index) => (
        <Block key={index} className="flex-1" />
      ))}
    </Card>
    <Card className="flex flex-col gap-3 px-5 py-4">
      <Block className="h-6 w-40" />
      <Block className="flex-1" />
    </Card>
  </div>
);
