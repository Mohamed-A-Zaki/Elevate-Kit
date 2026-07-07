import { localeAtom } from "@/shared/atoms/locale-atom";
import { languages } from "@/shared/localization/languages";
import type { LocaleCode } from "@/shared/types/global";
import {
  DEFAULT_LOCALE_CODE,
  ENABLE_LOCALE_ROUTES,
} from "@/shared/utils/flags";
import {
  getPreferredLocale,
  isValidLocale,
  switchLocalePath,
} from "@/shared/utils/urls";
import { ActionIcon, Menu } from "@mantine/core";
import { FaGlobe } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router";

export default function LanguageDirectionToggle() {
  const { locale } = useParams();
  const { locale_code: atomLocaleCode } = localeAtom.useValue();
  const localeCode = ENABLE_LOCALE_ROUTES
    ? isValidLocale(locale)
      ? locale
      : DEFAULT_LOCALE_CODE
    : (atomLocaleCode ?? getPreferredLocale());
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
