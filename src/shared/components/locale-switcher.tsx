import { localeAtom } from "@/shared/atoms/locale-atom";
import { useResolvedLocale } from "@/shared/hooks/use-current-locale";
import { languages } from "@/shared/localization/languages";
import { switchLocalePath } from "@/shared/routing";
import type { LocaleCode } from "@/shared/types/global";
import { ActionIcon, Menu } from "@mantine/core";
import { FaGlobe } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";
import { ENABLE_LOCALE_ROUTES } from "../config";

export default function LocaleSwitcher() {
  const localeCode = useResolvedLocale();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleChange = (code: LocaleCode) => {
    if (ENABLE_LOCALE_ROUTES) {
      navigate(switchLocalePath(pathname, code));
      return;
    }

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
            disabled={localeCode === lang.code}
          >
            {lang.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
