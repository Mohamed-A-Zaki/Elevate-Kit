import type { LocaleCode } from "@/shared/types/global";
import type { MantineColorScheme } from "@mantine/core";

export const BASEURL = "https://app.vtechme.net/api";

export const DEFAULTTHEME: MantineColorScheme = "light";
export const DEFAULTLOCALECODE: LocaleCode = "en";

export const CACHEKEYS = {
  THEME: "theme",
  LOCALECODE: "locale-code",
};

export const FONTS = {
  EN: "Roboto, sans-serif",
  AR: "Tajawal, sans-serif",
};
