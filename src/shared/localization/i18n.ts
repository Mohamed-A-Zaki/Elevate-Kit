import { cache } from "@/packages/cache";
import { localization } from "@/packages/smart-localization";
import { CACHE_KEYS, DEFAULT_LOCALE_CODE } from "@/shared/configurations";
import { languages } from "./languages";

const i18n = localization.init({
  languages,
  defaultLocale: DEFAULT_LOCALE_CODE,
  cacheKey: CACHE_KEYS.LOCALE_CODE,
  storage: {
    get: (key) => cache.get<string>(key),
    set: (key, value) => cache.set(key, value),
  },
});

export default i18n;
