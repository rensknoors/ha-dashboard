import {
  Area,
  AreaChart,
  CartesianGrid,
  Label as ReLabel,
  Tooltip as ReTooltip,
  ReferenceDot,
  ReferenceLine,
  XAxis,
  YAxis,
  createHorizontalChart,
  usePlotArea,
} from 'recharts';

import { Tooltip } from '@/components/atoms';
import { formatCents } from '@/utils/formatCents';
import { formatClock, formatWeekdayClock } from '@/utils/formatClock';

import { TariffDay, TariffPoint } from '../types';

interface ChartPoint extends TariffPoint {
  key: string;
}

interface TariffChartProps {
  points: TariffPoint[];
  nowIndex: number;
  dayBoundaries: number[];
}

const DAY_LABELS: Record<TariffDay, string> = {
  past: 'Gisteren',
  today: 'Vandaag',
  tomorrow: 'Morgen',
};

const PILL_HEIGHT = 30;
const PILL_FONT_SIZE = 15;
const PILL_CHAR_WIDTH = 8.6;
const PILL_PADDING_X = 6;
const PILL_GAP = 16;

interface PriceLabelProps {
  cx?: number;
  cy?: number;
  price: number;
}

const PriceLabel = ({ cx, cy, price }: PriceLabelProps) => {
  const plotArea = usePlotArea();

  if (cx === undefined || cy === undefined || !plotArea) {
    return null;
  }

  const text = formatCents(price);
  const width = text.length * PILL_CHAR_WIDTH + PILL_PADDING_X * 2;
  const centerX = Math.min(
    Math.max(cx, plotArea.x + width / 2),
    plotArea.x + plotArea.width - width / 2
  );
  const bottom = Math.max(cy - PILL_GAP, plotArea.y + PILL_HEIGHT);

  return (
    <g pointerEvents="none">
      <line
        x1={cx}
        y1={bottom}
        x2={cx}
        y2={cy - 2}
        stroke="#6f6f6f"
        strokeWidth={2}
      />
      <rect
        x={centerX - width / 2}
        y={bottom - PILL_HEIGHT}
        width={width}
        height={PILL_HEIGHT}
        rx={PILL_HEIGHT / 2}
        fill="#073c22"
      />
      <text
        x={centerX}
        y={bottom - PILL_HEIGHT / 2}
        textAnchor="middle"
        dominantBaseline="central"
        fill="#ffffff"
        fontSize={PILL_FONT_SIZE}
        fontWeight={700}
      >
        {text}
      </text>
    </g>
  );
};

const EnergyCharts = createHorizontalChart<ChartPoint, string, number>()({
  Area,
  AreaChart,
  XAxis,
  YAxis,
});

export const TariffChart = ({
  points,
  nowIndex,
  dayBoundaries,
}: TariffChartProps) => {
  const data: ChartPoint[] = points.map((point) => ({
    ...point,
    key: point.startsAt.toISOString(),
  }));

  if (data.length === 0) {
    return (
      <div className="text-mist-muted flex h-full items-center justify-center text-sm">
        Geen tariefdata beschikbaar
      </div>
    );
  }

  const nowOffset =
    data.length === 1 ? 1 : nowIndex / Math.max(data.length - 1, 1);
  const nowPoint = data[nowIndex];
  const ticks = data
    .filter((point) =>
      ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'].includes(
        point.label
      )
    )
    .map((point) => point.key);
  const forecast = data.slice(nowIndex);
  const lowest = forecast.reduce(
    (extreme, point) => (point.price < extreme.price ? point : extreme),
    forecast[0]
  );
  const highest = forecast.reduce(
    (extreme, point) => (point.price > extreme.price ? point : extreme),
    forecast[0]
  );
  const extremes =
    lowest && highest && lowest.key !== highest.key ? [lowest, highest] : [];

  return (
    <EnergyCharts.AreaChart
      data={data}
      width="100%"
      height="100%"
      responsive
      margin={{ top: 12, right: 12, left: 0, bottom: 0 }}
    >
      <defs>
        <linearGradient id="tariffStroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset={nowOffset} stopColor="#4ba66a" stopOpacity={0.2} />
          <stop offset={nowOffset} stopColor="#4ba66a" stopOpacity={0.92} />
        </linearGradient>
        <linearGradient id="tariffFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4ba66a" stopOpacity={0.2} />
          <stop offset="1" stopColor="#4ba66a" stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid vertical={false} stroke="#97959d" strokeOpacity={0.12} />
      <EnergyCharts.XAxis
        dataKey="key"
        axisLine={false}
        tickLine={false}
        ticks={ticks}
        tickFormatter={(value) => {
          const point = data.find((entry) => entry.key === value);
          if (!point) {
            return '';
          }
          return point.label === '00:00'
            ? formatWeekdayClock(point.startsAt)
            : formatClock(point.startsAt);
        }}
        tick={{ fill: '#97959d', fontSize: 11 }}
      />
      <EnergyCharts.YAxis hide />
      <ReTooltip
        cursor={{ stroke: '#ffffff', strokeOpacity: 0.4 }}
        content={Tooltip}
      />
      <EnergyCharts.Area
        dataKey="price"
        type="stepAfter"
        stroke="url(#tariffStroke)"
        fill="url(#tariffFill)"
        strokeWidth={2}
        isAnimationActive={false}
      />
      {dayBoundaries.map((index) => {
        const point = data[index];
        if (!point) {
          return null;
        }
        return (
          <ReferenceLine
            key={point.key}
            x={point.key}
            stroke="#97959d"
            strokeOpacity={0.28}
            label={
              <ReLabel
                value={DAY_LABELS[point.day]}
                position="insideTopLeft"
                fill="#97959d"
                fontSize={11}
              />
            }
          />
        );
      })}
      {extremes.map((point) => (
        <ReferenceDot
          key={point.key}
          x={point.key}
          y={point.price}
          r={0}
          shape={(dotProps) => (
            <PriceLabel cx={dotProps.cx} cy={dotProps.cy} price={point.price} />
          )}
        />
      ))}
      {nowPoint ? (
        <>
          <ReferenceLine
            x={nowPoint.key}
            stroke="#ffffff"
            strokeOpacity={0.2}
            strokeDasharray="4 4"
            strokeWidth={1}
          />
          <ReferenceDot
            x={nowPoint.key}
            y={nowPoint.price}
            r={4}
            fill="#0b0b0d"
            stroke="#ffffff"
            strokeWidth={2}
          />
        </>
      ) : null}
    </EnergyCharts.AreaChart>
  );
};
