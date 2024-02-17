import "@/styles/globals.css";
import type { Metadata } from "next";
import "@/styles/custom-scrollbar.css";

export const metadata: Metadata = {
  title: "Page Not Found - EduSpace",
  description: "Page not found",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ka" className={`$scroll-smooth`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/eduspace.ico" sizes="any" />
      </head>
      <body>{children}</body>
    </html>
  );
}
