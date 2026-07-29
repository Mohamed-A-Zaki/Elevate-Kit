import { localeAtom } from "@/shared/atoms/locale-atom";
import { useCurrentLocale } from "@/shared/hooks/use-current-locale";
import i18n from "@/shared/localization/i18n";
import { languages } from "@/shared/localization/languages";
import { useDirection } from "@mantine/core";
import { useEffect } from "react";

export default function useLocaleCode() {
  const localeCode = useCurrentLocale();
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
