import { describe, expect, it } from "vitest";
import { daysOfWeek, getNextDay, getToday } from "./days";

describe("days", () => {
  it.each([
    ["Monday", "Tuesday"],
    ["Tuesday", "Wednesday"],
    ["Wednesday", "Thursday"],
    ["Thursday", "Friday"],
    ["Friday", "Saturday"],
    ["Saturday", "Sunday"],
    ["Sunday", "Monday"],
  ] as const)("returns the day after %s", (today, expected) => {
    expect(getNextDay(today)).toBe(expected);
  });

  it("keeps the public day order stable", () => {
    expect(daysOfWeek).toEqual([
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ]);
  });

  it("maps JavaScript Sunday to Sunday", () => {
    expect(getToday(new Date(2026, 8, 20))).toBe("Sunday");
  });

  it("maps JavaScript Monday to Monday", () => {
    expect(getToday(new Date(2026, 8, 21))).toBe("Monday");
  });
});
