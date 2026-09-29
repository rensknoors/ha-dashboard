export type AnimatedPart =
  | 'frunk'
  | 'trunk'
  | 'frontLeftDoor'
  | 'frontRightDoor'
  | 'rearLeftDoor'
  | 'rearRightDoor';

export type HotspotPart = 'frunk' | 'trunk' | 'chargePort';

export interface PartState {
  isOpen: boolean;
  isPending: boolean;
}

export type CarConnection = 'online' | 'asleep' | 'unavailable';

export interface CarStatus {
  connection: CarConnection;
  batteryLevel: number | null;
  range: number | null;
  isCharging: boolean;
  chargerPower: number | null;
  fullyChargedAt: Date | null;
  insideTemperature: number | null;
  outsideTemperature: number | null;
}

export interface CarToggle {
  isActive: boolean;
  isPending: boolean;
  toggle: () => void;
}

export interface CarControls {
  lock: CarToggle;
  climate: CarToggle;
  defrost: CarToggle;
  sentry: CarToggle;
  flashLights: () => void;
  honkHorn: () => void;
  wake: () => void;
}

export interface CarHotspot extends PartState {
  canToggle: boolean;
  toggle: () => void;
}

export interface CarState {
  status: CarStatus;
  parts: Record<AnimatedPart, PartState>;
  hotspots: Record<HotspotPart, CarHotspot>;
  controls: CarControls;
}
