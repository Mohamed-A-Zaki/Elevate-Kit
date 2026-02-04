import { atom } from "@mongez/react-atom";
import { cache } from "smart-cache-ts";
import type { LocaleCode } from "../../types/localization.ts";
import { defaultLocaleCode } from "../../utils/flags.ts";

interface LocaleAtom {
  locale_code: LocaleCode;
}

export const localeAtom = atom<LocaleAtom>({
  key: "locale-atom",

  default: {
    locale_code: cache.get<LocaleCode>("locale-code") || defaultLocaleCode,
  },

  beforeUpdate(newValue) {
    cache.set("locale-code", newValue.locale_code);
    return newValue;
  },
});
