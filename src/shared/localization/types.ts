import type { LocaleCode } from "@/shared/types/global";

/**
 * A single translatable string, keyed by locale.
 * Every member of `LocaleCode` MUST be present — TypeScript will
 * reject a leaf that's missing a locale or has an extra/misspelled one.
 */
export type LocaleValue = Record<LocaleCode, string>;

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
 *
 * This replaces a hand-maintained `Translation` type: the resolved
 * shape is now *derived* from the real translation data, so it can
 * never silently drift out of sync with it.
 */
export type ResolveLocale<T extends TranslationDict> = {
  [K in keyof T]: T[K] extends LocaleValue
    ? string
    : T[K] extends TranslationDict
      ? ResolveLocale<T[K]>
      : never;
};

/** Runtime counterpart of the `LocaleValue` branch of `ResolveLocale`. */
export function isLocaleValue(
  value: LocaleValue | TranslationDict,
): value is LocaleValue {
  return Object.values(value).every((entry) => typeof entry === "string");
}
