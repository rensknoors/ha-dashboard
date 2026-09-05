export const formatCurrency = (value: number | string) => {
  if (typeof value === 'string') {
    value = parseFloat(value);
  }

  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};
