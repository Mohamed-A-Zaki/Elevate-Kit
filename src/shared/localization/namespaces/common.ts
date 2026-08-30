import type { TranslationDict } from "@/packages/smart-localization";
import type { LocaleCode } from "@/shared/types/global";

export const commonTranslations = {
  greeting: {
    ar: "مرحباً {{firstName}} {{lastName}}!",
    en: "Hello {{firstName}} {{lastName}}!",
    fr: "Bonjour {{firstName}} {{lastName}} !",
  },
  home: {
    ar: "الرئيسية",
    en: "Home",
    fr: "Accueil",
  },
  about: {
    ar: "حول",
    en: "About",
    fr: "À propos",
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
  whoops: {
    ar: "عذراً!",
    en: "Whoops!",
    fr: "Oups !",
  },
  somethingWentWrong: {
    ar: "حدث خطأ ما",
    en: "Something went wrong",
    fr: "Une erreur s'est produite",
  },
  pageNotFound: {
    ar: "الصفحة التي تبحث عنها غير موجودة، نقترح العودة إلى الرئيسية.",
    en: "The page you're looking for doesn't exist. We suggest returning to the home page.",
    fr: "La page que vous recherchez n'existe pas. Nous vous suggérons de retourner à la page d'accueil.",
  },
  backToHome: {
    ar: "العودة إلى الصفحة الرئيسية",
    en: "Back to Home",
    fr: "Retour à l'accueil",
  },
  blog: {
    ar: "المدونة",
    en: "Blog",
    fr: "Blog",
  },
  blogsPage: {
    ar: "المدونة",
    en: "Blogs",
    fr: "Blogs",
  },
  blogDetailsPage: {
    ar: "تفاصيل المقال",
    en: "Blog Details",
    fr: "Détails de l'article",
  },
} satisfies TranslationDict<LocaleCode>;
