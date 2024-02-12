"use client";

import "@/styles/globals.css";
import { Providers } from "./providers";
import "../styles/custom-scrollbar.css";
import { ThemeProvider } from "next-themes";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`$scroll-smooth`} suppressHydrationWarning>
      <head>
        <title>EduSpace</title>
        <link
          rel="icon"
          type="image/png"
          sizes="40x40"
          href="/EduSpaceLogo.png"
        />
      </head>
      <body /*className={clsx(fontSans.variable)}*/>
        <ThemeProvider attribute="class" defaultTheme="system">
          <Providers
            themeProps={{ attribute: "class", defaultTheme: "system" }}
          >
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
