export const getTariffColor = (value: string): string => {
  const amount = parseFloat(value);
  if (amount <= 0.26) {
    return '#4BA66A';
  }
  if (amount <= 0.3) {
    return '#3C5551';
  } else return '#DC6731';
};
