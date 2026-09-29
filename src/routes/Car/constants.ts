import { AnimatedPart } from './types';

export const CAR_MODEL_URL = './tesla/model3.glb';
export const CAR_FALLBACK_IMAGE = './tesla/thumbnail.jpeg';

export const CAR_ANIMATION_CLIP = 'Take 001';

export const PART_NODES: Record<AnimatedPart, string> = {
  frunk: 'HOOD',
  trunk: 'TRUNK',
  frontLeftDoor: 'LF_DOOR',
  frontRightDoor: 'RF_DOOR',
  rearLeftDoor: 'LR_DOOR',
  rearRightDoor: 'RR_DOOR',
};

export const STEERING_NODES = ['Steering_Wheel', 'LF_WHEEL', 'RF_WHEEL'];
export const WHEEL_NODES = ['LF_WHEEL', 'RF_WHEEL', 'LR_WHEEL', 'RR_WHEEL'];

export const CHARGE_PORT_NODE = 'TeslaTap';

export const REMOVED_NODES = ['Box001'];

export const OPTIMISTIC_TIMEOUT_MS = 30_000;
