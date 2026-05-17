import type { LocaleCode } from "@/shared/types/global";
import type { MantineColorScheme } from "@mantine/core";

export const BASEURL = "https://jsonplaceholder.typicode.com";

export const DEFAULT_THEME: MantineColorScheme = "light";
export const DEFAULT_LOCALE_CODE: LocaleCode = "en";

export const CACHE_KEYS = {
  THEME: "theme",
  LOCALE_CODE: "locale-code",
};

export const FONTS = {
  EN: "Roboto, sans-serif",
  AR: "Tajawal, sans-serif",
};
