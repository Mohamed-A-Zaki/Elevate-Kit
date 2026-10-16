import { queryClient } from "@/shared/api/query-client.ts";
import { colorSchemeManager, theme } from "@/shared/utils/theme.ts";
import { DirectionProvider, MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { type PropsWithChildren } from "react";
import { themeConfig } from "../configurations";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <DirectionProvider>
      <MantineProvider
        theme={theme}
        defaultColorScheme={themeConfig.defaultTheme}
        colorSchemeManager={colorSchemeManager}
      >
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} position="right" />
        </QueryClientProvider>
      </MantineProvider>
    </DirectionProvider>
  );
}
