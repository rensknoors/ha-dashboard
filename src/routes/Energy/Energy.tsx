import clsx from 'clsx';
import { BiSolidFlame, BiSolidZap } from 'react-icons/bi';

import { Card } from '@/components/atoms/Card/Card';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDecimal } from '@/utils/formatDecimal';

import { EnergyChart } from './components/EnergyChart';
import { getTimeLabels } from './getTimeLabels';
import { useEnergyTariffs } from './useEnergyTariffs';

const Energy = () => {
  const formatter = new Intl.NumberFormat('nl-NL');
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

  return (
    <div className="flex h-full w-full place-items-center gap-6">
      <Card className="flex h-full w-full place-items-center bg-neutral-900">
        <EnergyChart tariffData={tariffData} />
      </Card>

      <div className="grid h-full w-1/4 grid-cols-1 grid-rows-4 gap-6">
        <Card
          className={clsx(
            'flex items-center justify-center bg-neutral-800',
            tariffGroup === 'low' && 'text-[#4BA66A]',
            tariffGroup === 'normal' && 'text-[#3C5551]',
            tariffGroup === 'high' && 'text-[#DC6731]'
          )}
        >
          <BiSolidZap size={48} />
        </Card>
        <Card className="flex w-full flex-col justify-center gap-1 bg-neutral-900 text-center">
          <span className="text-md mb-2">Huidig tarief</span>
          <span className="text-4xl font-semibold">
            {formatDecimal(currentElectricityTariff)}
          </span>
          <span className="text-md text-sm opacity-40">€/kWh</span>
        </Card>
        <Card className="flex w-full flex-col justify-center gap-1 bg-neutral-900 text-center">
          <span className="text-md mb-2">Verbruikt</span>
          <span className="text-4xl font-semibold">
            {formatter.format(parseFloat(electricityConsumption))}
          </span>
          <span className="text-md text-sm opacity-40">kWh</span>
        </Card>
        <Card className="flex w-full flex-col justify-center gap-1 bg-neutral-900 text-center">
          <span className="text-md mb-2">Kosten</span>
          <span className="text-4xl font-semibold">
            {formatCurrency(
              parseFloat(electricityDeliveryCosts) -
                parseFloat(electricityProductionCosts)
            )}
          </span>
        </Card>
      </div>

      <div className="grid h-full w-1/4 grid-cols-1 grid-rows-4 gap-6">
        <Card
          className={clsx(
            'flex items-center justify-center bg-neutral-800',
            tariffGroup === 'low' && 'text-[#4BA66A]',
            tariffGroup === 'normal' && 'text-[#3C5551]',
            tariffGroup === 'high' && 'text-[#DC6731]'
          )}
        >
          <BiSolidFlame size={48} />
        </Card>
        <Card className="flex w-full flex-col items-center justify-center gap-1 bg-neutral-900 text-center">
          <span className="text-md mb-2">Huidig tarief</span>
          <span className="text-4xl font-semibold">
            {formatDecimal(currentGasTariff)}
          </span>
          <span className="text-md text-sm opacity-40">€/m3</span>
        </Card>
        <Card className="flex w-full flex-col justify-center bg-neutral-900 text-center">
          <span className="text-md mb-2">Verbruikt</span>
          <span className="text-4xl font-semibold">
            {formatter.format(parseFloat(gasConsumption))}
          </span>
          <span className="text-md text-sm opacity-40">m3</span>
        </Card>
        <Card className="flex w-full flex-col justify-center bg-neutral-900 text-center">
          <span className="text-md mb-2">Kosten</span>
          <span className="text-4xl font-semibold">
            {formatCurrency(parseFloat(gasDeliveryCosts))}
          </span>
        </Card>
      </div>
    </div>
  );
};

export { Energy };
