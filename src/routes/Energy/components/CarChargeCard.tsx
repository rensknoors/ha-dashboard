import { ReactNode } from 'react';
import { BiCar, BiTimeFive } from 'react-icons/bi';
import { BsLightningChargeFill } from 'react-icons/bs';

import { formatClock, formatWeekdayClock } from '@/utils/formatClock';
import { getDayKey } from '@/utils/getDayKey';

import { ChargePlan } from '../useChargePlan';
import { MetricCard } from './MetricCard';

interface CarChargeCardProps {
  plan: ChargePlan;
}

const formatStart = (date: Date) =>
  getDayKey(date) === getDayKey(new Date())
    ? formatClock(date)
    : formatWeekdayClock(date);

const getContent = ({
  window,
  isActive,
  batteryLevel,
  targetLevel,
}: ChargePlan): { icon: ReactNode; value: string; sublabel: string } => {
  if (window && isActive) {
    return {
      icon: <BsLightningChargeFill size={14} />,
      value: 'Laden',
      sublabel: `tot ${formatClock(window.endsAt)}`,
    };
  }

  if (window) {
    return {
      icon: <BiTimeFive size={14} />,
      value: formatStart(window.startsAt),
      sublabel: `tot ${formatClock(window.endsAt)}`,
    };
  }

  if (
    batteryLevel !== null &&
    targetLevel !== null &&
    batteryLevel >= targetLevel
  ) {
    return {
      icon: <BiCar size={14} />,
      value: 'Accu vol',
      sublabel: 'Geen laadvenster nodig',
    };
  }

  return {
    icon: <BiCar size={14} />,
    value: 'Geen plan',
    sublabel: 'Nog geen laadvenster',
  };
};

const getIndicator = ({ isHome, isPluggedIn }: ChargePlan) => {
  if (!isHome) {
    return 'niet thuis';
  }
  if (!isPluggedIn) {
    return 'kabel los';
  }
  return undefined;
};

export const CarChargeCard = ({ plan }: CarChargeCardProps) => (
  <MetricCard
    className="border-0"
    variant="panel"
    label={plan.batteryLevel === null ? 'Tesla' : `Tesla ${plan.batteryLevel}%`}
    indicator={getIndicator(plan)}
    {...getContent(plan)}
  />
);
