import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Tooltip as ReTooltip,
  ReferenceDot,
  ReferenceLine,
  XAxis,
  YAxis,
  usePlotArea,
} from 'recharts';

import { formatDecimal } from '@/utils/formatDecimal';

import { HourlyPoint } from '../utils/buildHourlyPoints';
import { getTemperatureColor } from '../utils/getTemperatureColor';
import { formatWallClockWeekday, toWallClock } from '../utils/wallClock';
import { WeatherIcon } from './WeatherIcon';

const MARKER_INTERVAL_HOURS = 3;
const ICON_SIZE = 26;
/** Share of the plot height a 100% rain chance reaches. */
const RAIN_HEIGHT_SHARE = 0.36;

const isMarked = (point: HourlyPoint) =>
  Number(point.label.slice(0, 2)) % MARKER_INTERVAL_HOURS === 0;

interface HourMarkerProps {
  cx?: number;
  cy?: number;
  point: HourlyPoint;
}

/** An icon in the strip above the plot, and the temperature on the curve. */
const HourMarker = ({ cx, cy, point }: HourMarkerProps) => {
  const plotArea = usePlotArea();

  if (cx === undefined || cy === undefined || !plotArea) {
    return null;
  }

  return (
    <g pointerEvents="none">
      <foreignObject
        x={cx - ICON_SIZE / 2}
        y={plotArea.y - ICON_SIZE - 4}
        width={ICON_SIZE}
        height={ICON_SIZE}
      >
        <WeatherIcon
          weatherCode={point.weatherCode}
          isDay={point.isDay}
          animated={false}
          className="size-full"
        />
      </foreignObject>
      <text
        x={cx}
        y={cy - 10}
        textAnchor="middle"
        fill="#ffffff"
        fillOpacity={0.92}
        fontSize={12}
        fontWeight={700}
      >
        {Math.round(point.temperature)}°
      </text>
    </g>
  );
};

interface HourlyTooltipProps {
  active?: boolean;
  payload?: ReadonlyArray<{ payload?: HourlyPoint }>;
}

const HourlyTooltip = ({ active, payload }: HourlyTooltipProps) => {
  const point = payload?.[0]?.payload;

  if (!active || !point) {
    return null;
  }

  return (
    <div className="rounded-tile bg-surface-elevated px-4 py-3 shadow-[0_16px_32px_-16px_rgb(0_0_0/60%)]">
      <p className="text-mist-muted text-sm font-semibold">
        {formatWallClockWeekday(point.time)} {point.label}
      </p>
      <p className="font-bold">{Math.round(point.temperature)}°</p>
      <p className="text-rain text-sm font-semibold">
        {Math.round(point.precipitationProbability)}% ·{' '}
        {formatDecimal(point.precipitation, { decimals: 1 })} mm
      </p>
    </div>
  );
};

interface HourlyChartProps {
  points: HourlyPoint[];
  /** Marks the first point as the current hour. */
  showNow: boolean;
}

export const HourlyChart = ({ points, showNow }: HourlyChartProps) => {
  if (points.length === 0) {
    return (
      <div className="text-mist-muted flex h-full items-center justify-center text-sm">
        Geen uurverwachting beschikbaar
      </div>
    );
  }

  const temperatures = points.map((point) => point.temperature);
  const low = Math.min(...temperatures);
  const high = Math.max(...temperatures);
  // Keeps a flat day from being stretched into a dramatic curve.
  const span = Math.max(high - low, 4);
  const marked = points.filter(isMarked);
  const midnights = points.filter(
    (point, index) => index > 0 && point.label === '00:00'
  );
  const nowPoint = showNow ? points[0] : undefined;

  return (
    <ComposedChart
      data={points}
      width="100%"
      height="100%"
      responsive
      accessibilityLayer={false}
      margin={{ top: ICON_SIZE + 8, right: 12, left: 12, bottom: 0 }}
    >
      <defs>
        <linearGradient id="hourlyStroke" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={getTemperatureColor(high)} />
          <stop offset="1" stopColor={getTemperatureColor(low)} />
        </linearGradient>
        <linearGradient id="hourlyFill" x1="0" y1="0" x2="0" y2="1">
          <stop
            offset="0"
            stopColor={getTemperatureColor(high)}
            stopOpacity={0.28}
          />
          <stop
            offset="1"
            stopColor={getTemperatureColor(low)}
            stopOpacity={0}
          />
        </linearGradient>
      </defs>
      <CartesianGrid vertical={false} stroke="#97959d" strokeOpacity={0.1} />
      <XAxis
        dataKey="key"
        axisLine={false}
        tickLine={false}
        ticks={marked.map((point) => point.key)}
        interval={0}
        tickFormatter={(key: string) =>
          // Midnight names the day it starts, unless the chart opens on it.
          key.endsWith('00:00') && key !== points[0].key
            ? `${formatWallClockWeekday(toWallClock(key))} 00:00`
            : key.slice(11, 16)
        }
        tick={{ fill: '#97959d', fontSize: 11 }}
      />
      <YAxis
        yAxisId="temperature"
        hide
        domain={[low - span * 1.1, high + span * 0.45]}
      />
      <YAxis yAxisId="rain" hide domain={[0, 100 / RAIN_HEIGHT_SHARE]} />
      <ReTooltip
        cursor={{ stroke: '#ffffff', strokeOpacity: 0.3 }}
        content={HourlyTooltip}
      />
      <Bar
        yAxisId="rain"
        dataKey="precipitationProbability"
        fill="var(--color-rain)"
        fillOpacity={0.5}
        radius={[3, 3, 0, 0]}
        maxBarSize={10}
        isAnimationActive={false}
      />
      <Area
        yAxisId="temperature"
        dataKey="temperature"
        type="monotone"
        stroke="url(#hourlyStroke)"
        fill="url(#hourlyFill)"
        strokeWidth={2.5}
        isAnimationActive={false}
      />
      {midnights.map((point) => (
        <ReferenceLine
          key={point.key}
          yAxisId="temperature"
          x={point.key}
          stroke="#97959d"
          strokeOpacity={0.28}
        />
      ))}
      {marked.map((point) => (
        <ReferenceDot
          key={point.key}
          yAxisId="temperature"
          x={point.key}
          y={point.temperature}
          r={0}
          shape={(dotProps) => (
            <HourMarker cx={dotProps.cx} cy={dotProps.cy} point={point} />
          )}
        />
      ))}
      {nowPoint ? (
        <ReferenceDot
          yAxisId="temperature"
          x={nowPoint.key}
          y={nowPoint.temperature}
          r={4}
          fill="#0b0b0d"
          stroke="#ffffff"
          strokeWidth={2}
        />
      ) : null}
    </ComposedChart>
  );
};
