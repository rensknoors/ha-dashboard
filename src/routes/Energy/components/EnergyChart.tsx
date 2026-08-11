import {
  Bar,
  BarChart,
  Label as ReLabel,
  Tooltip as ReTooltip,
  Rectangle,
  ReferenceLine,
  XAxis,
  YAxis,
  createHorizontalChart,
} from 'recharts';

import { Tooltip } from '@/components/atoms';
import { formatCurrency } from '@/utils/formatCurrency';
import { getTariffColor } from '@/utils/getTariffColor';

import { CustomLabel } from './CustomLabel';

interface TariffDatum {
  name: string;
  tariff: number;
}

interface EnergyChartProps {
  tariffData: TariffDatum[];
}

interface TariffBarShapeProps {
  payload?: unknown;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  radius?: number | [number, number, number, number];
  fill?: string;
}

const EnergyCharts = createHorizontalChart<TariffDatum, string, number>()({
  Bar,
  BarChart,
  XAxis,
  YAxis,
});

export const EnergyChart = ({ tariffData }: EnergyChartProps) => {
  const lowestTariffs = tariffData.filter(
    (data) =>
      data.tariff.toFixed(2) ===
      Math.min(...tariffData.map((data) => data.tariff)).toFixed(2)
  );

  return (
    <EnergyCharts.BarChart
      data={tariffData}
      width="100%"
      height={500}
      responsive
      margin={{
        right: 40,
        left: 20,
      }}
    >
      <EnergyCharts.XAxis dataKey="name" axisLine={false} tickLine={false} />
      <EnergyCharts.YAxis
        width="auto"
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
      <EnergyCharts.Bar
        dataKey="tariff"
        barSize={20}
        radius={10}
        shape={TariffBarShape}
      />
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
              formatter={(label) =>
                typeof label === 'number' || typeof label === 'string'
                  ? formatCurrency(label)
                  : label
              }
              content={CustomLabel}
            />
          }
        />
      ))}
    </EnergyCharts.BarChart>
  );
};

export const TariffBarShape = ({
  payload,
  x,
  y,
  width,
  height,
  radius,
  fill,
}: TariffBarShapeProps) => (
  <Rectangle
    x={x}
    y={y}
    width={width}
    height={height}
    radius={radius}
    fill={isTariffDatum(payload) ? getTariffColor(payload.tariff) : fill}
  />
);

const isTariffDatum = (value: unknown): value is TariffDatum =>
  typeof value === 'object' &&
  value !== null &&
  'tariff' in value &&
  typeof value.tariff === 'number';
