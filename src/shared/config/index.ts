import type { MantineColorScheme } from "@mantine/core";
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

export const DEFAULT_LOCALE_CODE = LOCALES.EN;

/**
 * Prefix routes with `/:locale` (e.g. `/en/about`).
 * When `false`, routes are flat (e.g. `/about`) and locale is read from cache.
 */
export const ENABLE_LOCALE_ROUTES = true;

export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
} as const;

export const DEFAULT_THEME: MantineColorScheme = THEMES.LIGHT;
