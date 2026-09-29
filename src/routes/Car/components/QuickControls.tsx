import { clsx } from 'clsx';
import { ReactElement } from 'react';
import {
  PiEye,
  PiFan,
  PiHeadlights,
  PiLockSimple,
  PiLockSimpleOpen,
  PiMegaphoneSimple,
  PiPower,
  PiSpinnerGap,
} from 'react-icons/pi';

import { CarConnection, CarControls } from '../types';

interface QuickControlsProps {
  controls: CarControls;
  connection: CarConnection;
}

export const QuickControls = ({ controls, connection }: QuickControlsProps) => {
  const { lock, climate, defrost, sentry } = controls;

  return (
    <div className="bg-surface/70 rounded-bento flex items-center gap-2 p-2 backdrop-blur-md">
      {connection === 'asleep' ? (
        <>
          <ControlButton
            icon={<PiPower size={ICON_SIZE} />}
            label="Wekken"
            onClick={controls.wake}
          />
          <div className="bg-surface-border mx-1 h-8 w-px" />
        </>
      ) : null}
      <ControlButton
        icon={
          lock.isActive ? (
            <PiLockSimple size={ICON_SIZE} />
          ) : (
            <PiLockSimpleOpen size={ICON_SIZE} />
          )
        }
        label={lock.isActive ? 'Vergrendeld' : 'Ontgrendeld'}
        isActive={lock.isActive}
        isPending={lock.isPending}
        onClick={lock.toggle}
      />
      <ControlButton
        icon={<PiFan size={ICON_SIZE} />}
        label="Klimaat"
        isActive={climate.isActive}
        isPending={climate.isPending}
        onClick={climate.toggle}
      />
      <ControlButton
        icon={<DefrostIcon size={ICON_SIZE} />}
        label="Ontdooien"
        isActive={defrost.isActive}
        isPending={defrost.isPending}
        onClick={defrost.toggle}
      />
      <ControlButton
        icon={<PiEye size={ICON_SIZE} />}
        label="Sentry"
        isActive={sentry.isActive}
        isPending={sentry.isPending}
        onClick={sentry.toggle}
      />
      <ControlButton
        icon={<PiHeadlights size={ICON_SIZE} />}
        label="Lichten"
        onClick={controls.flashLights}
      />
      <ControlButton
        icon={<PiMegaphoneSimple size={ICON_SIZE} />}
        label="Toeter"
        onClick={controls.honkHorn}
      />
    </div>
  );
};

interface ControlButtonProps {
  icon: ReactElement;
  label: string;
  isActive?: boolean;
  isPending?: boolean;
  onClick: () => void;
}

const ControlButton = ({
  icon,
  label,
  isActive = false,
  isPending = false,
  onClick,
}: ControlButtonProps) => (
  <button
    type="button"
    aria-label={label}
    aria-pressed={isActive}
    onClick={onClick}
    disabled={isPending}
    className="group flex w-20 flex-col items-center gap-1.5 py-1 focus-visible:outline-none"
  >
    <span
      className={clsx(
        'flex size-12 items-center justify-center rounded-2xl transition-colors duration-200 group-active:scale-95',
        'group-focus-visible:ring-mist/40 group-focus-visible:ring-2',
        isActive ? 'bg-nav-active text-canvas' : 'bg-surface-elevated text-mist'
      )}
    >
      {isPending ? (
        <PiSpinnerGap size={ICON_SIZE} className="animate-spin" />
      ) : (
        icon
      )}
    </span>
    <span className="text-mist-muted text-[11px] font-semibold">{label}</span>
  </button>
);

const DefrostIcon = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 256 256"
    fill="none"
    stroke="currentColor"
    strokeWidth={16}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M32 200c64-16 128-16 192 0L196 72c-45-12-91-12-136 0Z" />
    <path d="M96 164c-12-12 12-24 0-36s12-24 0-36" />
    <path d="M128 164c-12-12 12-24 0-36s12-24 0-36" />
    <path d="M160 164c-12-12 12-24 0-36s12-24 0-36" />
  </svg>
);

const ICON_SIZE = 22;
