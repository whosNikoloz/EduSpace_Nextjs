"use client";

import { Navbar } from "@/components/navbar/navbar";
import { useParams } from "next/navigation";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { lng } = useParams();
  const CurrLanguage = lng === "ge" ? "ge" : "en";
  return (
    <div className="relative flex flex-col h-screen bg-gradient-to-t dark:from-black dark:via-blue-900 dark:to-black from-white to-white via-blue-300">
      <Navbar lng={CurrLanguage} />
      {children}
    </div>
  );
}
