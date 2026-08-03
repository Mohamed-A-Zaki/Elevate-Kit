import { ROUTE_SEGMENTS } from "@/shared/routing";
import { lazy, Suspense, type JSX } from "react";
import { Route } from "react-router";

import AuthLayout from "@/app/layouts/auth-layout";
import BaseLayout from "@/app/layouts/base-layout";
import PageLoader from "@/shared/components/page-loader";

const ForgetPasswordPage = lazy(
  () => import("@/modules/auth/pages/forget-password-page"),
);
const LoginPage = lazy(() => import("@/modules/auth/pages/login-page"));
const RegisterPage = lazy(() => import("@/modules/auth/pages/register-page"));
const ResetPasswordPage = lazy(
  () => import("@/modules/auth/pages/reset-password-page"),
);
const VerifyEmailPage = lazy(
  () => import("@/modules/auth/pages/verify-email-page"),
);

const AboutPage = lazy(() => import("@/modules/about/pages/about-page"));
const HomePage = lazy(() => import("@/modules/home/pages/home-page"));
const NotFoundPage = lazy(
  () => import("@/modules/not-found/pages/not-found-page"),
);

const BlogDetailsPage = lazy(
  () => import("@/modules/blog/pages/blog-details-page"),
);
const BlogsPage = lazy(() => import("@/modules/blog/pages/blogs-page"));

/** Wraps a lazily-loaded page so each Route only needs one line. */
function withSuspense(page: JSX.Element) {
  return <Suspense fallback={<PageLoader />}>{page}</Suspense>;
}

export const coreRoutes = (
  <>
    <Route element={<AuthLayout />}>
      <Route
        path={ROUTE_SEGMENTS.auth.login}
        element={withSuspense(<LoginPage />)}
      />
      <Route
        path={ROUTE_SEGMENTS.auth.register}
        element={withSuspense(<RegisterPage />)}
      />
      <Route
        path={ROUTE_SEGMENTS.auth.forgotPassword}
        element={withSuspense(<ForgetPasswordPage />)}
      />
      <Route
        path={ROUTE_SEGMENTS.auth.resetPassword}
        element={withSuspense(<ResetPasswordPage />)}
      />
      <Route
        path={ROUTE_SEGMENTS.auth.verifyEmail}
        element={withSuspense(<VerifyEmailPage />)}
      />
    </Route>

    <Route element={<BaseLayout />}>
      <Route index element={withSuspense(<HomePage />)} />
      <Route
        path={ROUTE_SEGMENTS.about}
        element={withSuspense(<AboutPage />)}
      />

      <Route path={ROUTE_SEGMENTS.blog} element={withSuspense(<BlogsPage />)} />
      <Route
        path={ROUTE_SEGMENTS.blogDetails}
        element={withSuspense(<BlogDetailsPage />)}
      />
    </Route>

    <Route
      path={ROUTE_SEGMENTS.notFound}
      element={withSuspense(<NotFoundPage />)}
    />
  </>
);
