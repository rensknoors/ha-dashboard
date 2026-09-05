import { LockEntity, useEntity, useHass } from '@hakit/core';
import { clsx } from 'clsx';
import {
  BiLockAlt,
  BiLockOpenAlt,
  BiSolidCar,
  BiVolumeFull,
} from 'react-icons/bi';
import { PiFlashlightFill } from 'react-icons/pi';

import { Card } from '@/components/atoms/Card/Card';
import { IconBadge } from '@/components/atoms/IconBadge/IconBadge';
import { useSwitchEntity } from '@/routes/Car/useSwitchEntity';

import { ToggleRow } from './ToggleRow';

const coverStateLabel: Record<string, string> = {
  open: 'Open',
  closed: 'Dicht',
};

const SecurityCard = () => {
  const lock = useEntity('lock.tesla_model_3_lock') as LockEntity;
  const callService = useHass((state) => state.helpers.callService);
  const isLocked = lock.state === 'locked';

  const frunk = useEntity('cover.tesla_model_3_frunk');
  const trunk = useEntity('cover.tesla_model_3_trunk');
  const windows = useEntity('cover.tesla_model_3_windows');
  const sentry = useSwitchEntity('switch.tesla_model_3_sentry_mode');

  const toggleLock = () => {
    callService({
      domain: 'lock',
      service: isLocked ? 'unlock' : 'lock',
      target: { entity_id: 'lock.tesla_model_3_lock' },
    });
  };

  const toggleCover = (entityId: 'cover.tesla_model_3_frunk' | 'cover.tesla_model_3_trunk', isOpen: boolean) => {
    callService({
      domain: 'cover',
      service: isOpen ? 'close_cover' : 'open_cover',
      target: { entity_id: entityId },
    });
  };

  const press = (entityId: string) => {
    callService({
      domain: 'button',
      service: 'press',
      target: { entity_id: entityId },
    });
  };

  return (
    <Card className="flex flex-1 flex-col gap-5">
      <button
        onClick={toggleLock}
        className="card-interactive flex w-full items-center gap-3 text-left"
      >
        <IconBadge
          size={40}
          className={isLocked ? 'bg-chip-green text-chip-green-fg' : undefined}
        >
          {isLocked ? (
            <BiLockAlt className="h-5 w-5" />
          ) : (
            <BiLockOpenAlt className="h-5 w-5" />
          )}
        </IconBadge>
        <span className="flex-1 font-semibold">
          {isLocked ? 'Vergrendeld' : 'Ontgrendeld'}
        </span>
      </button>

      <ToggleRow
        icon={<BiSolidCar className="h-4 w-4" />}
        label="Sentry mode"
        isOn={sentry.isOn}
        onToggle={sentry.toggle}
      />

      <div className="flex gap-3">
        <button
          onClick={() => toggleCover('cover.tesla_model_3_frunk', frunk.state === 'open')}
          className={clsx(
            'stat-chip card-interactive bg-surface-elevated flex-1 text-left',
            frunk.state === 'open' && 'text-chip-amber-fg'
          )}
        >
          <span className="text-lg font-bold">
            {coverStateLabel[frunk.state] ?? frunk.state}
          </span>
          <span className="text-xs font-semibold tracking-wide uppercase opacity-70">
            Frunk
          </span>
        </button>
        <button
          onClick={() => toggleCover('cover.tesla_model_3_trunk', trunk.state === 'open')}
          className={clsx(
            'stat-chip card-interactive bg-surface-elevated flex-1 text-left',
            trunk.state === 'open' && 'text-chip-amber-fg'
          )}
        >
          <span className="text-lg font-bold">
            {coverStateLabel[trunk.state] ?? trunk.state}
          </span>
          <span className="text-xs font-semibold tracking-wide uppercase opacity-70">
            Kofferbak
          </span>
        </button>
        <div className="stat-chip bg-surface-elevated flex-1">
          <span className="text-lg font-bold">
            {coverStateLabel[windows.state] ?? windows.state}
          </span>
          <span className="text-xs font-semibold tracking-wide uppercase opacity-70">
            Ramen
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => press('button.tesla_model_3_honk_horn')}
          className="bg-surface-elevated card-interactive flex flex-1 items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold"
        >
          <BiVolumeFull className="h-4 w-4" />
          Claxon
        </button>
        <button
          onClick={() => press('button.tesla_model_3_flash_lights')}
          className="bg-surface-elevated card-interactive flex flex-1 items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold"
        >
          <PiFlashlightFill className="h-4 w-4" />
          Lichten
        </button>
      </div>
    </Card>
  );
};

export { SecurityCard };
