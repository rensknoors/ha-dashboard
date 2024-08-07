export const getTariffColor = (value: number): string => {
  if (value <= 0.26) {
    return '#4BA66A';
  }
  if (value <= 0.3) {
    return '#3C5551';
  } else return '#DC6731';
};
