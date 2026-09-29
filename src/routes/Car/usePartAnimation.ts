import { useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { AnimationAction } from 'three';

export const usePartAnimation = (
  action: AnimationAction | undefined,
  isOpen: boolean
) => {
  const invalidate = useThree((state) => state.invalidate);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!action) {
      return;
    }

    action.play();

    if (!isInitialized.current) {
      isInitialized.current = true;
      action.time = isOpen ? action.getClip().duration : 0;
      action.paused = true;
      action.getMixer().update(0);
    } else {
      action.timeScale = isOpen ? 1 : -1;
      action.paused = false;
    }

    invalidate();
  }, [action, invalidate, isOpen]);
};
