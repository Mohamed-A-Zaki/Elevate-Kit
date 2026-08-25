import type { Language } from "@/packages/smart-localization";
import { LOCALES } from "@/shared/configurations";
import { getTranslationsForLocale } from "./translations";

export const languages = [
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
] as const satisfies readonly Language[];
