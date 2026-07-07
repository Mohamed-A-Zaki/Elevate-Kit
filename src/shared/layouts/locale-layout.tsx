import {
  getPreferredLocale,
  isValidLocale,
  localizedPath,
  stripLocaleFromPath,
} from "@/shared/utils/urls";
import { Navigate, Outlet, useLocation, useParams } from "react-router";
import useLocaleCode from "../hooks/use-locale-code";

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

  if (!isValidLocale(locale)) {
    return <InvalidLocaleRedirect />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}
