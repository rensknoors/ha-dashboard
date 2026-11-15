/** Anchor colours from freezing to hot, as [°C, r, g, b]. */
const stops: [number, number, number, number][] = [
  [-5, 122, 162, 247],
  [5, 90, 169, 230],
  [14, 111, 207, 190],
  [22, 245, 196, 81],
  [30, 240, 120, 72],
];

export const getTemperatureColor = (celsius: number) => {
  const clamped = Math.min(
    Math.max(celsius, stops[0][0]),
    stops[stops.length - 1][0]
  );
  const upperIndex = Math.max(
    stops.findIndex(([temperature]) => clamped <= temperature),
    1
  );
  const [fromTemp, ...from] = stops[upperIndex - 1];
  const [toTemp, ...to] = stops[upperIndex];
  const ratio = (clamped - fromTemp) / (toTemp - fromTemp);
  const [r, g, b] = from.map((channel, index) =>
    Math.round(channel + (to[index] - channel) * ratio)
  );

  return `rgb(${r} ${g} ${b})`;
};
