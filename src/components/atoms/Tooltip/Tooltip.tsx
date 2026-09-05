import { formatCents } from '@/utils/formatCents';
import { formatWeekdayClock } from '@/utils/formatClock';
import { getTariffColor } from '@/utils/getTariffColor';

interface EnergyTooltipProps {
  active?: boolean;
  payload?: ReadonlyArray<{
    value?: unknown;
    payload?: { startsAt?: Date };
  }>;
}

export const Tooltip = ({ active, payload }: EnergyTooltipProps) => {
  const tariff = payload?.[0]?.value;
  const startsAt = payload?.[0]?.payload?.startsAt;

  if (!active || typeof tariff !== 'number' || !(startsAt instanceof Date)) {
    return null;
  }

  return (
    <div className="rounded-tile bg-surface-elevated px-4 py-3 shadow-[0_16px_32px_-16px_rgb(0_0_0/60%)]">
      <p className="text-mist-muted text-sm font-semibold">
        {formatWeekdayClock(startsAt)}
      </p>
      <p className="font-bold" style={{ color: getTariffColor(tariff) }}>
        {formatCents(tariff)}
      </p>
    </div>
  );
};
