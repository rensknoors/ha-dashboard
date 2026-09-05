import { clsx } from 'clsx';
import {
  Bar,
  BarChart,
  Label as ReLabel,
  Rectangle,
  ReferenceLine,
  XAxis,
  YAxis,
  createHorizontalChart,
} from 'recharts';
import { type PointerEvent as ReactPointerEvent, useRef, useState } from 'react';

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

interface ScrubState {
  index: number;
  /** px from the container's left edge, for the vertical scrub-line */
  lineX: number;
  /** px from the container's left edge, clamped so the floating readout
   *  never clips past the chart's edges */
  labelX: number;
}

const EnergyCharts = createHorizontalChart<TariffDatum, string, number>()({
  Bar,
  BarChart,
  XAxis,
  YAxis,
});

const CHART_HEIGHT = 500;
const CHART_MARGIN = { left: 20, right: 40 };
// Rough half-width of the floating tariff readout, used only to keep it from
// clipping past the chart's left/right edges near the first/last bar.
const LABEL_HALF_WIDTH = 70;

export const EnergyChart = ({ tariffData }: EnergyChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrub, setScrub] = useState<ScrubState | null>(null);
  const [isScrubbing, setIsScrubbing] = useState(false);

  const lowestTariffs = tariffData.filter(
    (data) =>
      data.tariff.toFixed(2) ===
      Math.min(...tariffData.map((data) => data.tariff)).toFixed(2)
  );

  // The tooltip on a recharts chart is hover-only, which is dead on a touch
  // kiosk. This replaces it with a direct-manipulation scrub: drag (or hover,
  // for a mouse) across the bars and a line + magnified readout follow the
  // finger in real time, Apple Health/Stocks-style.
  //
  // Hit-testing reads the actual rendered bar positions from the DOM rather
  // than reimplementing recharts' internal layout math — the Y-axis has
  // `width="auto"` (sized to fit the € labels), so the real plot area's left
  // edge isn't a fixed offset we could precompute.
  const updateScrubFromPointer = (clientX: number) => {
    const container = containerRef.current;
    if (!container || tariffData.length === 0) return;

    const barEls = container.querySelectorAll<SVGGElement>(
      '.recharts-bar-rectangle'
    );
    if (barEls.length === 0) return;

    const containerRect = container.getBoundingClientRect();
    let closestIndex = 0;
    let closestDistance = Infinity;
    let closestCenterClientX = 0;

    barEls.forEach((barEl, index) => {
      const barRect = barEl.getBoundingClientRect();
      const centerClientX = barRect.left + barRect.width / 2;
      const distance = Math.abs(clientX - centerClientX);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
        closestCenterClientX = centerClientX;
      }
    });

    const lineX = closestCenterClientX - containerRect.left;
    const labelX = Math.min(
      Math.max(lineX, LABEL_HALF_WIDTH),
      containerRect.width - LABEL_HALF_WIDTH
    );

    setScrub({ index: closestIndex, lineX, labelX });
    setIsScrubbing(true);
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) =>
    updateScrubFromPointer(event.clientX);
  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) =>
    updateScrubFromPointer(event.clientX);
  // Stop tracking, but keep the last scrub value so the readout fades out in
  // place instead of jumping away, then disappears once the fade completes.
  const stopScrubbing = () => setIsScrubbing(false);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full touch-none select-none"
      style={{ height: CHART_HEIGHT }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopScrubbing}
      onPointerCancel={stopScrubbing}
      onPointerLeave={stopScrubbing}
      // A mouse-drag across the SVG's axis-label <text> nodes would otherwise
      // start a native browser drag-select; this is a scrub surface, not
      // selectable text.
      onDragStart={(event) => event.preventDefault()}
    >
      <EnergyCharts.BarChart
        data={tariffData}
        width="100%"
        height={CHART_HEIGHT}
        responsive
        margin={CHART_MARGIN}
      >
        <EnergyCharts.XAxis dataKey="name" axisLine={false} tickLine={false} />
        <EnergyCharts.YAxis
          width="auto"
          padding={{ bottom: 10, top: 10 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={formatCurrency}
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

      {scrub && (
        <div
          className={clsx(
            'pointer-events-none absolute inset-0 transition-opacity duration-150 ease-out',
            isScrubbing ? 'opacity-100' : 'opacity-0'
          )}
        >
          <div
            className="bg-mist/20 absolute top-0 w-px"
            style={{ left: scrub.lineX, height: CHART_HEIGHT }}
          />
          <div
            className="absolute top-0 -translate-x-1/2"
            style={{ left: scrub.labelX }}
          >
            <Tooltip
              active
              payload={[{ value: tariffData[scrub.index].tariff }]}
              label={tariffData[scrub.index].name}
            />
          </div>
        </div>
      )}
    </div>
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
