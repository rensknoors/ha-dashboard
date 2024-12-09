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

import { Tooltip } from '@/components/atoms';
import { formatCurrency, getTariffColor } from '@/utils';

import { CustomLabel } from './CustomLabel';

type EnergyChartProps = {
  tariffData: { name: string; tariff: number }[];
};

export const EnergyChart = ({ tariffData }: EnergyChartProps) => {
  const lowestTariffs = tariffData.filter(
    (data) =>
      data.tariff.toFixed(2) ===
      Math.min(...tariffData.map((data) => data.tariff)).toFixed(2)
  );

  return (
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
        <Bar dataKey="tariff" barSize={20} radius={10} enableBackground={25}>
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
  );
};
