import { BiSolidFlame, BiSolidZap } from 'react-icons/bi';

import { Card } from '@/components/atoms/Card/Card';
import { IconBadge } from '@/components/atoms/IconBadge/IconBadge';
import { ChipTone, StatChip } from '@/components/atoms/StatChip/StatChip';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDecimal } from '@/utils/formatDecimal';

import { EnergyChart } from './components/EnergyChart';
import { getTimeLabels } from './getTimeLabels';
import { useEnergyTariffs } from './useEnergyTariffs';

const tariffGroupHex: Record<string, string> = {
  low: '#4ba66a',
  normal: '#3c5551',
  high: '#dc6731',
};

const tariffGroupTone: Record<string, ChipTone> = {
  low: 'green',
  normal: 'blue',
  high: 'amber',
};

const Energy = () => {
  const {
    hourlyTariffs,
    tariffGroup,
    currentElectricityTariff,
    currentGasTariff,
    electricityConsumption,
    electricityDeliveryCosts,
    electricityProductionCosts,
    gasConsumption,
    gasDeliveryCosts,
  } = useEnergyTariffs();

  const timeLabels = getTimeLabels(hourlyTariffs.length);
  const tariffData = timeLabels.map((label, index) => ({
    name: label,
    tariff: parseFloat(hourlyTariffs[index]),
  }));

  const tariffTone = tariffGroupTone[tariffGroup] ?? 'blue';
  const tariffHex = tariffGroupHex[tariffGroup] ?? tariffGroupHex.normal;

  return (
    <div className="flex h-full w-full place-items-center gap-6">
      <Card className="flex h-full w-full place-items-center">
        <EnergyChart tariffData={tariffData} />
      </Card>

      <div className="flex h-full w-1/4 flex-col gap-6">
        <Card className="flex flex-1 items-center justify-center">
          <IconBadge size={64} style={{ color: tariffHex }}>
            <BiSolidZap size={28} />
          </IconBadge>
        </Card>
        <StatChip
          tone={tariffTone}
          label="Huidig tarief · €/kWh"
          value={formatDecimal(currentElectricityTariff)}
          className="flex-1"
        />
        <StatChip
          tone="pink"
          label="Verbruikt · kWh"
          value={formatDecimal(electricityConsumption)}
          className="flex-1"
        />
        <StatChip
          tone="blue"
          label="Kosten"
          value={formatCurrency(
            parseFloat(electricityDeliveryCosts) -
              parseFloat(electricityProductionCosts)
          )}
          className="flex-1"
        />
      </div>

      <div className="flex h-full w-1/4 flex-col gap-6">
        <Card className="flex flex-1 items-center justify-center">
          <IconBadge size={64} style={{ color: tariffHex }}>
            <BiSolidFlame size={28} />
          </IconBadge>
        </Card>
        <StatChip
          tone={tariffTone}
          label="Huidig tarief · €/m3"
          value={formatDecimal(currentGasTariff)}
          className="flex-1"
        />
        <StatChip
          tone="pink"
          label="Verbruikt · m3"
          value={formatDecimal(gasConsumption)}
          className="flex-1"
        />
        <StatChip
          tone="blue"
          label="Kosten"
          value={formatCurrency(gasDeliveryCosts)}
          className="flex-1"
        />
      </div>
    </div>
  );
};

export { Energy };
