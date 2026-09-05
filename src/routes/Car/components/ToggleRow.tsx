import { clsx } from 'clsx';
import { ReactNode } from 'react';

export interface ToggleRowProps {
  icon: ReactNode;
  label: string;
  isOn: boolean;
  onToggle: () => void;
}

/** A tap-to-toggle row shared by every switch-backed Tesla control (charge,
 * sentry, defrost, seat/wheel heaters). */
const ToggleRow = ({ icon, label, isOn, onToggle }: ToggleRowProps) => (
  <button
    onClick={onToggle}
    className="card-interactive flex w-full items-center gap-3 text-left"
  >
    <div
      className={clsx(
        'flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors',
        isOn ? 'bg-chip-amber text-chip-amber-fg' : 'bg-surface-elevated text-mist-muted'
      )}
    >
      {icon}
    </div>
    <span className="flex-1 font-medium">{label}</span>
    <div
      className={clsx(
        'relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200',
        isOn ? 'bg-chip-amber-fg' : 'bg-mist/15'
      )}
    >
      <div
        className={clsx(
          'absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform duration-200',
          isOn ? 'translate-x-[22px]' : 'translate-x-0.5'
        )}
      />
    </div>
  </button>
);

export { ToggleRow };
