import { ActionIcon, Menu, useDirection } from "@mantine/core";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaGlobe } from "react-icons/fa";
import { localeAtom } from "../../atoms/locale-atom.ts";
import { languages } from "../../localization/languages.ts";
import type { LocaleCode } from "../../types/global.ts";

export default function LanguageDirectionToggle() {
  const { i18n } = useTranslation();
  const { dir, toggleDirection } = useDirection();
  const { locale_code } = localeAtom.useValue();

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

  const handleChange = (code: LocaleCode) => {
    localeAtom.change("locale_code", code);
  };

  return (
    <Menu shadow="md" width={180}>
      <Menu.Target>
        <ActionIcon variant="default" size="lg">
          <FaGlobe size={20} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        {languages.map((lang) => (
          <Menu.Item
            key={lang.code}
            onClick={() => handleChange(lang.code)}
            disabled={locale_code === lang.code}
          >
            {lang.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
