import type { MantineColorScheme } from "@mantine/core";
import type { LocaleCode } from "../types/global";

export const LOCALES = {
  EN: "en",
  AR: "ar",
  FR: "fr",
} as const;

export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
} as const;

export const BASEURL = "https://jsonplaceholder.typicode.com";

export const DEFAULT_LOCALE_CODE: LocaleCode = LOCALES.EN;
export const DEFAULT_THEME: MantineColorScheme = THEMES.LIGHT;

export const CACHE_KEYS = {
  THEME: "theme",
  LOCALE_CODE: "locale-code",
};

export const FONTS = {
  EN: "Roboto, sans-serif",
  AR: "Tajawal, sans-serif",
  FR: "Roboto, sans-serif",
};
