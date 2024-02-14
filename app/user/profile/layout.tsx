"use client";

import { Navbar } from "@/components/navbar/navbar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen bg-gradient-to-t dark:from-black dark:via-blue-900 dark:to-black from-white to-white via-blue-300">
      <Navbar />
      {children}
    </div>
  );
}
