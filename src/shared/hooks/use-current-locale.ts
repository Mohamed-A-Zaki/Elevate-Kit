import { localeAtom } from "@/shared/atoms/locale-atom";
import { DEFAULT_LOCALE_CODE } from "@/shared/configurations";
import { resolveLocaleCode } from "@/shared/routing";
import type { LocaleCode } from "@/shared/types/global";
import { useParams } from "react-router";

export function useCurrentLocale(): LocaleCode | null {
  const { locale } = useParams();
  const { locale_code: atomLocaleCode } = localeAtom.useValue();

  return resolveLocaleCode(locale, atomLocaleCode);
}

export function useResolvedLocale(
  fallback: LocaleCode = DEFAULT_LOCALE_CODE,
): LocaleCode {
  return useCurrentLocale() ?? fallback;
}
