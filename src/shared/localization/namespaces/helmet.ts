import type { TranslationDict } from "@/packages/smart-localization";
import type { LocaleCode } from "@/shared/types/global";

export const helmetTranslations = {
  app_name: {
    ar: "اسم التطبيق",
    en: "App Name",
    fr: "Nom de l'application",
  },
  homePage: {
    ar: "الصفحة الرئيسية",
    en: "Home Page",
    fr: "Page d'accueil",
  },
  aboutPage: {
    ar: "صفحة حول",
    en: "About Page",
    fr: "À propos",
  },
  notFound: {
    ar: "غير موجود",
    en: "Not Found",
    fr: "Page introuvable",
  },
} satisfies TranslationDict<LocaleCode>;
