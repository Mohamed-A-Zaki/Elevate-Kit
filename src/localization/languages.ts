import type { Language, LocaleCode, Translation } from "@/types/global";
import { arTranslations } from "./ar";
import { enTranslations } from "./en";
import { frTranslations } from "./fr";

export const languages: Language[] = [
  {
    code: "en",
    label: "English",
    dir: "ltr",
    translations: enTranslations,
  },
  {
    code: "ar",
    label: "العربية",
    dir: "rtl",
    translations: arTranslations,
  },
  {
    code: "fr",
    label: "Français",
    dir: "ltr",
    translations: frTranslations,
  },
];

// Helper map for i18n resources
export const resources = languages.reduce(
  (acc, lang) => {
    acc[lang.code] = { translation: lang.translations };
    return acc;
  },
  {} as Record<LocaleCode, { translation: Translation }>,
);
