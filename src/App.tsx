import { createTheme, DirectionProvider, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/home-page.tsx";
import NotFoundPage from "./pages/not-found-page.tsx";
import { URLS } from "./utils/urls.ts";

// const brandColors: MantineColorsTuple = [
//   "#f7ecff",
//   "#e7d6fb",
//   "#caaaf1",
//   "#ac7ce8",
//   "#9354e0",
//   "#833bdb",
//   "#7b2eda",
//   "#6921c2",
//   "#5d1cae",
//   "#501599",
// ];

const theme = createTheme({
  // colors: {
  //   brand: brandColors,
  // },
  // primaryColor: "brand",
  // defaultRadius: "md",
  // defaultGradient: {
  //   from: "orange",
  //   to: "red",
  //   deg: 45,
  // },
  // fontFamily:
  //   'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
});

export default function App() {
  return (
    <DirectionProvider>
      <MantineProvider theme={theme} defaultColorScheme="auto">
        <Routes>
          <Route path={URLS.home} element={<HomePage />} />
          <Route path={URLS.notFound} element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to={URLS.notFound} />} />
        </Routes>

        {/* Notifications */}
        <Notifications position="top-right" />
      </MantineProvider>
    </DirectionProvider>
  );
}
