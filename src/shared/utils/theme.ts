import { createTheme, localStorageColorSchemeManager } from "@mantine/core";
import i18n from "../localization/i18n";
import { CACHE_KEYS, FONTS } from "./flags";

export const theme = createTheme({
  colors: {
    brand: [
      "var(--brand-50)",
      "var(--brand-100)",
      "var(--brand-200)",
      "var(--brand-300)",
      "var(--brand-400)",
      "var(--brand-500)",
      "var(--brand-600)",
      "var(--brand-700)",
      "var(--brand-800)",
      "var(--brand-900)",
    ],
  },
  primaryColor: "brand",
  defaultRadius: "md",
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
