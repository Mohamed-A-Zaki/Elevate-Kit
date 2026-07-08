import {
  ActionIcon,
  type MantineColorScheme,
  Select,
  useMantineColorScheme,
} from "@mantine/core";
import { FaMoon, FaSun } from "react-icons/fa";

type ThemeTogglerProps = {
  variant: "icon" | "select";
};

export default function ThemeSwitcher({ variant }: ThemeTogglerProps) {
  const { colorScheme, setColorScheme, toggleColorScheme } =
    useMantineColorScheme();

  const options: { label: string; value: MantineColorScheme }[] = [
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
    { label: "Auto", value: "auto" },
  ];

  if (variant === "select") {
    return (
      <Select
        data={options}
        value={colorScheme}
        onChange={(value) => {
          if (value) setColorScheme(value as MantineColorScheme);
        }}
      />
    );
  }

  return (
    <ActionIcon
      onClick={toggleColorScheme}
      variant="default"
      radius="md"
      size="lg"
      aria-label="Toggle color scheme"
    >
      {colorScheme === "dark" ? <FaSun /> : <FaMoon />}
    </ActionIcon>
  );
}
