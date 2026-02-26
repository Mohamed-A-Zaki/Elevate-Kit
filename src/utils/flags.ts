import type { LocaleCode, Theme } from "../types/global";

/***
 * base url
 */
export const BASEURL = "https://app.vtechme.net/api";

/***
 * default values
 */
export const DEFAULTTHEME: Theme = "light";
export const DEFAULTLOCALECODE: LocaleCode = "en";

/***
 * cache keys
 */
export const CACHEKEYS = {
  THEME: "theme",
  LOCALECODE: "locale-code",
};

/**
 * fonts
 */
export const FONTS = {
  EN: "Roboto, sans-serif",
  AR: "Tajawal, sans-serif",
};
