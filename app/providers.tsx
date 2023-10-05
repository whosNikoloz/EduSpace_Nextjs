"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { SessionProvider } from "next-auth/react";
import NextTopLoader from "nextjs-toploader";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserProvider } from "@/app/context/UserdbContext";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const queryClient = new QueryClient();

  return (
    <UserProvider>
      <NextThemesProvider {...themeProps}>
        <QueryClientProvider client={queryClient}>
          <NextTopLoader
            color="#1E88E5"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={true}
            easing="ease"
            speed={200}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          />
          <SessionProvider>
            <NextUIProvider>{children}</NextUIProvider>
          </SessionProvider>
        </QueryClientProvider>
      </NextThemesProvider>
    </UserProvider>
  );
}
