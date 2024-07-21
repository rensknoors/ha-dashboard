import { useEntity } from '@hakit/core';

const Energy = () => {
  const tariffGroup = useEntity('sensor.zonneplan_current_tariff_group');

  return (
    <div>
      <h1 className="text-3xl font-semibold">Energy</h1>
      <p className="text-xl">Current tariff group: {tariffGroup.state}</p>
    </div>
  );
};

export { Energy };
