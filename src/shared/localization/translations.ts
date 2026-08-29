import {
  smart_localization,
  type ResolveLocale,
  type TranslationDict,
} from "@/packages/smart-localization";
import type { LocaleCode } from "@/shared/types/global";

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

export function getTranslationsForLocale(
  locale: LocaleCode,
): ResolvedTranslations {
  return smart_localization.resolveTranslations(translations, locale);
}
