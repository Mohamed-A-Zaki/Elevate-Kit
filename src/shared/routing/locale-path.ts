import { smart_cache } from "@/packages/smart-cache";
import type { LocaleCode } from "@/shared/types/global";
import { localeConfig, routingConfig } from "../configurations";
import { CACHE_KEYS, LOCALE_CODES } from "../constants";
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
  if (!routingConfig.enableLocaleRoutes) {
    return path;
  }

  if (path === URLS.home) return joinPath(locale);
  return joinPath(locale, path);
}

export function getLocaleFromPath(pathname: string): LocaleCode | null {
  if (!routingConfig.enableLocaleRoutes) {
    return null;
  }

  const segment = pathname.split("/")[1];
  return isValidLocale(segment) ? segment : null;
}

export function stripLocaleFromPath(pathname: string): string {
  if (!routingConfig.enableLocaleRoutes) {
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
  if (!routingConfig.enableLocaleRoutes) {
    return pathname || URLS.home;
  }

  return localizedPath(newLocale, stripLocaleFromPath(pathname));
}

export function getPreferredLocale(): LocaleCode {
  return (
    smart_cache.get<LocaleCode>(CACHE_KEYS.LOCALE_CODE) ||
    localeConfig.defaultLocaleCode
  );
}

export function defaultLocalePath(path: string = URLS.home): string {
  return localizedPath(localeConfig.defaultLocaleCode, path);
}

export function preferredLocalePath(path: string = URLS.home): string {
  return localizedPath(getPreferredLocale(), path);
}

export function resolveLocaleCode(
  routeLocale: string | undefined,
  atomLocale?: LocaleCode,
): LocaleCode | null {
  if (routingConfig.enableLocaleRoutes) {
    return isValidLocale(routeLocale) ? routeLocale : null;
  }

  return atomLocale ?? getPreferredLocale();
}
