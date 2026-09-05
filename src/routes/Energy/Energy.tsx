import { BiDroplet, BiHome } from 'react-icons/bi';

import { formatCurrency } from '@/utils/formatCurrency';
import { formatDecimal } from '@/utils/formatDecimal';

import { CarChargeCard } from './components/CarChargeCard';
import { MetricCard } from './components/MetricCard';
import { PriceNowCard } from './components/PriceNowCard';
import { TariffChartCard } from './components/TariffChartCard';
import { TodayCard } from './components/TodayCard';
import { useBestChargeWindow } from './useBestChargeWindow';
import { useEnergyTariffs } from './useEnergyTariffs';
import { useTariffForecast } from './useTariffForecast';

const Energy = () => {
  const tariffs = useEnergyTariffs();
  const {
    points,
    nowIndex,
    chartPoints,
    chartNowIndex,
    dayBoundaries,
    today,
    currentPrice,
  } = useTariffForecast();
  const chargeWindow = useBestChargeWindow({ points, nowIndex });

  return (
    <div className="text-mist flex h-full w-full gap-6">
      <aside className="flex w-70 shrink-0 flex-col gap-6">
        <PriceNowCard
          price={currentPrice ?? tariffs.currentElectricityTariff}
          tariffGroup={tariffs.tariffGroup}
          today={today}
          paidAverage={tariffs.paidAverage}
        />
        <TodayCard
          electricityConsumption={tariffs.electricityConsumption}
          gasConsumption={tariffs.gasConsumption}
          solarNow={tariffs.solarNow}
          solarRemaining={tariffs.solarRemaining}
          electricityReturned={tariffs.electricityReturned}
          electricityProductionCosts={tariffs.electricityProductionCosts}
          electricityDeliveryCosts={tariffs.electricityDeliveryCosts}
          gasDeliveryCosts={tariffs.gasDeliveryCosts}
        />
      </aside>

      <main className="flex min-w-0 flex-1 flex-col gap-6">
        <TariffChartCard
          points={chartPoints}
          nowIndex={chartNowIndex}
          dayBoundaries={dayBoundaries}
        />
        <div className="grid grid-cols-3 gap-6">
          <MetricCard
            icon={<BiHome size={14} />}
            label="Live verbruik"
            value={
              tariffs.currentUsage === null
                ? '—'
                : `${formatDecimal(tariffs.currentUsage, { decimals: 0 })} W`
            }
          />
          <MetricCard
            icon={<BiDroplet size={14} />}
            label="Gasprijs"
            value={
              tariffs.currentGasTariff === null
                ? '—'
                : `${formatCurrency(tariffs.currentGasTariff)} /m³`
            }
          />
          <CarChargeCard chargeWindow={chargeWindow} />
        </div>
      </main>
    </div>
  );
};

export { Energy };
