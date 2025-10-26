import { atom } from "@mongez/react-atom";
import { cache } from "../../packages/cache.ts";
import type { LocaleCode } from "../../types/localization.ts";
import { defaultLocaleCode } from "../../utils/flags.ts";

interface LocaleAtom {
  locale_code: LocaleCode;
}

export const localeAtom = atom<LocaleAtom>({
  key: "locale-atom",

  default: {
    locale_code: (cache.get("locale-code") as LocaleCode) || defaultLocaleCode,
  },

  beforeUpdate(newValue) {
    cache.set("locale-code", newValue.locale_code);
    return newValue;
  },
});
