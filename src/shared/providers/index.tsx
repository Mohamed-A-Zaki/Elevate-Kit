import { queryClient } from "@/app/api/query-client";
import { DEFAULT_THEME } from "@/shared/utils/flags";
import { DirectionProvider, MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { type PropsWithChildren } from "react";
import { colorSchemeManager, theme } from "../utils/theme";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <DirectionProvider>
        <MantineProvider
          theme={theme}
          defaultColorScheme={DEFAULT_THEME}
          colorSchemeManager={colorSchemeManager}
        >
          {children}
        </MantineProvider>
      </DirectionProvider>

      <ReactQueryDevtools initialIsOpen={false} position="right" />
    </QueryClientProvider>
  );
}
