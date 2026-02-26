import { Navigate, Route, Routes } from "react-router";
import BaseLayout from "../components/layouts/base-layout";
import AboutPage from "../pages/about-page";
import HomePage from "../pages/home-page";
import NotFoundPage from "../pages/not-found-page";
import { URLS } from "../utils/urls";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={URLS.home} element={<BaseLayout />}>
        <Route path={URLS.home} element={<HomePage />} />
        <Route path={URLS.about} element={<AboutPage />} />
      </Route>

      <Route path={URLS.notFound} element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to={URLS.notFound} replace />} />
    </Routes>
  );
}
