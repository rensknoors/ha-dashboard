import { Box3, Group, Object3D, Quaternion, Vector3 } from 'three';

const getLocalBox = (root: Object3D, target: Object3D) => {
  root.updateWorldMatrix(true, true);
  const box = new Box3().setFromObject(target);
  return box.applyMatrix4(root.matrixWorld.clone().invert());
};

const getRotatedBox = (root: Object3D, orientation: Quaternion) => {
  const parent = root.parent;
  const pivot = new Group();
  pivot.quaternion.copy(orientation);
  pivot.add(root);
  pivot.updateMatrixWorld(true);
  const box = new Box3().setFromObject(root);
  pivot.remove(root);
  parent?.add(root);
  return box;
};

const getContactPoint = (root: Object3D, wheel: Object3D) => {
  const box = getLocalBox(root, wheel);
  const center = box.getCenter(new Vector3());
  return new Vector3(center.x, box.min.y, center.z);
};

export const getModelTransform = (
  root: Object3D,
  targetLength: number,
  orientation: Quaternion
) => {
  const box = getRotatedBox(root, orientation);
  const size = box.getSize(new Vector3());
  const center = box.getCenter(new Vector3());
  const scale = targetLength / Math.max(size.x, size.z);

  return {
    scale,
    length: size.z * scale,
    width: size.x * scale,
    position: new Vector3(
      -center.x * scale,
      -box.min.y * scale,
      -center.z * scale
    ),
  };
};

export const getModelOrientation = (
  root: Object3D,
  { front, rear, wheels }: OrientationNodes
) => {
  const level = new Quaternion();
  if (wheels.length === 4) {
    const [leftFront, rightFront, leftRear, rightRear] = wheels.map((wheel) =>
      getContactPoint(root, wheel)
    );
    const normal = new Vector3()
      .subVectors(leftFront, rightRear)
      .cross(new Vector3().subVectors(rightFront, leftRear))
      .normalize();
    if (normal.y < 0) {
      normal.negate();
    }
    level.setFromUnitVectors(normal, UP);
  }

  const forward = getLocalBox(root, front)
    .getCenter(new Vector3())
    .sub(getLocalBox(root, rear).getCenter(new Vector3()))
    .applyQuaternion(level);
  const yaw = new Quaternion().setFromAxisAngle(
    UP,
    -Math.atan2(forward.x, forward.z)
  );

  return yaw.multiply(level);
};

export const getTopAnchor = (root: Object3D, target: Object3D) => {
  const box = getLocalBox(root, target);
  const center = box.getCenter(new Vector3());
  return new Vector3(center.x, box.max.y, center.z);
};

export const getCenterAnchor = (root: Object3D, target: Object3D) =>
  getLocalBox(root, target).getCenter(new Vector3());

interface OrientationNodes {
  front: Object3D;
  rear: Object3D;
  /** Ordered left-front, right-front, left-rear, right-rear. */
  wheels: Object3D[];
}

const UP = new Vector3(0, 1, 0);
