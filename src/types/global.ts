export type LocaleCode = "en" | "ar" | "fr";

export type Theme = "dark" | "light" | "system";

export type Translation = {
  [key: string]: string | Translation; // strings or nested objects
};

export interface Language {
  code: LocaleCode;
  label: string;
  dir: "ltr" | "rtl";
  translations: Translation;
}
