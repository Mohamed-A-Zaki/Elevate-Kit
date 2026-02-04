import { atom } from "@mongez/react-atom";
import { cache } from "smart-cache-ts";
import type { LocaleCode } from "../../types/localization.ts";
import { defaultLocaleCode, localeCodeCacheKey } from "../../utils/flags.ts";

interface LocaleAtom {
  locale_code: LocaleCode;
}

export const localeAtom = atom<LocaleAtom>({
  key: "locale-atom",

  default: {
    locale_code: cache.get<LocaleCode>(localeCodeCacheKey) || defaultLocaleCode,
  },

  beforeUpdate(newValue) {
    cache.set(localeCodeCacheKey, newValue.locale_code);
    return newValue;
  },
});
