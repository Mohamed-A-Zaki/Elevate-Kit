import useLocaleCode from "@/shared/hooks/use-locale-code";
import {
  getPreferredLocale,
  isValidLocale,
  localizedPath,
  stripLocaleFromPath,
} from "@/shared/utils/urls";
import { Navigate, Outlet, useLocation, useParams } from "react-router";

export default function LocaleLayout() {
  const { locale } = useParams();
  const location = useLocation();

  useLocaleCode();

  if (!isValidLocale(locale)) {
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

  return <Outlet />;
}
