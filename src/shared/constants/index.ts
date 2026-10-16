export const BASEURL = "https://geoservices1.syadtech.com/GISAPIDEVV2";

export const CACHE_KEYS = {
  THEME: "theme",
  LOCALE_CODE: "locale-code",
} as const;

export const FONTS = {
  EN: "Roboto, sans-serif",
  AR: "Tajawal, sans-serif",
  FR: "Roboto, sans-serif",
} as const;

export const LOCALES = {
  EN: "en",
  AR: "ar",
  FR: "fr",
} as const;

export const LOCALE_CODES = Object.values(LOCALES);

export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
} as const;
