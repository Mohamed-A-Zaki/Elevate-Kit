import { smart_cache } from "@/packages/smart-cache";
import type { LocaleCode } from "@/shared/types/global";
import { atom } from "@mongez/react-atom";
import { CACHE_KEYS, DEFAULT_LOCALE_CODE } from "../constants";

interface LocaleAtom {
  locale_code: LocaleCode;
}

export const localeAtom = atom<LocaleAtom>({
  key: "locale-atom",

  default: {
    locale_code:
      smart_cache.get<LocaleCode>(CACHE_KEYS.LOCALE_CODE) ||
      DEFAULT_LOCALE_CODE,
  },

  beforeUpdate(newValue) {
    smart_cache.set(CACHE_KEYS.LOCALE_CODE, newValue.locale_code);
    window.location.reload();
    return newValue;
  },
});
