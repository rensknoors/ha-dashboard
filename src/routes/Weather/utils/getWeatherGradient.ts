export const getWeatherGradient = (
  weatherCode: number,
  isDay: boolean
): string => {
  // Clear sky
  if (weatherCode === 0) {
    return isDay ? 'from-blue-400 to-cyan-300' : 'from-blue-900 to-indigo-900';
  }

  // Mainly clear, partly cloudy
  if (weatherCode <= 2) {
    return isDay ? 'from-blue-500 to-blue-300' : 'from-blue-900 to-blue-700';
  }

  // Overcast/cloudy
  if (weatherCode === 3) {
    return isDay ? 'from-gray-500 to-gray-300' : 'from-gray-800 to-gray-900';
  }

  // Fog
  if (weatherCode >= 45 && weatherCode <= 48) {
    return isDay ? 'from-gray-400 to-gray-200' : 'from-gray-700 to-gray-900';
  }

  // Snow
  if (
    (weatherCode >= 71 && weatherCode <= 77) ||
    (weatherCode >= 85 && weatherCode <= 86)
  ) {
    return isDay ? 'from-blue-400 to-gray-500' : 'from-sky-900 to-gray-800';
  }

  // Rain/drizzle/showers
  if (
    (weatherCode >= 51 && weatherCode <= 67) ||
    (weatherCode >= 80 && weatherCode <= 82)
  ) {
    return isDay ? 'from-sky-800 to-slate-600' : 'from-sky-900 to-gray-900';
  }

  // Thunderstorms
  if (weatherCode >= 95) {
    return isDay ? 'from-gray-600 to-gray-800' : 'from-gray-900 to-black';
  }

  // Default fallback
  return isDay ? 'from-blue-500 to-blue-300' : 'from-blue-900 to-blue-700';
};
