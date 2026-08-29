import { smart_cache } from "@/packages/smart-cache";
import { smart_localization } from "@/packages/smart-localization";
import { CACHE_KEYS, DEFAULT_LOCALE_CODE } from "../constants";
import { languages } from "./languages";

const i18n = smart_localization.init({
  languages,
  defaultLocale: DEFAULT_LOCALE_CODE,
  cacheKey: CACHE_KEYS.LOCALE_CODE,
  storage: {
    get: (key) => smart_cache.get<string>(key),
    set: (key, value) => smart_cache.set(key, value),
  },
});

export default i18n;
