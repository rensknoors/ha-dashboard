import { Card } from '@/components/atoms/Card/Card';
import { formatWeekdayClock } from '@/utils/formatClock';

import { TariffPoint } from '../types';
import { TariffChart } from './TariffChart';

interface TariffChartCardProps {
  points: TariffPoint[];
  nowIndex: number;
  dayBoundaries: number[];
}

export const TariffChartCard = ({
  points,
  nowIndex,
  dayBoundaries,
}: TariffChartCardProps) => {
  const first = points[0];
  const last = points[points.length - 1];
  const rangeLabel =
    first && last
      ? `${formatWeekdayClock(first.startsAt)} – ${formatWeekdayClock(last.startsAt)}`
      : 'Prijs per kwartier';

  return (
    <Card className="flex min-h-0 flex-1 flex-col px-5 py-5">
      <div className="mb-3 flex items-end justify-between gap-4">
        <div>
          <div className="text-lg font-semibold">Dynamisch tarief</div>
          <div className="text-mist-muted text-xs">{rangeLabel}</div>
        </div>
      </div>
      <div className="min-h-0 flex-1">
        <TariffChart
          points={points}
          nowIndex={nowIndex}
          dayBoundaries={dayBoundaries}
        />
      </div>
    </Card>
  );
};
