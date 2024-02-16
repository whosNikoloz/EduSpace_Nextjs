import "@/styles/globals.css";
import { Providers } from "./providers";
import type { Metadata } from "next";
import "@/styles/custom-scrollbar.css";
import { Locale, i18n } from "@/i18n.config";
import { EduSpace } from "@/components/EduSpaceLogo";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const metadata: Metadata = {
  title: "EduSpace",
  description: "Online Learning Platform",
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <html
      lang={params.lang}
      className={`$scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/eduspace.ico" sizes="any" />
      </head>
      <body /*className={clsx(fontSans.variable)}*/>
        <Providers themeProps={{ attribute: "class", defaultTheme: "system" }}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
