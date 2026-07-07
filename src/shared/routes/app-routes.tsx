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

import ForgetPasswordPage from "@/app/pages/auth/forget-password-page";
import LoginPage from "@/app/pages/auth/login-page";
import RegisterPage from "@/app/pages/auth/register-page";
import ResetPasswordPage from "@/app/pages/auth/reset-password-page";
import VerifyEmailPage from "@/app/pages/auth/verify-email-page";

import AboutPage from "@/app/pages/informative/about-page";
import HomePage from "@/app/pages/informative/home-page";

import NotFoundPage from "@/app/pages/not-found/not-found-page";

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
        path="/"
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
