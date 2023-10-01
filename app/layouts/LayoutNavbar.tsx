"use client";

import "@/styles/globals.css";
import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer";

export default function LayoutNavbar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
