import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { cache } from "../packages/cache.ts";
import type { LocaleCode } from "../types/localization.ts";
import { defaultLocaleCode } from "../utils/flags.ts";
import { resources } from "./languages";

void i18n.use(initReactI18next).init({
  resources,
  lng: (cache.get("locale-code") as LocaleCode) || defaultLocaleCode,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
