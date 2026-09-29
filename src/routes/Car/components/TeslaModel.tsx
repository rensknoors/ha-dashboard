import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo } from 'react';
import {
  AnimationAction,
  AnimationClip,
  AnimationMixer,
  LoopOnce,
  LoopPingPong,
  Object3D,
  Quaternion,
} from 'three';

import {
  CAR_ANIMATION_CLIP,
  CAR_MODEL_URL,
  CHARGE_PORT_NODE,
  PART_NODES,
  REMOVED_NODES,
  STEERING_NODES,
  WHEEL_NODES,
} from '../constants';
import {
  AnimatedPart,
  CarHotspot as CarHotspotState,
  HotspotPart,
  PartState,
} from '../types';
import { usePartAnimation } from '../usePartAnimation';
import { createPartClips } from '../utils/createPartClips';
import {
  getCenterAnchor,
  getModelOrientation,
  getModelTransform,
  getTopAnchor,
} from '../utils/modelBounds';
import { CarFloor } from './CarFloor';
import { CarHotspot } from './CarHotspot';

interface TeslaModelProps {
  parts: Record<AnimatedPart, PartState>;
  hotspots: Record<HotspotPart, CarHotspotState>;
  onReady: () => void;
}

export const TeslaModel = ({ parts, hotspots, onReady }: TeslaModelProps) => {
  const { scene, animations } = useGLTF(CAR_MODEL_URL);
  const invalidate = useThree((state) => state.invalidate);

  const transform = useMemo(() => {
    REMOVED_NODES.forEach((name) =>
      scene.getObjectByName(name)?.removeFromParent()
    );
    const hood = scene.getObjectByName(PART_NODES.frunk);
    const trunk = scene.getObjectByName(PART_NODES.trunk);
    const wheels = WHEEL_NODES.flatMap(
      (name) => scene.getObjectByName(name) ?? []
    );
    const orientation =
      hood && trunk
        ? getModelOrientation(scene, { front: hood, rear: trunk, wheels })
        : new Quaternion();
    return {
      orientation,
      ...getModelTransform(scene, CAR_LENGTH, orientation),
    };
  }, [scene]);
  const anchors = useMemo(() => getHotspotAnchors(scene), [scene]);
  const { mixer, partActions, steeringAction } = useMemo(
    () => createActions(scene, animations),
    [scene, animations]
  );

  useEffect(() => {
    steeringAction?.reset().play();
    invalidate();
    onReady();
    return () => {
      mixer.stopAllAction();
    };
  }, [invalidate, mixer, onReady, steeringAction]);

  useFrame((_, delta) => {
    mixer.update(Math.min(delta, MAX_FRAME_DELTA));
    const isAnimating = [...Object.values(partActions), steeringAction].some(
      (action) => action?.isRunning()
    );
    if (isAnimating) {
      invalidate();
    }
  });

  return (
    <>
      <group scale={transform.scale} position={transform.position}>
        <group quaternion={transform.orientation}>
          <primitive object={scene}>
            {HOTSPOT_PARTS.map((part) =>
              anchors[part] ? (
                <CarHotspot
                  key={part}
                  part={part}
                  position={anchors[part]}
                  {...hotspots[part]}
                />
              ) : null
            )}
          </primitive>
        </group>
        {ANIMATED_PARTS.map((part) => (
          <PartAnimation
            key={part}
            action={partActions[part]}
            isOpen={parts[part].isOpen}
          />
        ))}
      </group>
      <CarFloor length={transform.length} width={transform.width} />
    </>
  );
};

useGLTF.preload(CAR_MODEL_URL);

const PartAnimation = ({
  action,
  isOpen,
}: {
  action: AnimationAction | undefined;
  isOpen: boolean;
}) => {
  usePartAnimation(action, isOpen);
  return null;
};

const createActions = (scene: Object3D, animations: AnimationClip[]) => {
  const mixer = new AnimationMixer(scene);
  const source = animations.find((clip) => clip.name === CAR_ANIMATION_CLIP);

  if (!source) {
    return {
      mixer,
      partActions: {} as Partial<Record<AnimatedPart, AnimationAction>>,
      steeringAction: undefined,
    };
  }

  const clips = createPartClips(source, {
    ...PART_NODES,
    steering: STEERING_NODES,
  });

  const toAction = (part: keyof typeof clips) => {
    const action = mixer.clipAction(clips[part]);
    action.setLoop(LoopOnce, 1);
    action.clampWhenFinished = true;
    return action;
  };

  const partActions: Partial<Record<AnimatedPart, AnimationAction>> =
    Object.fromEntries(ANIMATED_PARTS.map((part) => [part, toAction(part)]));

  const steeringAction = toAction('steering');
  steeringAction.setLoop(LoopPingPong, 2);
  steeringAction.timeScale = STEERING_TIME_SCALE;

  return { mixer, partActions, steeringAction };
};

const getHotspotAnchors = (
  scene: Object3D
): Partial<Record<HotspotPart, [number, number, number]>> => {
  const hood = scene.getObjectByName(PART_NODES.frunk);
  const trunk = scene.getObjectByName(PART_NODES.trunk);
  const chargePort = scene.getObjectByName(CHARGE_PORT_NODE);

  return {
    frunk: hood && getTopAnchor(scene, hood).toArray(),
    trunk: trunk && getTopAnchor(scene, trunk).toArray(),
    chargePort: chargePort && getCenterAnchor(scene, chargePort).toArray(),
  };
};

const CAR_LENGTH = 4.72;
const MAX_FRAME_DELTA = 1 / 30;
const STEERING_TIME_SCALE = 0.8;

const ANIMATED_PARTS = Object.keys(PART_NODES) as AnimatedPart[];
const HOTSPOT_PARTS: HotspotPart[] = ['frunk', 'trunk', 'chargePort'];
