import { localeAtom } from "@/shared/atoms/locale-atom";
import i18n from "@/shared/localization/i18n";
import { languages } from "@/shared/localization/languages";
import { getPreferredLocale, isValidLocale } from "@/shared/utils/urls";
import { useDirection } from "@mantine/core";
import { useEffect } from "react";
import { useParams } from "react-router";
import { ENABLE_LOCALE_ROUTES } from "../utils/flags";

export default function useLocaleCode() {
  const { locale } = useParams();
  const localeCode = ENABLE_LOCALE_ROUTES
    ? isValidLocale(locale)
      ? locale
      : null
    : getPreferredLocale();
  const { locale_code: atomLocaleCode } = localeAtom.useValue();
  const { dir, toggleDirection } = useDirection();

  useEffect(() => {
    if (!localeCode || atomLocaleCode === localeCode) {
      return;
    }

    localeAtom.change("locale_code", localeCode);
  }, [atomLocaleCode, localeCode]);

  useEffect(() => {
    if (!localeCode) {
      return;
    }

    if (i18n.language !== localeCode) {
      void i18n.changeLanguage(localeCode);
    }

    document.documentElement.lang = localeCode;

    const shouldBeDir =
      languages.find((l) => l.code === localeCode)?.dir || "ltr";

    if (shouldBeDir !== dir) {
      toggleDirection();
    }
  }, [localeCode, dir, toggleDirection]);
}
