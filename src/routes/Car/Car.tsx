import { BatteryHero } from './components/BatteryHero';
import { ChargingCard } from './components/ChargingCard';
import { ClimateCard } from './components/ClimateCard';
import { PresenceCard } from './components/PresenceCard';
import { SecurityCard } from './components/SecurityCard';

const Car = () => {
  return (
    <div className="flex h-full w-full flex-col gap-6">
      <div className="flex flex-1 gap-6">
        <BatteryHero />
        <PresenceCard />
      </div>
      <div className="flex flex-[1.6] gap-6">
        <ChargingCard />
        <ClimateCard />
        <SecurityCard />
      </div>
    </div>
  );
};

export { Car };
