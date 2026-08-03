import { CACHE_KEYS, DEFAULT_LOCALE_CODE } from "@/shared/configurations";
import { cache } from "@/shared/packages/cache/cache";
import type { LocaleCode } from "@/shared/types/global";
import { atom } from "@mongez/react-atom";

interface LocaleAtom {
  locale_code: LocaleCode;
}

export const localeAtom = atom<LocaleAtom>({
  key: "locale-atom",

  default: {
    locale_code:
      cache.get<LocaleCode>(CACHE_KEYS.LOCALE_CODE) || DEFAULT_LOCALE_CODE,
  },

  beforeUpdate(newValue) {
    cache.set(CACHE_KEYS.LOCALE_CODE, newValue.locale_code);
    window.location.reload();
    return newValue;
  },
});
