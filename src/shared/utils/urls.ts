import type { LocaleCode } from "@/shared/types/global";
import { CACHE_KEYS, DEFAULT_LOCALE_CODE, LOCALES } from "@/shared/utils/flags";
import { cache } from "smart-cache-ts";

const LOCALE_CODES = Object.values(LOCALES);

export const URLS = {
  auth: {
    base: "/auth",
    login: "/auth/login",
    register: "/auth/register",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    verifyEmail: "/auth/verify-email",
  },
  home: "/",
  about: "/about",
  notFound: "/404",
} as const;

// Derived from URLS so segment names never drift out of sync with the paths above.
const lastSegment = (path: string) => path.split("/").filter(Boolean).pop()!;

export const ROUTE_SEGMENTS = {
  auth: {
    base: lastSegment(URLS.auth.base),
    login: lastSegment(URLS.auth.login),
    register: lastSegment(URLS.auth.register),
    forgotPassword: lastSegment(URLS.auth.forgotPassword),
    resetPassword: lastSegment(URLS.auth.resetPassword),
    verifyEmail: lastSegment(URLS.auth.verifyEmail),
  },
  about: lastSegment(URLS.about),
  notFound: lastSegment(URLS.notFound),
} as const;

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
  if (path === URLS.home) return joinPath(locale);
  return joinPath(locale, path);
}

export function getLocaleFromPath(pathname: string): LocaleCode | null {
  const segment = pathname.split("/")[1];
  return isValidLocale(segment) ? segment : null;
}

export function stripLocaleFromPath(pathname: string): string {
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
  return localizedPath(newLocale, stripLocaleFromPath(pathname));
}

export function getPreferredLocale(): LocaleCode {
  return cache.get<LocaleCode>(CACHE_KEYS.LOCALE_CODE) || DEFAULT_LOCALE_CODE;
}

export function preferredLocalePath(path: string = URLS.home): string {
  return localizedPath(getPreferredLocale(), path);
}

export function defaultLocalePath(path: string = URLS.home): string {
  return localizedPath(DEFAULT_LOCALE_CODE, path);
}
