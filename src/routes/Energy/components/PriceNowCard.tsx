import { Card } from '@/components/atoms/Card/Card';
import { formatCents } from '@/utils/formatCents';
import { formatClock } from '@/utils/formatClock';
import { getTariffBandColor } from '@/utils/getTariffColor';

import { TARIFF_GROUP_LABELS } from '../constants';
import { TodayTariffStats } from '../types';
import { StatRow } from './StatRow';

interface PriceNowCardProps {
  price: number | null;
  tariffGroup: string;
  today: TodayTariffStats | null;
  paidAverage: number | null;
}

export const PriceNowCard = ({
  price,
  tariffGroup,
  today,
  paidAverage,
}: PriceNowCardProps) => {
  const groupLabel = TARIFF_GROUP_LABELS[tariffGroup] ?? tariffGroup;
  const groupColor = getTariffBandColor(tariffGroup);
  return (
    <Card className="flex flex-col justify-between gap-4 px-5 py-4">
      <div className="flex flex-col gap-0.5">
        <div className="text-mist-muted text-xs font-semibold tracking-[0.12em] uppercase">
          Stroomprijs nu
        </div>
        <div className="mt-1 text-3xl leading-none font-bold tracking-tight tabular-nums">
          {price === null ? '—' : formatCents(price)}
        </div>
        <div className="text-mist-muted mt-1 flex flex-row items-center gap-2 text-sm">
          <span>per kWh</span> ·
          <span className="font-semibold" style={{ color: groupColor }}>
            {groupLabel}
          </span>
        </div>
      </div>

      <div className="mt-3">
        <StatRow
          label="Laagste vandaag"
          sublabel={today ? formatClock(today.minAt) : undefined}
          value={today ? formatCents(today.min) : '—'}
        />
        <StatRow
          label="Hoogste vandaag"
          sublabel={today ? formatClock(today.maxAt) : undefined}
          value={today ? formatCents(today.max) : '—'}
        />
        <StatRow
          label="Gemiddeld betaald"
          value={paidAverage === null ? '—' : formatCents(paidAverage)}
        />
      </div>
    </Card>
  );
};
