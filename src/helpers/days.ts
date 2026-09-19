export const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export type Day = (typeof daysOfWeek)[number];

export const getNextDay = (currentDay: Day): Day => {
  const index = daysOfWeek.indexOf(currentDay);
  return daysOfWeek[(index + 1) % daysOfWeek.length];
};

export const getToday = (date = new Date()): Day => {
  const index = (date.getDay() + 6) % daysOfWeek.length;
  return daysOfWeek[index];
};
