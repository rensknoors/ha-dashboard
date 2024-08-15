import { useEntity } from '@hakit/core';
import clsx from 'clsx';
import {
  Bar,
  BarChart,
  Cell,
  Label as ReLabel,
  Tooltip as ReTooltip,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

import { Label, Tooltip } from '@/components/atoms';
import { Card } from '@/components/atoms/Card/Card';
import { getTariffColor } from '@/utils';
import { formatCurrency } from '@/utils/formatCurrency';

const getTimeLabels = () => {
  const now = new Date();

  now.setMinutes(0, 0, 0); // Round down to the nearest hour
  const labels = [];
  for (let i = 0; i <= 9; i++) {
    const time = new Date(now.getTime() + i * 60 * 60 * 1000);
    const hours = String(time.getHours());
    labels.push(hours);
  }
  return labels;
};

const CustomLabel = ({
  value,
  viewBox,
}: {
  value: number;
  viewBox: { x: number; y: number };
}) => {
  const width = 30;
  // Converts the tariff to cents
  const cents = Math.round(value * 100)
    .toString()
    .replace(/^0+/, ''); // Remove leading zeros

  return (
    <foreignObject
      x={viewBox.x - width / 2}
      y={viewBox.y + 10}
      width={width}
      height={40}
    >
      <Label className="flex justify-center bg-[#4BA66A] bg-none px-1 py-1 font-bold">
        {cents}
      </Label>
    </foreignObject>
  );
};

const Energy = () => {
  const currentTariff = useEntity(
    'sensor.zonneplan_current_electricity_tariff'
  );
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
    { name: timeLabels[0], tariff: parseFloat(currentTariff.state) },
    { name: timeLabels[1], tariff: parseFloat(tariffHour1.state) },
    { name: timeLabels[2], tariff: parseFloat(tariffHour2.state) },
    { name: timeLabels[3], tariff: parseFloat(tariffHour3.state) },
    { name: timeLabels[4], tariff: parseFloat(tariffHour4.state) },
    { name: timeLabels[5], tariff: parseFloat(tariffHour5.state) },
    { name: timeLabels[6], tariff: parseFloat(tariffHour6.state) },
    { name: timeLabels[7], tariff: parseFloat(tariffHour7.state) },
    { name: timeLabels[8], tariff: parseFloat(tariffHour8.state) },
  ];

  const lowestTariffs = tariffData.filter(
    (data) =>
      data.tariff.toFixed(2) ===
      Math.min(...tariffData.map((data) => data.tariff)).toFixed(2)
  );

  const tariffGroup = useEntity('sensor.zonneplan_current_tariff_group');
  const formattedTariff = formatCurrency(parseFloat(currentTariff.state));

  return (
    <div className="flex h-full w-full place-items-center gap-6">
      <div className="grid h-full w-full grid-cols-1 grid-rows-1 place-items-center gap-6">
        <Card className="flex h-full w-full place-items-center bg-neutral-900">
          <ResponsiveContainer width="100%" height={500}>
            <BarChart
              data={tariffData}
              margin={{
                right: 40,
                left: 20,
              }}
            >
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis
                padding={{ bottom: 10, top: 10 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={formatCurrency}
              />
              <ReTooltip
                cursor={{ fill: '#262626', radius: 10 }}
                contentStyle={{
                  background: '#404040',
                  border: 'none',
                  borderRadius: 10,
                }}
                labelStyle={{ color: '#fff' }}
                content={Tooltip}
              />
              <Bar
                dataKey="tariff"
                barSize={20}
                radius={10}
                enableBackground={25}
              >
                {tariffData.map((entry, index) => (
                  <Cell key={index} fill={getTariffColor(entry.tariff)} />
                ))}
              </Bar>
              {lowestTariffs.map(({ name, tariff }) => (
                <ReferenceLine
                  key={name}
                  x={name}
                  stroke={getTariffColor(tariff)}
                  strokeOpacity={0.5}
                  strokeDasharray="10 10"
                  strokeDashoffset={10}
                  label={
                    <ReLabel
                      position="insideTop"
                      value={tariff}
                      formatter={formatCurrency}
                      content={CustomLabel}
                    />
                  }
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid h-full w-1/2 grid-cols-1 grid-rows-2 gap-6">
        <Card
          className={clsx(
            'flex w-full flex-col justify-center bg-neutral-900 text-center',
            tariffGroup.state === 'low' && 'text-[#4BA66A]',
            tariffGroup.state === 'normal' && 'text-[#3C5551]',
            tariffGroup.state === 'high' && 'text-[#DC6731]'
          )}
        >
          <span className="text-md mb-2">Huidige tarief groep</span>
          <span className="text-4xl font-semibold">{tariffGroup.state}</span>
        </Card>
        <Card className="flex w-full flex-col justify-center bg-neutral-900 text-center">
          <span className="text-md mb-2">Huidig tarief</span>
          <span className="text-4xl font-semibold">{formattedTariff}</span>
        </Card>
      </div>
    </div>
  );
};

export { Energy };
