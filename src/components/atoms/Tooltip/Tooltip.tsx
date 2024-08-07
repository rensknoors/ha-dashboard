import { getTariffColor } from '@/utils';
import { formatCurrency } from '@/utils/formatCurrency';

export const Tooltip = ({
  active,
  payload,
  label,
}: {
  active: boolean;
  payload: { value: number }[];
  label: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg bg-neutral-950 px-4 py-3">
        <p className="font-bold">{`${label.padStart(2, '0')}:00`}</p>
        <p className={`font-bold text-[${getTariffColor(payload[0].value)}]`}>
          {formatCurrency(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};
