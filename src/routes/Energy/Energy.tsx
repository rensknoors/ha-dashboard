import { useEntity } from '@hakit/core';
import clsx from 'clsx';

import { Card } from '@/components/atoms/Card/Card';

const formatCurrency = (value: string) => {
  const amount = parseFloat(value);

  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
};

const Energy = () => {
  const tariff = useEntity('sensor.zonneplan_current_electricity_tariff');
  const tariffGroup = useEntity('sensor.zonneplan_current_tariff_group');
  const formattedTariff = formatCurrency(tariff.state);

  return (
    <div className="flex h-full w-full gap-6">
      <div className="grid w-full grid-cols-1 grid-rows-4 gap-6">
        <Card
          className={clsx(
            'flex w-full flex-col justify-center',
            tariffGroup.state === 'low' && 'bg-green-300 text-black',
            tariffGroup.state === 'normal' && 'bg-white text-black',
            tariffGroup.state === 'high' && 'bg-red-500 text-black'
          )}
        >
          <span className="mb-2 text-sm">Huidige tarief groep</span>
          <span className="text-4xl font-semibold">{tariffGroup.state}</span>
        </Card>
        <Card className="flex w-full flex-col justify-center">
          <span className="mb-2 text-sm">Huidig tarief</span>
          <span className="text-4xl font-semibold">{formattedTariff}</span>
        </Card>
      </div>
      <div className="grid w-full grid-cols-1 grid-rows-4 gap-6"></div>
    </div>
  );
};

export { Energy };
