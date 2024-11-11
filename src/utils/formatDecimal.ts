export const formatDecimal = (
  value: number | string,
  options?: { decimals?: number }
) => {
  if (typeof value === 'string') {
    value = parseFloat(value);
  }

  return new Intl.NumberFormat('nl-NL', {
    style: 'decimal',
    maximumFractionDigits: options?.decimals ?? 2,
  }).format(value);
};
