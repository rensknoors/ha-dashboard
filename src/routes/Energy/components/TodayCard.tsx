import { BiDroplet, BiSolidSun, BiUpload } from 'react-icons/bi';
import { BsLightningCharge } from 'react-icons/bs';

import { Card } from '@/components/atoms/Card/Card';
import { IconBadge } from '@/components/atoms/IconBadge/IconBadge';
import { StatChip } from '@/components/atoms/StatChip/StatChip';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDecimal } from '@/utils/formatDecimal';

import { StatRow } from './StatRow';

interface TodayCardProps {
  electricityConsumption: number | null;
  gasConsumption: number | null;
  solarNow: number | null;
  solarRemaining: number | null;
  electricityReturned: number | null;
  electricityProductionCosts: number | null;
  electricityDeliveryCosts: number | null;
  gasDeliveryCosts: number | null;
}

export const TodayCard = ({
  electricityConsumption,
  gasConsumption,
  solarNow,
  solarRemaining,
  electricityReturned,
  electricityProductionCosts,
  electricityDeliveryCosts,
  gasDeliveryCosts,
}: TodayCardProps) => {
  const solarKw = solarNow === null ? null : solarNow / 1000;
  const isAfterSunset = (solarRemaining ?? 0) < 0.15 && (solarNow ?? 0) < 50;
  const totalCost = (electricityDeliveryCosts ?? 0) + (gasDeliveryCosts ?? 0);

  return (
    <Card className="flex min-h-0 flex-1 flex-col gap-1 overflow-visible px-5 py-4">
      <div>
        <div className="text-lg font-semibold">Vandaag</div>
        <div className="text-mist-muted text-xs">
          Verbruik en kosten sinds 00:00
        </div>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2">
        <StatChip
          tone="blue"
          label="Stroom"
          className="px-3 py-2"
          icon={<BsLightningCharge size={14} />}
          value={
            electricityConsumption === null
              ? '—'
              : `${formatDecimal(electricityConsumption)} kWh`
          }
        />
        <StatChip
          tone="pink"
          label="Gas"
          className="px-3 py-2"
          icon={<BiDroplet size={14} />}
          value={
            gasConsumption === null
              ? '—'
              : `${formatDecimal(gasConsumption)} m³`
          }
        />
      </div>

      <div className="mt-2">
        <StatRow
          icon={
            <IconBadge size={32}>
              <BiSolidSun size={16} />
            </IconBadge>
          }
          label="Zonnepanelen"
          sublabel={
            isAfterSunset
              ? 'na zonsondergang'
              : solarRemaining === null
                ? undefined
                : `${formatDecimal(solarRemaining)} kWh resterend`
          }
          value={solarKw === null ? '—' : `${formatDecimal(solarKw)} kW`}
        />
        <StatRow
          icon={
            <IconBadge size={32}>
              <BiUpload size={16} />
            </IconBadge>
          }
          label="Teruggeleverd"
          sublabel={
            electricityProductionCosts === null
              ? undefined
              : `opbrengst ${formatCurrency(electricityProductionCosts)}`
          }
          value={
            electricityReturned === null
              ? '—'
              : `${formatDecimal(electricityReturned)} kWh`
          }
        />
        <StatRow
          icon={
            <IconBadge size={32}>
              <BsLightningCharge size={16} />
            </IconBadge>
          }
          label="Kosten vandaag"
          sublabel={[
            electricityDeliveryCosts === null
              ? null
              : `stroom ${formatCurrency(electricityDeliveryCosts)}`,
            gasDeliveryCosts === null
              ? null
              : `gas ${formatCurrency(gasDeliveryCosts)}`,
          ]
            .filter(Boolean)
            .join(' · ')}
          value={formatCurrency(totalCost)}
        />
      </div>
    </Card>
  );
};
