import { CACHE_KEYS, DEFAULT_LOCALE_CODE } from "@/shared/configurations";
import { cache } from "@/shared/packages/cache/cache";
import type { LocaleCode } from "@/shared/types/global";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "./languages";

void i18n.use(initReactI18next).init({
  resources,
  lng: cache.get<LocaleCode>(CACHE_KEYS.LOCALE_CODE) || DEFAULT_LOCALE_CODE,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
