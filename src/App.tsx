import i18n from "@/shared/localization/i18n";
import AppRoutes from "@/shared/routes/app-routes";
import { CACHEKEYS, FONTS } from "@/shared/utils/flags";
import {
  createTheme,
  DirectionProvider,
  localStorageColorSchemeManager,
  MantineProvider,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";

const theme = createTheme({
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

const colorSchemeManager = localStorageColorSchemeManager({
  key: CACHEKEYS.THEME,
});

export default function App() {
  return (
    <DirectionProvider>
      <MantineProvider
        theme={theme}
        defaultColorScheme="auto"
        colorSchemeManager={colorSchemeManager}
      >
        <AppRoutes />
        {/* Notifications */}
        <Notifications position="top-right" />
      </MantineProvider>
    </DirectionProvider>
  );
}
