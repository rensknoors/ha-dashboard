export type TariffDay = 'past' | 'today' | 'tomorrow';

export interface TariffPoint {
  startsAt: Date;
  label: string;
  price: number;
  day: TariffDay;
}

export interface PriceWindow {
  startIndex: number;
  endIndex: number;
  startsAt: Date;
  endsAt: Date;
  averagePrice: number;
}

export interface TodayTariffStats {
  min: number;
  max: number;
  minAt: Date;
  maxAt: Date;
}
