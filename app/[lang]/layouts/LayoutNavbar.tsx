"use client";

import "@/styles/globals.css";
import { Navbar } from "@/components/navbar/navbar";
import { Locale } from "@/i18n.config";

export default function LayoutNavbar({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: Locale;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar lng={lang} NotMain={false} />
      <div className="mt-16">{children}</div>
    </div>
  );
}
