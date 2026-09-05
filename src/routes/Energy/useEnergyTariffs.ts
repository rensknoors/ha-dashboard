import { useEntity } from '@hakit/core';

import { parseNumber } from '@/utils/parseNumber';

export const useEnergyTariffs = () => {
  const tariffGroup = useEntity('sensor.zonneplan_current_tariff_group').state;
  const currentElectricityTariff = parseNumber(
    useEntity('sensor.zonneplan_current_quarter_hourly_electricity_tariff')
      .state
  );
  const electricityConsumption = parseNumber(
    useEntity('sensor.zonneplan_electricity_consumption_today').state
  );
  const electricityDeliveryCosts = parseNumber(
    useEntity('sensor.zonneplan_electricity_delivery_costs_today').state
  );
  const electricityProductionCosts = parseNumber(
    useEntity('sensor.zonneplan_electricity_production_costs_today').state
  );
  const electricityReturned = parseNumber(
    useEntity('sensor.zonneplan_electricity_returned_today').state
  );
  const currentUsage = parseNumber(
    useEntity('sensor.zonneplan_current_usage').state
  );
  const solarNow = parseNumber(
    useEntity('sensor.zonneplan_last_measured_value').state
  );
  const solarRemaining = parseNumber(
    useEntity('sensor.energy_production_today_remaining').state
  );
  const currentGasTariff = parseNumber(
    useEntity('sensor.zonneplan_current_gas_tariff').state
  );
  const gasConsumption = parseNumber(
    useEntity('sensor.zonneplan_gas_consumption_today').state
  );
  const gasDeliveryCosts = parseNumber(
    useEntity('sensor.zonneplan_gas_delivery_costs_today').state
  );

  const paidAverage =
    electricityConsumption &&
    electricityConsumption > 0 &&
    electricityDeliveryCosts !== null
      ? electricityDeliveryCosts / electricityConsumption
      : null;

  return {
    tariffGroup,
    currentElectricityTariff,
    electricityConsumption,
    electricityDeliveryCosts,
    electricityProductionCosts,
    electricityReturned,
    currentUsage,
    solarNow,
    solarRemaining,
    currentGasTariff,
    gasConsumption,
    gasDeliveryCosts,
    paidAverage,
  };
};
