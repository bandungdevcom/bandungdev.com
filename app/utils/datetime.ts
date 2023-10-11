import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

require("dayjs/locale/en");

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

export { dayjs };

export type ParamDate = Date | string | undefined | null;

/**
 * Simple Date
 */

export function getCurrentYear() {
  return new Date().getFullYear();
}

/**
 * Date time format
 */

export function formatTimeDate(date: ParamDate) {
  const formatted = dayjs(date).locale("en").format("H:mm [·] MMM D, YYYY");
  return formatted + ` · ${formatRelativeTime(date)}`;
}

export function formatDateTime(date: ParamDate) {
  return dayjs(date).locale("en").format("D MMM YYYY, H:mm");
}

export function formatDateTimeTimezone(date: ParamDate) {
  return dayjs(date).locale("en").format("D MMM YYYY, H:mm:ss Z");
}

export function formatDateOnly(date: ParamDate) {
  return dayjs(date).locale("en").format("D MMMM YYYY");
}

export function formatDateTimeRelative(date: ParamDate) {
  return (
    dayjs(date).locale("en").format("D MMM YYYY [at] H:mm") +
    ` · ${formatRelativeTime(date)}`
  );
}

export function formatDateLastMod(date: ParamDate) {
  return dayjs(date).locale("en").format("YYYY-MM-DD");
}

/**
 * Relative time
 */

export function formatRelativeTime(date: ParamDate) {
  return dayjs(date).locale("en").fromNow();
}

/**
 * Converter
 */

export function convertDaysToSeconds(days: number) {
  return 60 * 60 * 24 * days; // seconds * minutes * hours * days
}

/**
 * Greeter
 */

export function getGreetingByTime() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  const greeting =
    currentHour >= 5 && currentHour < 12
      ? "Good morning"
      : currentHour >= 12 && currentHour < 17
      ? "Good afternoon"
      : currentHour >= 17 && currentHour < 21
      ? "Good evening"
      : "Good night";

  return greeting;
}
