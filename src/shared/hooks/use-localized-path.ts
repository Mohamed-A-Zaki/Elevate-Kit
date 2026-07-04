import type { LocaleCode } from "@/shared/types/global";
import { DEFAULT_LOCALE_CODE } from "@/shared/utils/flags";
import { isValidLocale, localizedPath } from "@/shared/utils/urls";
import { useParams } from "react-router";

export default function useLocalizedPath() {
  const { locale } = useParams();

  const localeCode = isValidLocale(locale)
    ? locale
    : DEFAULT_LOCALE_CODE;

  return {
    localizedPath: (path: string = "/") =>
      localizedPath(localeCode as LocaleCode, path),
  };
}
