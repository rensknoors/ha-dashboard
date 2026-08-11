import { formatCurrency } from '@/utils/formatCurrency';
import { getTariffColor } from '@/utils/getTariffColor';

interface EnergyTooltipProps {
  active?: boolean;
  payload?: ReadonlyArray<{ value?: unknown }>;
  label?: string | number;
}

export const Tooltip = ({ active, payload, label }: EnergyTooltipProps) => {
  const tariff = payload?.[0]?.value;

  if (!active || label === undefined || typeof tariff !== 'number') {
    return null;
  }

  return (
    <div className="rounded-lg bg-neutral-950 px-4 py-3">
      <p className="font-bold">{`${String(label).padStart(2, '0')}:00`}</p>
      <p className={`font-bold text-[${getTariffColor(tariff)}]`}>
        {formatCurrency(tariff)}
      </p>
    </div>
  );
};
