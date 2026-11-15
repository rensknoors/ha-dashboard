import { getBeaufort } from '../utils/getBeaufort';
import { getWindDirection } from '../utils/getWindDirection';
import { HighlightTile } from './HighlightTile';

const CARDINALS = [
  { label: 'N', x: 50, y: 30 },
  { label: 'O', x: 74, y: 53 },
  { label: 'Z', x: 50, y: 78 },
  { label: 'W', x: 26, y: 53 },
];

const TICKS = Array.from({ length: 16 }, (_, index) => index * 22.5);

interface WindTileProps {
  speed: number;
  gusts: number;
  /** Bearing the wind blows from, in degrees. */
  direction: number;
}

export const WindTile = ({ speed, gusts, direction }: WindTileProps) => {
  const beaufort = getBeaufort(speed);

  return (
    <HighlightTile
      label="Wind"
      headline={
        <>
          {Math.round(speed)}
          <span className="text-mist-muted ml-1 text-xs font-medium">km/u</span>
          <span className="ml-2">{getWindDirection(direction)}</span>
        </>
      }
      detail={`Vlagen ${Math.round(gusts)} · ${beaufort.label.toLowerCase()}`}
    >
      <svg viewBox="0 0 100 100" className="h-full max-h-28" aria-hidden>
        <circle
          cx="50"
          cy="50"
          r="36"
          fill="none"
          stroke="white"
          strokeOpacity="0.12"
          strokeWidth="1.5"
        />
        {TICKS.map((angle) => (
          <line
            key={angle}
            x1="50"
            y1="14"
            x2="50"
            y2={angle % 90 === 0 ? 19 : 17}
            stroke="white"
            strokeOpacity={angle % 90 === 0 ? 0.5 : 0.2}
            strokeWidth="1.5"
            strokeLinecap="round"
            transform={`rotate(${angle} 50 50)`}
          />
        ))}
        {CARDINALS.map(({ label, x, y }) => (
          <text
            key={label}
            x={x}
            y={y}
            textAnchor="middle"
            fontSize="9"
            fontWeight="600"
            className="fill-mist-muted"
          >
            {label}
          </text>
        ))}
        {/* Sits outside the ring where the wind comes from, pointing the way it blows. */}
        <g
          className="transition-transform duration-700 ease-out"
          style={{
            transform: `rotate(${direction}deg)`,
            transformOrigin: '50px 50px',
          }}
        >
          <path d="M50 13 L44 0 L50 3 L56 0 Z" className="fill-rain" />
        </g>
        <text
          x="50"
          y="55"
          textAnchor="middle"
          fontSize="22"
          fontWeight="700"
          className="fill-mist"
        >
          {beaufort.force}
        </text>
        <text
          x="50"
          y="64"
          textAnchor="middle"
          fontSize="7.5"
          fontWeight="600"
          className="fill-mist-muted"
        >
          Bft
        </text>
      </svg>
    </HighlightTile>
  );
};
