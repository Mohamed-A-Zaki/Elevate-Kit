import i18n from "@/shared/localization/i18n";
import { createTheme, localStorageColorSchemeManager } from "@mantine/core";
import { CACHE_KEYS, FONTS } from "../constants";

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
  primaryShade: { light: 6, dark: 8 },
  autoContrast: true,

  defaultRadius: "md",

  activeClassName: "",

  radius: {
    xs: "0.25rem",
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.625rem",
    xl: "0.75rem",
  },

  shadows: {
    xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  },

  headings: {
    fontWeight: "600",
    sizes: {
      h1: { fontWeight: "700" },
    },
  },

  fontFamily: i18n.language === "ar" ? FONTS.AR : FONTS.EN,

  focusRing: "auto",

  cursorType: "pointer",

  components: {
    Button: {
      defaultProps: {
        radius: "sm",
      },
    },
    Input: {
      defaultProps: {
        radius: "sm",
      },
    },
    Card: {
      defaultProps: {
        radius: "md",
        withBorder: true,
        shadow: 0,
      },
    },
  },
});

export const colorSchemeManager = localStorageColorSchemeManager({
  key: CACHE_KEYS.THEME,
});
