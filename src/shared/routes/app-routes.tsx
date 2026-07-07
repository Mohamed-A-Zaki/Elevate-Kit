import {
  isValidLocale,
  preferredLocalePath,
  ROUTE_SEGMENTS,
  URLS,
} from "@/shared/utils/urls";
import { Navigate, Route, Routes, useParams } from "react-router";

import AuthLayout from "@/app/layouts/auth-layout";
import BaseLayout from "@/app/layouts/base-layout";
import LocaleLayout from "@/shared/layouts/locale-layout";

import ForgetPasswordPage from "@/modules/auth/pages/forget-password-page";
import LoginPage from "@/modules/auth/pages/login-page";
import RegisterPage from "@/modules/auth/pages/register-page";
import ResetPasswordPage from "@/modules/auth/pages/reset-password-page";
import VerifyEmailPage from "@/modules/auth/pages/verify-email-page";

import AboutPage from "@/modules/about/pages/about-page";
import HomePage from "@/modules/home/pages/home-page";

import NotFoundPage from "@/modules/not-found/pages/not-found-page";

function LocaleNotFoundRedirect() {
  const { locale } = useParams();

  if (!isValidLocale(locale)) {
    return <Navigate to={preferredLocalePath(URLS.notFound)} replace />;
  }

  return <Navigate to={`/${locale}/${ROUTE_SEGMENTS.notFound}`} replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path={URLS.home}
        element={<Navigate to={preferredLocalePath()} replace />}
      />

      <Route path="/:locale" element={<LocaleLayout />}>
        <Route path={ROUTE_SEGMENTS.auth.base} element={<AuthLayout />}>
          <Route path={ROUTE_SEGMENTS.auth.login} element={<LoginPage />} />
          <Route
            path={ROUTE_SEGMENTS.auth.register}
            element={<RegisterPage />}
          />
          <Route
            path={ROUTE_SEGMENTS.auth.forgotPassword}
            element={<ForgetPasswordPage />}
          />
          <Route
            path={ROUTE_SEGMENTS.auth.resetPassword}
            element={<ResetPasswordPage />}
          />
          <Route
            path={ROUTE_SEGMENTS.auth.verifyEmail}
            element={<VerifyEmailPage />}
          />
        </Route>

        <Route element={<BaseLayout />}>
          <Route index element={<HomePage />} />
          <Route path={ROUTE_SEGMENTS.about} element={<AboutPage />} />
        </Route>

        <Route path={ROUTE_SEGMENTS.notFound} element={<NotFoundPage />} />
        <Route path="*" element={<LocaleNotFoundRedirect />} />
      </Route>

      <Route
        path="*"
        element={<Navigate to={preferredLocalePath(URLS.notFound)} replace />}
      />
    </Routes>
  );
}
