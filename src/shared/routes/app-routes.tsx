import { URLS } from "@/shared/utils/urls";
import { Navigate, Route, Routes } from "react-router";

import AuthLayout from "@/app/layouts/auth-layout";
import BaseLayout from "@/app/layouts/base-layout";

import ForgetPasswordPage from "@/app/pages/auth/forget-password-page";
import LoginPage from "@/app/pages/auth/login-page";
import RegisterPage from "@/app/pages/auth/register-page";
import ResetPasswordPage from "@/app/pages/auth/reset-password-page";
import VerifyEmailPage from "@/app/pages/auth/verify-email-page";

import AboutPage from "@/app/pages/informative/about-page";
import HomePage from "@/app/pages/informative/home-page";

import NotFoundPage from "@/app/pages/not-found/not-found-page";

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
