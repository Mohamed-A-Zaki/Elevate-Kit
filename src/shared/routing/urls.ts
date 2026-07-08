export const URLS = {
  auth: {
    base: "/auth",
    login: "/auth/login",
    register: "/auth/register",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    verifyEmail: "/auth/verify-email",
  },
  home: "/",
  about: "/about",

  blog: "/blog",
  blogDetails: "/blog/:id",
  blogDetailsPath: (id: number) => `/blog/${id}`,

  notFound: "/404",
} as const;
