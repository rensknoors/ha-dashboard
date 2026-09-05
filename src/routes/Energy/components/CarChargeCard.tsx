import { BiCar, BiTimeFive } from 'react-icons/bi';

import { Card } from '@/components/atoms/Card/Card';
import { IconBadge } from '@/components/atoms/IconBadge/IconBadge';
import { formatClock } from '@/utils/formatClock';
import { formatCurrency } from '@/utils/formatCurrency';

import { ChargeWindow } from '../useBestChargeWindow';

interface CarChargeCardProps {
  window: ChargeWindow;
}

const FALLBACK: Record<
  Exclude<ChargeWindow['status'], 'ready'>,
  { title: string; value: string; sub: string }
> = {
  full: {
    title: 'Tesla laden',
    value: 'Accu vol',
    sub: 'Geen laadvenster nodig',
  },
  away: {
    title: 'Tesla laden',
    value: 'Niet thuis',
    sub: 'Auto niet thuis',
  },
  unplugged: {
    title: 'Tesla laden',
    value: 'Niet aangesloten',
    sub: 'Kabel niet aangesloten',
  },
  unavailable: {
    title: 'Tesla laden',
    value: 'Onbekend',
    sub: 'Geen laadvenster beschikbaar',
  },
};

export const CarChargeCard = ({ window }: CarChargeCardProps) => {
  if (window.status !== 'ready' || window.startsAt === null) {
    const fallback =
      FALLBACK[window.status === 'ready' ? 'unavailable' : window.status];
    return (
      <Card variant="panel" className="flex items-center gap-4 px-5 py-4">
        <IconBadge size={40} className="bg-ink/8 text-ink">
          <BiCar size={18} />
        </IconBadge>
        <div className="min-w-0">
          <div className="text-ink-muted text-[11px] font-semibold tracking-[0.12em] uppercase">
            {fallback.title}
          </div>
          <div className="text-2xl leading-tight font-bold tracking-tight">
            {fallback.value}
          </div>
          <div className="text-ink-muted text-xs">{fallback.sub}</div>
        </div>
      </Card>
    );
  }

  const solarPercent = Math.round(window.solarShare * 100);

  return (
    <Card variant="panel" className="flex items-center gap-4 px-5 py-4">
      <IconBadge size={40} className="bg-ink/8 text-ink">
        <BiTimeFive size={18} />
      </IconBadge>
      <div className="min-w-0">
        <div className="text-ink-muted text-[11px] font-semibold tracking-[0.12em] uppercase">
          Tesla ingepland
        </div>
        <div className="text-2xl leading-tight font-bold tracking-tight tabular-nums">
          {formatClock(window.startsAt)}
        </div>
        <div className="text-ink-muted text-xs">
          bespaart {formatCurrency(window.savingsVsNow)}
          {solarPercent > 0 ? ` · ${solarPercent}% zon` : ''}
        </div>
      </div>
    </Card>
  );
};
