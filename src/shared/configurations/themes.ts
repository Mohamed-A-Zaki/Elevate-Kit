import type { MantineColorScheme } from "@mantine/core";

export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
} as const;

export const DEFAULT_THEME: MantineColorScheme = THEMES.LIGHT;
