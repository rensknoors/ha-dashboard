import { clsx } from 'clsx';
import { ReactNode } from 'react';
import { BiLockAlt, BiLockOpenAlt } from 'react-icons/bi';
import { MdBolt } from 'react-icons/md';

import { Card } from '@/components/atoms/Card/Card';
import { formatClock } from '@/utils/formatClock';
import { formatDecimal } from '@/utils/formatDecimal';

import { CarConnection, CarStatus } from '../types';

interface StatusPanelProps {
  status: CarStatus;
  isLocked: boolean;
}

export const StatusPanel = ({ status, isLocked }: StatusPanelProps) => (
  <Card className="bg-surface/70 flex w-70 flex-col gap-5 backdrop-blur-md">
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-semibold tracking-tight">Model 3</h1>
      <ConnectionBadge connection={status.connection} />
    </div>

    <BatteryStatus status={status} />

    <div className="grid grid-cols-3 gap-3 text-sm">
      <Stat
        label="Slot"
        value={
          <span className="flex items-center gap-1">
            {isLocked ? <BiLockAlt size={14} /> : <BiLockOpenAlt size={14} />}
            {isLocked ? 'Dicht' : 'Open'}
          </span>
        }
      />
      <Stat
        label="Binnen"
        value={formatTemperature(status.insideTemperature)}
      />
      <Stat
        label="Buiten"
        value={formatTemperature(status.outsideTemperature)}
      />
    </div>
  </Card>
);

const BatteryStatus = ({ status }: { status: CarStatus }) => {
  const level = status.batteryLevel ?? 0;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <span className="text-5xl leading-none font-bold tracking-tight tabular-nums">
          {status.batteryLevel === null ? '—' : `${Math.round(level)}%`}
        </span>
        <span className="text-mist-muted text-lg font-semibold tabular-nums">
          {status.range === null
            ? '—'
            : `${formatDecimal(status.range, { decimals: 0 })} km`}
        </span>
      </div>

      <div className="bg-surface-elevated h-2 overflow-hidden rounded-full">
        <div
          className={clsx(
            'h-full rounded-full transition-[width] duration-700',
            getBarColor(level, status.isCharging)
          )}
          style={{ width: `${level}%` }}
        />
      </div>

      {status.isCharging ? (
        <div className="text-tariff-low flex items-center gap-1 text-sm font-semibold">
          <MdBolt size={16} />
          {getChargingLabel(status)}
        </div>
      ) : null}
    </div>
  );
};

const Stat = ({ label, value }: { label: string; value: ReactNode }) => (
  <div className="flex flex-col gap-1">
    <span className="text-mist-muted text-[11px] font-semibold tracking-[0.12em] uppercase">
      {label}
    </span>
    <span className="font-semibold tabular-nums">{value}</span>
  </div>
);

const ConnectionBadge = ({ connection }: { connection: CarConnection }) => (
  <span className="text-mist-muted flex items-center gap-1.5 text-xs font-semibold">
    <span className={clsx('size-2 rounded-full', CONNECTION_DOT[connection])} />
    {CONNECTION_LABEL[connection]}
  </span>
);

const getChargingLabel = ({ chargerPower, fullyChargedAt }: CarStatus) =>
  [
    'Laden',
    chargerPower === null
      ? null
      : `${formatDecimal(chargerPower, { decimals: 1 })} kW`,
    fullyChargedAt === null ? null : `vol om ${formatClock(fullyChargedAt)}`,
  ]
    .filter(Boolean)
    .join(' · ');

const getBarColor = (level: number, isCharging: boolean) => {
  if (isCharging) {
    return 'bg-tariff-low animate-pulse';
  }
  return level <= LOW_BATTERY_LEVEL ? 'bg-danger' : 'bg-mist';
};

const formatTemperature = (value: number | null) =>
  value === null ? '—' : `${formatDecimal(value, { decimals: 0 })}°`;

const LOW_BATTERY_LEVEL = 20;

const CONNECTION_LABEL: Record<CarConnection, string> = {
  online: 'Online',
  asleep: 'Slaapt',
  unavailable: 'Offline',
};

const CONNECTION_DOT: Record<CarConnection, string> = {
  online: 'bg-tariff-low',
  asleep: 'bg-mist-muted',
  unavailable: 'bg-danger',
};
