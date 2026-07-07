import { arTranslations } from "./ar";
import { enTranslations } from "./en";
import { frTranslations } from "./fr";

import { LOCALES } from "@/shared/configurations";
import type { LocaleCode, Translation } from "@/shared/types/global";

export const languages = [
  {
    code: LOCALES.EN,
    label: "English",
    dir: "ltr",
    translations: enTranslations,
  },
  {
    code: LOCALES.AR,
    label: "العربية",
    dir: "rtl",
    translations: arTranslations,
  },
  {
    code: LOCALES.FR,
    label: "Français",
    dir: "ltr",
    translations: frTranslations,
  },
] as const;

// Helper map for i18n resources
export const resources = languages.reduce(
  (acc, lang) => {
    acc[lang.code] = { translation: lang.translations };
    return acc;
  },
  {} as Record<LocaleCode, { translation: Translation }>,
);
