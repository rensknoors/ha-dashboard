import { WeatherGroup } from '@/utils/weather/weatherConditions';

export type SkyPhase = 'day' | 'twilight' | 'night';

/**
 * Golden hour by its usual definition: the sun between 6° above and 4° below
 * the horizon. Past that the sky is plain daylight or has lost its warm glow.
 */
const GOLDEN_HOUR_TOP = 6;
const GOLDEN_HOUR_BOTTOM = -4;

/**
 * Follows the sun's actual elevation in degrees. Without one it falls back to
 * the forecast's day flag, which knows no twilight.
 */
export const getSkyPhase = (
  sunElevation: number | undefined,
  isDay: boolean
): SkyPhase => {
  if (sunElevation === undefined) {
    return isDay ? 'day' : 'night';
  }
  if (sunElevation > GOLDEN_HOUR_TOP) {
    return 'day';
  }
  return sunElevation >= GOLDEN_HOUR_BOTTOM ? 'twilight' : 'night';
};

export interface SkyTheme {
  /** Gradient colour at the top of the sky. */
  top: string;
  /** Gradient colour at the horizon. */
  bottom: string;
  /** Sun or moon glow. */
  glow: string;
}

const themes: Record<SkyPhase, Record<WeatherGroup, SkyTheme>> = {
  day: {
    clear: { top: '#16579f', bottom: '#4795d4', glow: '#ffd76a' },
    partly: { top: '#22588f', bottom: '#5a8fbd', glow: '#ffe08a' },
    cloudy: { top: '#35445a', bottom: '#66778c', glow: '#d3dce8' },
    fog: { top: '#454d58', bottom: '#79848f', glow: '#e9edf1' },
    rain: { top: '#1b2e44', bottom: '#3c5873', glow: '#7fb4e0' },
    snow: { top: '#38536f', bottom: '#869fb9', glow: '#ffffff' },
    thunder: { top: '#191c30', bottom: '#3a3557', glow: '#b9a4ff' },
  },
  twilight: {
    clear: { top: '#273a75', bottom: '#d97c58', glow: '#ffb56b' },
    partly: { top: '#2a396b', bottom: '#c0735f', glow: '#ffba82' },
    cloudy: { top: '#2f364d', bottom: '#876969', glow: '#f0b9a0' },
    fog: { top: '#393e4c', bottom: '#857474', glow: '#f1cdbb' },
    rain: { top: '#1b2640', bottom: '#5b4a60', glow: '#d39a94' },
    snow: { top: '#324264', bottom: '#a08693', glow: '#ffd9c7' },
    thunder: { top: '#17172b', bottom: '#4b3052', glow: '#c9a0ff' },
  },
  night: {
    clear: { top: '#080f2a', bottom: '#1c2a5c', glow: '#cdd9ff' },
    partly: { top: '#0a112a', bottom: '#232f57', glow: '#c3cff5' },
    cloudy: { top: '#11151c', bottom: '#2a323f', glow: '#9aa6b8' },
    fog: { top: '#171a1f', bottom: '#353b44', glow: '#b4bcc6' },
    rain: { top: '#08101a', bottom: '#1b2c41', glow: '#5a8fc0' },
    snow: { top: '#0f1828', bottom: '#34435c', glow: '#dfe8ff' },
    thunder: { top: '#07070d', bottom: '#1e1a33', glow: '#9a85ff' },
  },
};

export const getSkyTheme = (group: WeatherGroup, phase: SkyPhase): SkyTheme =>
  themes[phase][group];
