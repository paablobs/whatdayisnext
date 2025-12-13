export const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const getNextDay = (currentDay: string): string | null => {
  const index = daysOfWeek.indexOf(currentDay);
  if (index === -1) return null;
  return daysOfWeek[(index + 1) % daysOfWeek.length];
};
