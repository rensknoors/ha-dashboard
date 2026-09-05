import { ReactNode } from 'react';
import { BiCar, BiTimeFive } from 'react-icons/bi';

import { formatClock } from '@/utils/formatClock';
import { formatCurrency } from '@/utils/formatCurrency';

import { ChargeWindow } from '../useBestChargeWindow';
import { MetricCard } from './MetricCard';

interface CarChargeCardProps {
  chargeWindow: ChargeWindow;
}

const FALLBACK: Record<
  Exclude<ChargeWindow['status'], 'ready'>,
  { label: string; value: string; sublabel: string }
> = {
  full: {
    label: 'Tesla laden',
    value: 'Accu vol',
    sublabel: 'Geen laadvenster nodig',
  },
  away: {
    label: 'Tesla laden',
    value: 'Niet thuis',
    sublabel: 'Auto niet thuis',
  },
  unplugged: {
    label: 'Tesla laden',
    value: 'Niet aangesloten',
    sublabel: 'Kabel niet aangesloten',
  },
  unavailable: {
    label: 'Tesla laden',
    value: 'Onbekend',
    sublabel: 'Geen laadvenster beschikbaar',
  },
};

const getContent = (
  chargeWindow: ChargeWindow
): { icon: ReactNode; label: string; value: string; sublabel: string } => {
  if (chargeWindow.status !== 'ready' || chargeWindow.startsAt === null) {
    return {
      icon: <BiCar size={14} />,
      ...FALLBACK[
        chargeWindow.status === 'ready' ? 'unavailable' : chargeWindow.status
      ],
    };
  }

  const solarPercent = Math.round(chargeWindow.solarShare * 100);

  return {
    icon: <BiTimeFive size={14} />,
    label: 'Tesla ingepland',
    value: formatClock(chargeWindow.startsAt),
    sublabel: `bespaart ${formatCurrency(chargeWindow.savingsVsNow)}${
      solarPercent > 0 ? ` · ${solarPercent}% zon` : ''
    }`,
  };
};

export const CarChargeCard = ({ chargeWindow }: CarChargeCardProps) => (
  <MetricCard variant="panel" {...getContent(chargeWindow)} />
);
