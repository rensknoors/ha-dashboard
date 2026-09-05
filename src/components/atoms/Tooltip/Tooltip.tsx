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
    <div className="rounded-tile bg-surface-elevated px-4 py-3 shadow-[0_16px_32px_-16px_rgb(0_0_0_/_60%)]">
      <p className="font-bold">{`${String(label).padStart(2, '0')}:00`}</p>
      <p className="font-bold" style={{ color: getTariffColor(tariff) }}>
        {formatCurrency(tariff)}
      </p>
    </div>
  );
};
