/** Upper bound in km/h for each Beaufort force, 0 through 11. */
const upperBounds = [1, 5, 11, 19, 28, 38, 49, 61, 74, 88, 102, 117];

/** KNMI wording per Beaufort force. */
const labels = [
  'Windstil',
  'Zwak',
  'Zwak',
  'Matig',
  'Matig',
  'Vrij krachtig',
  'Krachtig',
  'Hard',
  'Stormachtig',
  'Storm',
  'Zware storm',
  'Zeer zware storm',
  'Orkaan',
];

export const getBeaufort = (kilometersPerHour: number) => {
  const index = upperBounds.findIndex((bound) => kilometersPerHour <= bound);
  const force = index === -1 ? 12 : index;
  return { force, label: labels[force] };
};
