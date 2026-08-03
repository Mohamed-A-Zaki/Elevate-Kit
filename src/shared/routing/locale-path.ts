import {
  CACHE_KEYS,
  DEFAULT_LOCALE_CODE,
  ENABLE_LOCALE_ROUTES,
  LOCALE_CODES,
} from "@/shared/configurations";
import { cache } from "@/shared/packages/cache/cache";
import type { LocaleCode } from "@/shared/types/global";
import { URLS } from "./urls";

export function isValidLocale(
  locale: string | undefined,
): locale is LocaleCode {
  return !!locale && LOCALE_CODES.includes(locale as LocaleCode);
}

function joinPath(...segments: string[]): string {
  const cleaned = segments
    .map((s) => s.replace(/^\/|\/$/g, ""))
    .filter(Boolean);
  return `/${cleaned.join("/")}`;
}

export function localizedPath(
  locale: LocaleCode,
  path: string = URLS.home,
): string {
  if (!ENABLE_LOCALE_ROUTES) {
    return path;
  }

  if (path === URLS.home) return joinPath(locale);
  return joinPath(locale, path);
}

export function getLocaleFromPath(pathname: string): LocaleCode | null {
  if (!ENABLE_LOCALE_ROUTES) {
    return null;
  }

  const segment = pathname.split("/")[1];
  return isValidLocale(segment) ? segment : null;
}

export function stripLocaleFromPath(pathname: string): string {
  if (!ENABLE_LOCALE_ROUTES) {
    return pathname || URLS.home;
  }

  const locale = getLocaleFromPath(pathname);

  if (!locale) {
    return pathname || URLS.home;
  }

  const stripped = pathname.slice(locale.length + 1);
  return stripped || URLS.home;
}

export function switchLocalePath(
  pathname: string,
  newLocale: LocaleCode,
): string {
  if (!ENABLE_LOCALE_ROUTES) {
    return pathname || URLS.home;
  }

  return localizedPath(newLocale, stripLocaleFromPath(pathname));
}

export function getPreferredLocale(): LocaleCode {
  return cache.get<LocaleCode>(CACHE_KEYS.LOCALE_CODE) || DEFAULT_LOCALE_CODE;
}

export function defaultLocalePath(path: string = URLS.home): string {
  return localizedPath(DEFAULT_LOCALE_CODE, path);
}

export function preferredLocalePath(path: string = URLS.home): string {
  return localizedPath(getPreferredLocale(), path);
}

export function resolveLocaleCode(
  routeLocale: string | undefined,
  atomLocale?: LocaleCode,
): LocaleCode | null {
  if (ENABLE_LOCALE_ROUTES) {
    return isValidLocale(routeLocale) ? routeLocale : null;
  }

  return atomLocale ?? getPreferredLocale();
}
