"use client";

import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Providers } from "./providers";
import { QueryClient, QueryClientProvider } from "react-query";
import { isMobile } from "react-device-detect";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Check if the user prefers dark mode
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark) "
    ).matches;

    // Set the theme based on user preference
    setTheme(prefersDarkMode ? "dark" : "light");

    // Listen for changes in color scheme preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
    };
    mediaQuery.addEventListener("change", handleChange);

    // Clean up the event listener on unmount
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <html lang="en"  className={`${theme} scroll-smooth`} suppressHydrationWarning>
      <head>
        <title>EduSpace</title>
        <link
          rel="icon"
          type="image/png"
          sizes="40x40"
          href="/EduSpaceLogo.png"
        />
      </head>
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "system" }}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
