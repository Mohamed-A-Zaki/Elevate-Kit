import { createTheme, DirectionProvider, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Navigate, Route, Routes } from "react-router";
import AboutPage from "./pages/about-page.tsx";
import HomePage from "./pages/home-page.tsx";
import NotFoundPage from "./pages/not-found-page.tsx";
import { URLS } from "./utils/urls.ts";

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
  fontFamily:
    'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
});

export default function App() {
  return (
    <DirectionProvider>
      <MantineProvider theme={theme} defaultColorScheme="auto">
        <Routes>
          <Route path={URLS.home} element={<HomePage />} />
          <Route path={URLS.about} element={<AboutPage />} />
          <Route path={URLS.notFound} element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to={URLS.notFound} />} />
        </Routes>

        {/* Notifications */}
        <Notifications position="top-right" />
      </MantineProvider>
    </DirectionProvider>
  );
}
