import type { LocaleCode } from "@/types/global.ts";
import { CACHEKEYS, DEFAULTLOCALECODE } from "@/utils/flags.ts";
import { atom } from "@mongez/react-atom";
import { cache } from "smart-cache-ts";

interface LocaleAtom {
  locale_code: LocaleCode;
}

export const localeAtom = atom<LocaleAtom>({
  key: "locale-atom",

  default: {
    locale_code:
      cache.get<LocaleCode>(CACHEKEYS.LOCALECODE) || DEFAULTLOCALECODE,
  },

  beforeUpdate(newValue) {
    cache.set(CACHEKEYS.LOCALECODE, newValue.locale_code);
    window.location.reload();
    return newValue;
  },
});
