import {
  CameraControls,
  CameraControlsImpl,
  Environment,
  Lightformer,
} from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { ReactNode, useCallback, useEffect, useRef } from 'react';

import { usePageVisible } from '../usePageVisible';

interface CarSceneProps {
  children: ReactNode;
}

export const CarScene = ({ children }: CarSceneProps) => {
  const isPageVisible = usePageVisible();

  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={isPageVisible ? 'demand' : 'never'}
      gl={{ antialias: true }}
      camera={{ fov: CAMERA_FOV, position: INTRO_POSITION }}
    >
      <SceneLighting />
      {children}
      <CarCameraControls />
    </Canvas>
  );
};

const SceneLighting = () => (
  <>
    <ambientLight intensity={0.4} />
    <Environment resolution={256} frames={1}>
      <Lightformer
        form="rect"
        intensity={3}
        position={[0, 6, 0]}
        rotation-x={Math.PI / 2}
        scale={[10, 4, 1]}
      />
      <Lightformer
        form="rect"
        intensity={2}
        position={[-6, 2, 0]}
        rotation-y={Math.PI / 2}
        scale={[12, 1.2, 1]}
      />
      <Lightformer
        form="rect"
        intensity={2}
        position={[6, 2, 0]}
        rotation-y={-Math.PI / 2}
        scale={[12, 1.2, 1]}
      />
      <Lightformer form="ring" intensity={1.5} position={[0, 3, 8]} scale={3} />
    </Environment>
  </>
);

const CarCameraControls = () => {
  const controlsRef = useRef<CameraControlsImpl>(null);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const invalidate = useThree((state) => state.invalidate);

  const moveHome = useCallback(() => {
    controlsRef.current?.setLookAt(...HOME_POSITION, ...TARGET, true);
    invalidate();
  }, [invalidate]);

  const clearResetTimer = useCallback(() => {
    if (resetTimer.current) {
      clearTimeout(resetTimer.current);
      resetTimer.current = null;
    }
  }, []);

  const scheduleReset = useCallback(() => {
    clearResetTimer();
    resetTimer.current = setTimeout(moveHome, IDLE_RESET_MS);
  }, [clearResetTimer, moveHome]);

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) {
      return;
    }
    controls.setFocalOffset(...FOCAL_OFFSET, false);
    controls.setLookAt(...INTRO_POSITION, ...TARGET, false);
    moveHome();
    return clearResetTimer;
  }, [clearResetTimer, moveHome]);

  return (
    <CameraControls
      ref={controlsRef}
      makeDefault
      smoothTime={0.6}
      minPolarAngle={MIN_POLAR_ANGLE}
      maxPolarAngle={MAX_POLAR_ANGLE}
      mouseButtons={{
        left: CameraControlsImpl.ACTION.ROTATE,
        middle: CameraControlsImpl.ACTION.NONE,
        right: CameraControlsImpl.ACTION.NONE,
        wheel: CameraControlsImpl.ACTION.NONE,
      }}
      touches={{
        one: CameraControlsImpl.ACTION.TOUCH_ROTATE,
        two: CameraControlsImpl.ACTION.NONE,
        three: CameraControlsImpl.ACTION.NONE,
      }}
      onStart={clearResetTimer}
      onEnd={scheduleReset}
    />
  );
};

type Vec3 = [number, number, number];

const CAMERA_FOV = 30;
const TARGET: Vec3 = [0, 0.6, 0];
const HOME_POSITION: Vec3 = [6.4, 2.3, 5.6];
const INTRO_POSITION: Vec3 = [10, 3.2, 10];
const FOCAL_OFFSET: Vec3 = [-1.1, 0.2, 0];
const MIN_POLAR_ANGLE = Math.PI * 0.32;
const MAX_POLAR_ANGLE = Math.PI * 0.46;
const IDLE_RESET_MS = 20_000;
