import { clsx } from 'clsx';
import { ReactElement } from 'react';
import { BiLoaderAlt, BiLockAlt, BiLockOpenAlt } from 'react-icons/bi';
import { PiFan, PiHeadlights, PiPower, PiSpeakerHigh } from 'react-icons/pi';
import { TbRadar2, TbWindow } from 'react-icons/tb';

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
            icon={<PiPower size={20} />}
            label="Wake"
            onClick={controls.wake}
          />
          <div className="bg-surface-border mx-1 h-8 w-px" />
        </>
      ) : null}
      <ControlButton
        icon={
          lock.isActive ? <BiLockAlt size={20} /> : <BiLockOpenAlt size={20} />
        }
        label={lock.isActive ? 'Vergrendeld' : 'Ontgrendeld'}
        isActive={lock.isActive}
        isPending={lock.isPending}
        onClick={lock.toggle}
      />
      <ControlButton
        icon={<PiFan size={20} />}
        label="Klimaat"
        isActive={climate.isActive}
        isPending={climate.isPending}
        onClick={climate.toggle}
      />
      <ControlButton
        icon={<TbWindow size={20} />}
        label="Ontdooien"
        isActive={defrost.isActive}
        isPending={defrost.isPending}
        onClick={defrost.toggle}
      />
      <ControlButton
        icon={<TbRadar2 size={20} />}
        label="Sentry"
        isActive={sentry.isActive}
        isPending={sentry.isPending}
        onClick={sentry.toggle}
      />
      <ControlButton
        icon={<PiHeadlights size={20} />}
        label="Lichten"
        onClick={controls.flashLights}
      />
      <ControlButton
        icon={<PiSpeakerHigh size={20} />}
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
      {isPending ? <BiLoaderAlt size={20} className="animate-spin" /> : icon}
    </span>
    <span className="text-mist-muted text-[11px] font-semibold">{label}</span>
  </button>
);
