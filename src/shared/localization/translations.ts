import type { LocaleCode } from "@/shared/types/global";
import {
  isLocaleValue,
  type ResolveLocale,
  type TranslationDict,
} from "./types";

import { commonTranslations } from "./namespaces/common";
import { fileUploadTranslations } from "./namespaces/file-upload";
import { helmetTranslations } from "./namespaces/helmet";

const translations = {
  common: commonTranslations,
  fileUpload: fileUploadTranslations,
  helmet: helmetTranslations,
} satisfies TranslationDict;

/** The full, unresolved translation tree (all namespaces, all locales). */
export type Translations = typeof translations;

/** The shape of a single locale's resolved translations. */
export type ResolvedTranslations = ResolveLocale<Translations>;

function resolveTranslationValue<T extends TranslationDict>(
  node: T,
  locale: LocaleCode,
): ResolveLocale<T> {
  const result = {} as ResolveLocale<T>;

  for (const key of Object.keys(node)) {
    const value = node[key];
    const resolved = isLocaleValue(value)
      ? (value[locale] ?? "")
      : resolveTranslationValue(value, locale);

    (result as Record<string, unknown>)[key] = resolved;
  }

  return result;
}

export function getTranslationsForLocale(
  locale: LocaleCode,
): ResolvedTranslations {
  return resolveTranslationValue(translations, locale);
}
