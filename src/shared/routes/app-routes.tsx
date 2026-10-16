import {
  isValidLocale,
  preferredLocalePath,
  ROUTE_SEGMENTS,
  URLS,
} from "@/shared/routing";
import { Navigate, Route, Routes, useParams } from "react-router";

import LocaleLayout from "@/shared/layouts/locale-layout";
import { coreRoutes } from "@/shared/routes/core-routes";
import { routingConfig } from "../configurations";

function LocaleNotFoundRedirect() {
  const { locale } = useParams();

  if (!routingConfig.enableLocaleRoutes) {
    return <Navigate to={URLS.notFound} replace />;
  }

  if (!isValidLocale(locale)) {
    return <Navigate to={preferredLocalePath(URLS.notFound)} replace />;
  }

  return <Navigate to={`/${locale}/${ROUTE_SEGMENTS.notFound}`} replace />;
}

function LocalePrefixedRoutes() {
  return (
    <Routes>
      <Route
        path={URLS.home}
        element={<Navigate to={preferredLocalePath()} replace />}
      />

      <Route path="/:locale" element={<LocaleLayout />}>
        {coreRoutes}
        <Route path="*" element={<LocaleNotFoundRedirect />} />
      </Route>

      <Route
        path="*"
        element={<Navigate to={preferredLocalePath(URLS.notFound)} replace />}
      />
    </Routes>
  );
}

function FlatRoutes() {
  return (
    <Routes>
      <Route element={<LocaleLayout />}>
        {coreRoutes}
        <Route path="*" element={<LocaleNotFoundRedirect />} />
      </Route>
    </Routes>
  );
}

export default function AppRoutes() {
  return routingConfig.enableLocaleRoutes ? (
    <LocalePrefixedRoutes />
  ) : (
    <FlatRoutes />
  );
}
