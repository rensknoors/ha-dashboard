export type TariffBand = 'low' | 'normal' | 'high';

export const TARIFF_BAND_COLORS: Record<TariffBand, string> = {
  low: 'var(--color-tariff-low)',
  normal: 'var(--color-tariff-normal)',
  high: 'var(--color-tariff-high)',
};

export const TARIFF_BAND_BG: Record<TariffBand, string> = {
  low: 'bg-tariff-low',
  normal: 'bg-tariff-normal',
  high: 'bg-tariff-high',
};

export const getTariffBand = (value: number): TariffBand => {
  if (value <= 0.26) {
    return 'low';
  }
  if (value <= 0.3) {
    return 'normal';
  }
  return 'high';
};

export const getTariffColor = (value: number): string =>
  TARIFF_BAND_COLORS[getTariffBand(value)];

export const getTariffBandColor = (group: string): string => {
  if (group === 'low' || group === 'high') {
    return TARIFF_BAND_COLORS[group];
  }
  return TARIFF_BAND_COLORS.normal;
};
