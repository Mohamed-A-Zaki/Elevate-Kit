/**
 * Application configuration hub.
 *
 * Two kinds of configuration live here:
 * 1. **Side-effect setup** — third-party services (cache, helmet) are configured
 *    at import time. `main.tsx` imports this module once so the setup runs
 *    before the app mounts.
 * 2. **Exported config objects** — `routingConfig`, `localeConfig` and
 *    `themeConfig` hold app-wide defaults that are read across the codebase
 *    (routing, localization, theming, API headers, providers, ...).
 */

import { smart_cache } from "@/packages/smart-cache";
import type { MantineColorScheme } from "@mantine/core";
import { setHelmetConfigurations } from "@mongez/react-helmet";
import { trans } from "../../packages/smart-localization";
import { LOCALES, THEMES } from "../constants";

/**
 * Cache configuration.
 *
 * Prefixes every cached key with `app-` so the app's entries are easy to spot
 * and can't collide with keys written by other code on the same origin.
 */
smart_cache.configure({ prefix: "app-" });

/**
 * Helmet (SEO / meta) configuration.
 *
 * Appends the app name as a suffix to every page title and marks titles as
 * translatable so localized pages render the name in the active language.
 */
setHelmetConfigurations({
  // App-name suffix
  // appName: trans("helmet.app_name"),
  appName: "helmet.app_name",
  appendAppName: true,
  appNameSeparator: " | ",

  // translation
  translatable: true,
  translateAppName: true,
  translationFunction: (key: string) => {
    return trans(key as any);
  },
});

/**
 * Routing configuration.
 *
 * `enableLocaleRoutes` controls how the active locale is reflected in the URL:
 * - `true`  → routes are prefixed with the locale (e.g. `/en/about`).
 * - `false` → routes stay flat (e.g. `/about`) and the locale is read from cache.
 *
 * Toggling this affects route matching (`routes/app-routes.tsx`), the path
 * helpers (`routing/locale-path.ts`), the locale layout guard and the locale
 * switcher.
 */
export const routingConfig = {
  enableLocaleRoutes: true,
};

/**
 * Localization configuration.
 *
 * `defaultLocaleCode` is the fallback locale used when nothing is cached. It
 * seeds the locale atom, the i18n instance, the API `Accept-Language` header
 * and the default/preferred path builders.
 */
export const localeConfig = {
  defaultLocaleCode: LOCALES.EN,
};

/**
 * Theme configuration.
 *
 * `defaultTheme` is the color scheme Mantine falls back to when the user has
 * no stored preference (`light`, `dark` or `system`).
 */
export const themeConfig: { defaultTheme: MantineColorScheme } = {
  defaultTheme: THEMES.LIGHT,
};
