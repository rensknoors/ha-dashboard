const directions = [
  'N',
  'NNO',
  'NO',
  'ONO',
  'O',
  'OZO',
  'ZO',
  'ZZO',
  'Z',
  'ZZW',
  'ZW',
  'WZW',
  'W',
  'WNW',
  'NW',
  'NNW',
];

/** Dutch 16-point compass name for the bearing the wind blows from. */
export const getWindDirection = (degrees: number) =>
  directions[Math.round((((degrees % 360) + 360) % 360) / 22.5) % 16];
