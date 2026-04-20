import type { LocaleCode } from "@/types/global.ts";
import { CACHEKEYS, DEFAULTLOCALECODE } from "@/utils/flags.ts";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { cache } from "smart-cache-ts";
import { resources } from "./languages";

void i18n.use(initReactI18next).init({
  resources,
  lng: cache.get<LocaleCode>(CACHEKEYS.LOCALECODE) || DEFAULTLOCALECODE,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
