export const LOCALES = {
  EN: "en",
  AR: "ar",
  FR: "fr",
} as const;

export const LOCALE_CODES = Object.values(LOCALES);

export const DEFAULT_LOCALE_CODE = LOCALES.EN;

/**
 * Prefix routes with `/:locale` (e.g. `/en/about`).
 * When `false`, routes are flat (e.g. `/about`) and locale is read from cache.
 */
export const ENABLE_LOCALE_ROUTES = true;
