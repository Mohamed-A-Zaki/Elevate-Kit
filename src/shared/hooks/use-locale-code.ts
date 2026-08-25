import { localization } from "@/packages/smart-localization";
import { localeAtom } from "@/shared/atoms/locale-atom";
import { useCurrentLocale } from "@/shared/hooks/use-current-locale";
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

    if (localization.getLocale() !== localeCode) {
      void localization.changeLocale(localeCode);
    }

    document.documentElement.lang = localeCode;

    const shouldBeDir = localization.getDirection(localeCode);

    if (shouldBeDir !== dir) {
      toggleDirection();
    }
  }, [localeCode, dir, toggleDirection]);
}
