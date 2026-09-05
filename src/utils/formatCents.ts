const centsFormat = new Intl.NumberFormat('nl-NL', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatCents = (value: number) =>
  `${centsFormat.format(value * 100)} ct`;
