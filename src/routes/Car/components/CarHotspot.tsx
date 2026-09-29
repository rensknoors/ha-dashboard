import { Html } from '@react-three/drei';
import { clsx } from 'clsx';
import { BiLoaderAlt } from 'react-icons/bi';

import { CarHotspot as CarHotspotState, HotspotPart } from '../types';

interface CarHotspotProps extends CarHotspotState {
  part: HotspotPart;
  position: [number, number, number];
}

export const CarHotspot = ({
  part,
  position,
  isOpen,
  isPending,
  canToggle,
  toggle,
}: CarHotspotProps) => (
  <Html position={position} center zIndexRange={[20, 10]}>
    <button
      type="button"
      onClick={toggle}
      disabled={!canToggle || isPending}
      className={clsx(
        'flex -translate-y-6 flex-col items-center gap-0.5 rounded-2xl px-3 py-1.5 whitespace-nowrap backdrop-blur-md transition-colors duration-200',
        'focus-visible:ring-mist/40 focus-visible:ring-2 focus-visible:outline-none',
        isOpen ? 'bg-nav-active text-ink' : 'bg-surface/70 text-mist',
        canToggle && !isPending ? 'active:scale-95' : 'cursor-default'
      )}
    >
      <span className="text-[10px] font-semibold tracking-[0.12em] uppercase opacity-70">
        {LABELS[part]}
      </span>
      <span className="flex items-center gap-1 text-sm font-semibold">
        {isPending ? <BiLoaderAlt className="animate-spin" size={14} /> : null}
        {getActionLabel(isOpen, canToggle)}
      </span>
    </button>
  </Html>
);

const getActionLabel = (isOpen: boolean, canToggle: boolean) => {
  if (!canToggle) {
    return isOpen ? 'Open' : 'Dicht';
  }
  return isOpen ? 'Sluit' : 'Open';
};

const LABELS: Record<HotspotPart, string> = {
  frunk: 'Frunk',
  trunk: 'Kofferbak',
  chargePort: 'Laadpoort',
};
