import { URLS } from "@/shared/utils/urls";
import { Navigate, Route, Routes } from "react-router";

import AuthLayout from "@/apps/auth/layout/auth-layout";
import BaseLayout from "@/apps/front-office/layout/base-layout";

import ForgetPasswordPage from "@/apps/auth/pages/forget-password-page";
import LoginPage from "@/apps/auth/pages/login-page";
import RegisterPage from "@/apps/auth/pages/register-page";
import ResetPasswordPage from "@/apps/auth/pages/reset-password-page";
import VerifyEmailPage from "@/apps/auth/pages/verify-email-page";

import AboutPage from "@/apps/front-office/about/pages/about-page";
import HomePage from "@/apps/front-office/home/pages/home-page";

import NotFoundPage from "@/apps/front-office/not-found/not-found-page";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={URLS.auth.base} element={<AuthLayout />}>
        <Route path={URLS.auth.login} element={<LoginPage />} />
        <Route path={URLS.auth.register} element={<RegisterPage />} />
        <Route
          path={URLS.auth.forgotPassword}
          element={<ForgetPasswordPage />}
        />
        <Route path={URLS.auth.resetPassword} element={<ResetPasswordPage />} />
        <Route path={URLS.auth.verifyEmail} element={<VerifyEmailPage />} />
      </Route>

      <Route path={URLS.home} element={<BaseLayout />}>
        <Route path={URLS.home} element={<HomePage />} />
        <Route path={URLS.about} element={<AboutPage />} />
      </Route>

      <Route path={URLS.notFound} element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to={URLS.notFound} replace />} />
    </Routes>
  );
}
