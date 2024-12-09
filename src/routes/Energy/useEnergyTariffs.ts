import { useEntity } from '@hakit/core';

export const useEnergyTariffs = () => {
  const tariffGroup = useEntity('sensor.zonneplan_current_tariff_group').state;

  // Electricity
  const currentElectricityTariff = useEntity(
    'sensor.zonneplan_current_electricity_tariff'
  ).state;
  const tariffHour1 = useEntity('sensor.zonneplan_forcast_tariff_hour_1').state;
  const tariffHour2 = useEntity('sensor.zonneplan_forcast_tariff_hour_2').state;
  const tariffHour3 = useEntity('sensor.zonneplan_forcast_tariff_hour_3').state;
  const tariffHour4 = useEntity('sensor.zonneplan_forcast_tariff_hour_4').state;
  const tariffHour5 = useEntity('sensor.zonneplan_forcast_tariff_hour_5').state;
  const tariffHour6 = useEntity('sensor.zonneplan_forcast_tariff_hour_6').state;
  const tariffHour7 = useEntity('sensor.zonneplan_forcast_tariff_hour_7').state;
  const tariffHour8 = useEntity('sensor.zonneplan_forcast_tariff_hour_8').state;

  const hourlyTariffs = [
    currentElectricityTariff,
    tariffHour1,
    tariffHour2,
    tariffHour3,
    tariffHour4,
    tariffHour5,
    tariffHour6,
    tariffHour7,
    tariffHour8,
  ];

  const electricityConsumption = useEntity(
    'sensor.zonneplan_electricity_consumption_today'
  ).state;
  const electricityDeliveryCosts = useEntity(
    'sensor.zonneplan_electricity_delivery_costs_today'
  ).state;
  const electricityProductionCosts = useEntity(
    'sensor.zonneplan_electricity_production_costs_today'
  ).state;

  // Gas
  const currentGasTariff = useEntity(
    'sensor.zonneplan_current_gas_tariff'
  ).state;
  const gasConsumption = useEntity(
    'sensor.zonneplan_gas_consumption_today'
  ).state;
  const gasDeliveryCosts = useEntity(
    'sensor.zonneplan_gas_delivery_costs_today'
  ).state;

  return {
    hourlyTariffs,
    tariffGroup,
    currentElectricityTariff,
    electricityConsumption,
    electricityDeliveryCosts,
    electricityProductionCosts,
    currentGasTariff,
    gasConsumption,
    gasDeliveryCosts,
  };
};
