import { createTheme, localStorageColorSchemeManager } from "@mantine/core";
import i18n from "../localization/i18n";
import { CACHE_KEYS, FONTS } from "./flags";

export const theme = createTheme({
  colors: {
    primary: [
      "var(--primary-50)",
      "var(--primary-100)",
      "var(--primary-200)",
      "var(--primary-300)",
      "var(--primary-400)",
      "var(--primary-500)",
      "var(--primary-600)",
      "var(--primary-700)",
      "var(--primary-800)",
      "var(--primary-900)",
    ],
  },
  primaryColor: "primary",
  defaultRadius: "sm",
  defaultGradient: {
    from: "orange",
    to: "red",
    deg: 45,
  },
  fontFamily: i18n.language === "ar" ? FONTS.AR : FONTS.EN,
});

export const colorSchemeManager = localStorageColorSchemeManager({
  key: CACHE_KEYS.THEME,
});
