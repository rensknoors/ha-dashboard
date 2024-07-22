export const formatCurrency = (value: string) => {
  const amount = parseFloat(value);

  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
};
