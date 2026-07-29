import { LOCALES } from "@/shared/configurations";
import type { LocaleCode } from "@/shared/types/global";
import {
  getTranslationsForLocale,
  type ResolvedTranslations,
} from "./translations";

interface Language {
  code: LocaleCode;
  label: string;
  dir: "ltr" | "rtl";
  translations: ResolvedTranslations;
}

export const languages: readonly Language[] = [
  {
    code: LOCALES.EN,
    label: "English",
    dir: "ltr",
    translations: getTranslationsForLocale(LOCALES.EN),
  },
  {
    code: LOCALES.AR,
    label: "العربية",
    dir: "rtl",
    translations: getTranslationsForLocale(LOCALES.AR),
  },
  {
    code: LOCALES.FR,
    label: "Français",
    dir: "ltr",
    translations: getTranslationsForLocale(LOCALES.FR),
  },
] as const;

export const resources = languages.reduce<
  Record<LocaleCode, { translation: ResolvedTranslations }>
>(
  (acc, lang) => {
    acc[lang.code] = { translation: lang.translations };
    return acc;
  },
  {} as Record<LocaleCode, { translation: ResolvedTranslations }>,
);
