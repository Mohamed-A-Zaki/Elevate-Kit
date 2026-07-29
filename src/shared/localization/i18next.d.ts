import "i18next";
import type { ResolvedTranslations } from "./translations";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: {
      translation: ResolvedTranslations;
    };
  }
}
