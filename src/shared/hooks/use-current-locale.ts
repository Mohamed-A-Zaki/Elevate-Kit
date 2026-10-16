import { localeAtom } from "@/shared/atoms/locale-atom";
import { resolveLocaleCode } from "@/shared/routing";
import type { LocaleCode } from "@/shared/types/global";
import { useParams } from "react-router";
import { localeConfig } from "../configurations";

export function useCurrentLocale(): LocaleCode | null {
  const { locale } = useParams();
  const { locale_code: atomLocaleCode } = localeAtom.useValue();

  return resolveLocaleCode(locale, atomLocaleCode);
}

export function useResolvedLocale(
  fallback: LocaleCode = localeConfig.defaultLocaleCode,
): LocaleCode {
  return useCurrentLocale() ?? fallback;
}
