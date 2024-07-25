import { useEntity } from '@hakit/core';
import chroma from 'chroma-js';
import clsx from 'clsx';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Card } from '@/components/atoms/Card/Card';
import { formatCurrency } from '@/utils/formatCurrency';

const getColor = (value: string): string => {
  const colorScale = chroma
    .scale(['#00ff00', '#ffffff', '#ff0000'])
    .domain([0.2, 0.25]);
  const amount = parseFloat(value);
  return colorScale(amount).desaturate(2).hex();
};

const getTimeLabels = () => {
  const now = new Date();
  console.log(now);

  now.setMinutes(0, 0, 0); // Round down to the nearest hour
  const labels = [];
  for (let i = 0; i < 8; i++) {
    const time = new Date(now.getTime() + i * 60 * 60 * 1000);
    const hours = String(time.getHours()).padStart(2, '0');
    labels.push(`${hours}:00`);
  }
  return labels;
};

const Energy = () => {
  const tariff = useEntity('sensor.zonneplan_current_electricity_tariff');
  const tariffHour1 = useEntity('sensor.zonneplan_forcast_tariff_hour_1');
  const tariffHour2 = useEntity('sensor.zonneplan_forcast_tariff_hour_2');
  const tariffHour3 = useEntity('sensor.zonneplan_forcast_tariff_hour_3');
  const tariffHour4 = useEntity('sensor.zonneplan_forcast_tariff_hour_4');
  const tariffHour5 = useEntity('sensor.zonneplan_forcast_tariff_hour_5');
  const tariffHour6 = useEntity('sensor.zonneplan_forcast_tariff_hour_6');
  const tariffHour7 = useEntity('sensor.zonneplan_forcast_tariff_hour_7');
  const tariffHour8 = useEntity('sensor.zonneplan_forcast_tariff_hour_8');

  const timeLabels = getTimeLabels();

  const tariffData = [
    { name: timeLabels[1], tariff: tariffHour1.state },
    { name: timeLabels[2], tariff: tariffHour2.state },
    { name: timeLabels[3], tariff: tariffHour3.state },
    { name: timeLabels[4], tariff: tariffHour4.state },
    { name: timeLabels[5], tariff: tariffHour5.state },
    { name: timeLabels[6], tariff: tariffHour6.state },
    { name: timeLabels[7], tariff: tariffHour7.state },
    { name: timeLabels[8], tariff: tariffHour8.state },
  ];
  const tariffGroup = useEntity('sensor.zonneplan_current_tariff_group');
  const formattedTariff = formatCurrency(tariff.state);

  // Replace recharts with tremor
  return (
    <div className="flex h-full w-full place-items-center gap-6">
      <div className="grid w-full grid-cols-1 grid-rows-1 place-items-center gap-6">
        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            data={tariffData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="2 2" strokeOpacity="0.2" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="tariff"
              barSize={20}
              radius={[10, 10, 0, 0]}
              enableBackground={25}
            >
              {tariffData.map((entry, index) => (
                <Cell key={index} fill={getColor(entry.tariff)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid h-1/2 w-1/3 grid-cols-1 grid-rows-2 gap-6">
        <Card
          className={clsx(
            'flex w-full flex-col justify-center text-center',
            tariffGroup.state === 'low' && 'bg-green-300 text-black',
            tariffGroup.state === 'normal' && 'bg-white text-black',
            tariffGroup.state === 'high' && 'bg-red-500 text-black'
          )}
        >
          <span className="text-md mb-2">Huidige tarief groep</span>
          <span className="text-4xl font-semibold">{tariffGroup.state}</span>
        </Card>
        <Card className="flex w-full flex-col justify-center text-center">
          <span className="text-md mb-2">Huidig tarief</span>
          <span className="text-4xl font-semibold">{formattedTariff}</span>
        </Card>
      </div>
    </div>
  );
};

export { Energy };
