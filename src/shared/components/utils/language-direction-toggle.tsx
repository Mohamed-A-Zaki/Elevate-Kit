import { localeAtom } from "@/shared/atoms/locale-atom";
import { languages } from "@/shared/localization/languages";
import type { LocaleCode } from "@/shared/types/global";
import { ActionIcon, Menu } from "@mantine/core";
import { FaGlobe } from "react-icons/fa";

export default function LanguageDirectionToggle() {
  const { locale_code } = localeAtom.useValue();

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
