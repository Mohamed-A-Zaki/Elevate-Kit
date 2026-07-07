import type { LocaleCode } from "@/shared/types/global";
import {
  CACHE_KEYS,
  DEFAULT_LOCALE_CODE,
  ENABLE_LOCALE_ROUTES,
  LOCALES,
} from "@/shared/utils/flags";
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
  blog: "/blog",
  blogDetails: "/blog/:id",
  blogDetailsPath: (id: number) => `/blog/${id}`,
  notFound: "/404",
} as const;

// Strip leading slash so URLS paths map 1:1 to React Router `path` props.
const routeSegment = (path: string) => path.replace(/^\//, "");

/**
 * Recursively mirrors a URLS-like object, converting every string leaf into
 * a router-relative segment via `routeSegment`. Function leaves (e.g. path
 * builders like `blogDetailsPath`) are dropped since they aren't route
 * definitions. Nested objects (e.g. `auth`) are walked recursively.
 */
type RouteSegmentsOf<T> = {
  [K in keyof T as T[K] extends (...args: never[]) => unknown
    ? never
    : K]: T[K] extends string
    ? string
    : T[K] extends Record<string, unknown>
      ? RouteSegmentsOf<T[K]>
      : never;
};

function toRouteSegments<T extends Record<string, unknown>>(
  obj: T,
): RouteSegmentsOf<T> {
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "function") continue;

    result[key] =
      typeof value === "string"
        ? routeSegment(value)
        : toRouteSegments(value as Record<string, unknown>);
  }

  return result as RouteSegmentsOf<T>;
}

// `home` ("/") is intentionally excluded — it's the index route, not a
// nameable segment — matching the original ROUTE_SEGMENTS shape.
const { home: _home, ...routableUrls } = URLS;

export const ROUTE_SEGMENTS = toRouteSegments(routableUrls);

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

export function preferredLocalePath(path: string = URLS.home): string {
  return localizedPath(getPreferredLocale(), path);
}

export function defaultLocalePath(path: string = URLS.home): string {
  return localizedPath(DEFAULT_LOCALE_CODE, path);
}
