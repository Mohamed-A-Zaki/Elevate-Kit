import i18n from "@/shared/localization/i18n";

/***
 * The `encode` function takes any JavaScript data, converts it to a JSON string, and then encodes that string into Base64 format. It uses `JSON.stringify` to convert the data to a JSON string, `encodeURIComponent` and `unescape` to handle any special characters in the JSON string, and `btoa` to encode the string into Base64.
 */
export function encode(data: any) {
  const jsonString = JSON.stringify(data);
  return btoa(decodeURI(encodeURIComponent(jsonString)));
}

/***
 * The `decode` function takes a Base64-encoded string, decodes it back to a JSON string, and then parses it into a JavaScript object. It uses `atob` to decode the Base64 string, `decodeURIComponent` and `unescape` to handle any special characters in the JSON string, and `JSON.parse` to convert the JSON string into an object.
 */
export function decode(base64: string) {
  const jsonString = decodeURIComponent(encodeURI(atob(base64)));
  return JSON.parse(jsonString);
}

/***
 * Debouncing is a technique used to limit the rate at which a function can fire. It ensures that a function is only called after a certain amount of time has passed since the last time it was invoked.
 */
export function debounce(func: Function, wait: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (this: any, ...args: any[]) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

/***
 * Throttling is a technique used to limit the number of times a function can be called within a specified time frame.
 */
export function throttle(func: Function, limit: number) {
  let inThrottle: boolean = false;

  return function (this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/***
 * The `sleep` function is a utility that returns a Promise that resolves after a specified number of milliseconds. It can be used to create a delay in asynchronous code, allowing you to pause execution for a certain amount of time before continuing.
 */
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/***
 * The `formatDate` function formats a Date object into a string based on the specified locale.
 */
export function formatDate(date: Date, locale: string = "en-US") {
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/***
 * The `formatTime` function formats a Date object into a time string based on the specified locale.
 */
export function formatTime(date: Date, locale: string = "en-US") {
  return date.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

/***
 * The `formatDateTime` function formats a Date object into a string based on the specified locale.
 */
export function formatDateTime(date: Date, locale: string = "en-US") {
  return date.toLocaleString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

/***
 * The `formatRelativeTime` function formats a Date object into a relative time string (e.g., "5 minutes ago", "in 2 hours") based on the current locale. It uses the `Intl.RelativeTimeFormat` API to achieve this.
 */
export function getCurrentLocale() {
  return i18n.language;
}

/***
 * The `getCurrentDirection` function determines the text direction (either "rtl" for right-to-left or "ltr" for left-to-right) based on the current locale. It checks if the current locale is in a predefined list of right-to-left languages (in this case, Arabic) and returns the appropriate direction.
 */
export function getCurrentDirection() {
  const rtlLanguages = ["ar"];
  return rtlLanguages.includes(getCurrentLocale()) ? "rtl" : "ltr";
}

/***
 * The `formatArabicNumber` function formats a number into an Arabic-formatted string using the `Intl.NumberFormat` API with the "ar-EG" locale.
 */
export const formatArabicNumber = (value: number): string => {
  return new Intl.NumberFormat("ar-EG").format(Number(value));
};
