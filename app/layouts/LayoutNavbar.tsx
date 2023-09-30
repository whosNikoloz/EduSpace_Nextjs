"use client";

import "@/styles/globals.css";
import { Navbar } from "@/components/navbar/navbar";

export default function LayoutNavbar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl pt-9 px-6 flex-grow">
        {children}
      </main>
    </div>
  );
}
