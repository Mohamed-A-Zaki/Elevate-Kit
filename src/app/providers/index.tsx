import { queryClient } from "@/shared/api/query-client";
import { DEFAULT_THEME } from "@/shared/utils/flags";
import { DirectionProvider, MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { type PropsWithChildren } from "react";
import { colorSchemeManager, theme } from "../../shared/utils/theme";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <DirectionProvider>
      <MantineProvider
        theme={theme}
        defaultColorScheme={DEFAULT_THEME}
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
