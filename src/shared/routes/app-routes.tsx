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

import BlogDetailsPage from "@/modules/blog/pages/blog-details-page";
import BlogsPage from "@/modules/blog/pages/blogs-page";
import NotFoundPage from "@/modules/not-found/pages/not-found-page";
import { Fragment } from "react";
import { ENABLE_LOCALE_ROUTES } from "../utils/flags";

const coreRoutes = (
  <Fragment>
    <Route element={<AuthLayout />}>
      <Route path={ROUTE_SEGMENTS.auth.login} element={<LoginPage />} />
      <Route path={ROUTE_SEGMENTS.auth.register} element={<RegisterPage />} />
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

      <Route path={ROUTE_SEGMENTS.blog} element={<BlogsPage />} />
      <Route
        path={ROUTE_SEGMENTS.blogDetails}
        element={<BlogDetailsPage />}
      />
    </Route>

    <Route path={ROUTE_SEGMENTS.notFound} element={<NotFoundPage />} />
  </Fragment>
);

function LocaleNotFoundRedirect() {
  const { locale } = useParams();

  if (!ENABLE_LOCALE_ROUTES) {
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
  return ENABLE_LOCALE_ROUTES ? <LocalePrefixedRoutes /> : <FlatRoutes />;
}
