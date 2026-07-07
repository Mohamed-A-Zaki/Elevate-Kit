import { languages } from "@/shared/localization/languages";
import type { LocaleCode } from "@/shared/types/global";
import { DEFAULT_LOCALE_CODE } from "@/shared/utils/flags";
import { isValidLocale, switchLocalePath } from "@/shared/utils/urls";
import { ActionIcon, Menu } from "@mantine/core";
import { FaGlobe } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router";

export default function LanguageDirectionToggle() {
  const { locale } = useParams();
  const localeCode = isValidLocale(locale) ? locale : DEFAULT_LOCALE_CODE;
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleChange = (code: LocaleCode) => {
    navigate(switchLocalePath(pathname, code));
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
