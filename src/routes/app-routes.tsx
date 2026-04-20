import { URLS } from "@/utils/urls";
import { Navigate, Route, Routes } from "react-router";

import AuthLayout from "@/components/layouts/auth-layout";
import BaseLayout from "@/components/layouts/base-layout";

import ForgetPasswordPage from "@/pages/auth/forget-password-page";
import LoginPage from "@/pages/auth/login-page";
import RegisterPage from "@/pages/auth/register-page";
import ResetPasswordPage from "@/pages/auth/reset-password-page";
import VerifyEmailPage from "@/pages/auth/verify-email-page";

import AboutPage from "@/pages/about-page";
import HomePage from "@/pages/home-page";

import NotFoundPage from "@/pages/not-found-page";

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
