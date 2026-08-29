import type { LOCALES, THEMES } from "../config";

export type Translation = {
  [key: string]: string | Translation;
};

export type Theme = (typeof THEMES)[keyof typeof THEMES];

export type LocaleCode = (typeof LOCALES)[keyof typeof LOCALES];
