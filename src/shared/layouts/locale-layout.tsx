import useLocaleCode from "@/shared/hooks/use-locale-code";
import {
  getPreferredLocale,
  isValidLocale,
  localizedPath,
  stripLocaleFromPath,
} from "@/shared/routing";
import { Navigate, Outlet, useLocation, useParams } from "react-router";
import { ENABLE_LOCALE_ROUTES } from "../config";

function InvalidLocaleRedirect() {
  const location = useLocation();

  return (
    <Navigate
      to={localizedPath(
        getPreferredLocale(),
        stripLocaleFromPath(location.pathname),
      )}
      replace
    />
  );
}

export default function LocaleLayout() {
  const { locale } = useParams();

  useLocaleCode();

  if (!ENABLE_LOCALE_ROUTES) {
    return <Outlet />;
  }

  if (!isValidLocale(locale)) {
    return <InvalidLocaleRedirect />;
  }

  return <Outlet />;
}
