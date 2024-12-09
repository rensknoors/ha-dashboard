export const getTimeLabels = (length: number) => {
  const now = new Date();

  now.setMinutes(0, 0, 0); // Round down to the nearest hour
  const labels = [];
  for (let i = 0; i < length; i++) {
    const time = new Date(now.getTime() + i * 60 * 60 * 1000);
    const hours = String(time.getHours());
    labels.push(hours);
  }
  return labels;
};
