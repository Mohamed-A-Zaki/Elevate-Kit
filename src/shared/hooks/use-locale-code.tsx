import { localeAtom } from "@/shared/atoms/locale-atom";
import i18n from "@/shared/localization/i18n";
import { languages } from "@/shared/localization/languages";
import { useDirection } from "@mantine/core";
import { useEffect } from "react";

export default function useLocaleCode() {
  const { locale_code } = localeAtom.useValue();
  const { dir, toggleDirection } = useDirection();

  useEffect(() => {
    if (i18n.language !== locale_code) {
      void i18n.changeLanguage(locale_code);
    }

    const shouldBeDir =
      languages.find((l) => l.code === locale_code)?.dir || "ltr";

    if (shouldBeDir !== dir) {
      toggleDirection();
    }
  }, [locale_code, dir, i18n, toggleDirection]);
}
