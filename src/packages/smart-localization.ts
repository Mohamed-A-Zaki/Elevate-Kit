/**
 * smart-localization
 * A lightweight TypeScript utility for application localization,
 * wrapping i18next / react-i18next behind a unified, reusable API.
 */

import i18n, { type InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";

export type LocaleDirection = "ltr" | "rtl";

/**
 * A single translatable string, keyed by locale.
 */
export type LocaleValue = Record<string, string>;

/**
 * A namespace of translations. Each key is either a leaf (`LocaleValue`)
 * or another nested namespace (recursive), so namespaces can be nested
 * arbitrarily deep.
 */
export interface TranslationDict {
  [key: string]: LocaleValue | TranslationDict;
}

/**
 * Given a `TranslationDict`, produces the shape you get back after
 * resolving every leaf down to a single locale's string — with the
 * exact key names preserved.
 */
export type ResolveLocale<T extends TranslationDict> = {
  [K in keyof T]: T[K] extends LocaleValue
    ? string
    : T[K] extends TranslationDict
      ? ResolveLocale<T[K]>
      : never;
};

export interface Language {
  code: string;
  label?: string;
  dir?: LocaleDirection;
  translations: TranslationDict;
}

/** Pluggable persistence layer used to remember the selected locale. */
export interface LocalizationStorage {
  get(key: string): string | null;
  set(key: string, value: string): void;
}

export interface LocalizationOptions {
  /** Supported languages with their full translation trees. */
  languages: readonly Language[];
  /** Locale used when nothing is cached and as fallback. */
  defaultLocale: string;
  /** Key used to persist the selected locale (pass null to disable). */
  cacheKey?: string | null;
  /** i18next resource namespace. @default "translation" */
  namespace?: string;
  /** Custom storage adapter, defaults to plain localStorage. */
  storage?: LocalizationStorage;
  /** Extra i18next init options merged over the defaults. */
  i18nextOptions?: InitOptions;
}

interface ResolvedLocalizationOptions {
  languages: readonly Language[];
  defaultLocale: string;
  cacheKey: string | null;
  namespace: string;
  storage: LocalizationStorage;
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

const defaultStorage: LocalizationStorage = {
  get(key) {
    if (typeof window === "undefined") return null;
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key, value) {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // storage unavailable (quota, privacy mode), ignore
    }
  },
};

/** Runtime counterpart of the `LocaleValue` branch of `ResolveLocale`. */
function isLocaleValue(
  value: LocaleValue | TranslationDict,
): value is LocaleValue {
  return Object.values(value).every((entry) => typeof entry === "string");
}

/** Resolves a full translation tree down to a single locale's strings. */
function resolveTranslationTree<T extends TranslationDict>(
  node: T,
  locale: string,
): ResolveLocale<T> {
  const result = {} as ResolveLocale<T>;

  for (const key of Object.keys(node)) {
    const value = node[key];
    (result as Record<string, unknown>)[key] = isLocaleValue(value)
      ? (value[locale] ?? "")
      : resolveTranslationTree(value as TranslationDict, locale);
  }

  return result;
}

function resolveOptions(
  options: LocalizationOptions,
): ResolvedLocalizationOptions {
  return {
    languages: options.languages,
    defaultLocale: options.defaultLocale,
    cacheKey: options.cacheKey === undefined ? "locale-code" : options.cacheKey,
    namespace: options.namespace ?? "translation",
    storage: options.storage ?? defaultStorage,
  };
}

function buildResources(languages: readonly Language[], namespace: string) {
  const resources: Record<string, Record<string, TranslationDict>> = {};

  for (const language of languages) {
    resources[language.code] = { [namespace]: language.translations };
  }

  return resources;
}

// ---------------------------------------------------------------------------
// Module state
// ---------------------------------------------------------------------------

let resolvedOptions: ResolvedLocalizationOptions | null = null;
let initialized = false;

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Translate a key using the shared i18next instance.
 * Bound once at module scope; safe because i18next resolves
 * its internal state at call time, not bind time.
 */
export const trans = i18n.t.bind(i18n) as typeof i18n.t;

function init(options: LocalizationOptions): typeof i18n {
  if (initialized) return i18n;

  resolvedOptions = resolveOptions(options);

  const cachedLocale = resolvedOptions.cacheKey
    ? resolvedOptions.storage.get(resolvedOptions.cacheKey)
    : null;

  void i18n.use(initReactI18next).init({
    resources: buildResources(
      resolvedOptions.languages,
      resolvedOptions.namespace,
    ),
    lng: cachedLocale || resolvedOptions.defaultLocale,
    fallbackLng: resolvedOptions.defaultLocale,
    defaultNS: resolvedOptions.namespace,
    interpolation: {
      escapeValue: false,
    },
    ...options.i18nextOptions,
  });

  initialized = true;

  return i18n;
}

function persistLocale(locale: string): void {
  if (!resolvedOptions?.cacheKey) return;
  resolvedOptions.storage.set(resolvedOptions.cacheKey, locale);
}

async function changeLocale(locale: string): Promise<void> {
  await i18n.changeLanguage(locale);
  document.documentElement.lang = locale;
  persistLocale(locale);
}

function getLocale(): string {
  return i18n.language || resolvedOptions?.defaultLocale || "";
}

function getLanguages(): readonly Language[] {
  return resolvedOptions?.languages ?? [];
}

function getLanguage(code?: string): Language | undefined {
  const localeCode = code ?? getLocale();
  return getLanguages().find((language) => language.code === localeCode);
}

function isLocale(code: string): boolean {
  return getLanguages().some((language) => language.code === code);
}

function getDirection(code?: string): LocaleDirection {
  return getLanguage(code)?.dir ?? "ltr";
}

function isRtl(code?: string): boolean {
  return getDirection(code) === "rtl";
}

export const localization = {
  init,
  changeLocale,
  /** Alias of `changeLocale`. */
  setLocale: changeLocale,
  getLocale,
  isLocale,
  getLanguages,
  getLanguage,
  getDirection,
  isRtl,
  /** Alias of `trans`. */
  t: trans,
  trans,
  resolveTranslations: resolveTranslationTree,
};
