import type { LOCALES, THEMES } from "../utils/flags";

export type Translation = {
  [key: string]: string | Translation;
};

export type Theme = (typeof THEMES)[keyof typeof THEMES];

export type LocaleCode = (typeof LOCALES)[keyof typeof LOCALES];
