import { BiCloudRain, BiDroplet } from 'react-icons/bi';
import { PiFlowerLotus } from 'react-icons/pi';

import { Card } from '@/components/atoms/Card/Card';
import { formatDecimal } from '@/utils/formatDecimal';

import { PollenSummary } from '../utils/pollen';
import { RainSummary } from '../utils/summarizeRain';
import { SunSummary } from '../utils/summarizeSun';
import { RainTile } from './RainTile';
import { StatTile } from './StatTile';
import { SunTile } from './SunTile';
import { WindTile } from './WindTile';

interface HighlightsCardProps {
  dateLabel: string;
  rain: RainSummary;
  sun: SunSummary;
  wind: { speed: number; gusts: number; direction: number };
  humidity: number;
  precipitationSum: number;
  precipitationProbability: number;
  /** Null while loading or when the pollen source is unavailable. */
  pollen: PollenSummary | null;
}

export const HighlightsCard = ({
  dateLabel,
  rain,
  sun,
  wind,
  humidity,
  precipitationSum,
  precipitationProbability,
  pollen,
}: HighlightsCardProps) => (
  <Card className="flex min-h-0 flex-col gap-3 px-5 py-4">
    <div className="flex items-baseline justify-between gap-4">
      <div className="text-lg font-semibold">Vandaag</div>
      <div className="text-mist-muted text-xs first-letter:uppercase">
        {dateLabel}
      </div>
    </div>

    <div className="grid min-h-0 flex-1 grid-cols-3 gap-3">
      <RainTile rain={rain} />
      <WindTile {...wind} />
      <SunTile sun={sun} />
    </div>

    <div className="grid grid-cols-3 gap-3">
      <StatTile
        icon={<BiDroplet size={15} />}
        label="Vochtigheid"
        value={`${Math.round(humidity)}%`}
      />
      <StatTile
        icon={<BiCloudRain size={15} />}
        label="Neerslag"
        value={`${formatDecimal(precipitationSum, { decimals: 1 })} mm`}
        detail={`${Math.round(precipitationProbability)}%`}
      />
      <StatTile
        icon={<PiFlowerLotus size={15} />}
        label="Pollen"
        value={pollen?.label ?? '—'}
        detail={pollen?.drivers.join(', ')}
        quiet={!pollen || pollen.level === 0}
      />
    </div>
  </Card>
);
