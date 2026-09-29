import { clsx } from 'clsx';
import { Suspense, useCallback, useState } from 'react';

import { CarScene } from './components/CarScene';
import { QuickControls } from './components/QuickControls';
import { SceneErrorBoundary } from './components/SceneErrorBoundary';
import { StatusPanel } from './components/StatusPanel';
import { TeslaModel } from './components/TeslaModel';
import { useCarState } from './useCarState';

const Car = () => {
  const { status, parts, hotspots, controls } = useCarState();
  const [isModelReady, setIsModelReady] = useState(false);
  const handleReady = useCallback(() => setIsModelReady(true), []);

  return (
    <div className="relative h-full w-full">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_60%_55%,var(--color-surface-elevated),var(--color-canvas)_70%)]">
        <div
          className={clsx(
            'absolute inset-0 transition-opacity duration-1000',
            isModelReady ? 'opacity-100' : 'opacity-0'
          )}
        >
          <SceneErrorBoundary>
            <CarScene>
              <Suspense fallback={null}>
                <TeslaModel
                  parts={parts}
                  hotspots={hotspots}
                  onReady={handleReady}
                />
              </Suspense>
            </CarScene>
          </SceneErrorBoundary>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6">
        <div className="pointer-events-auto self-start">
          <StatusPanel status={status} isLocked={controls.lock.isActive} />
        </div>
        <div className="pointer-events-auto self-center">
          <QuickControls controls={controls} connection={status.connection} />
        </div>
      </div>
    </div>
  );
};

export { Car };
