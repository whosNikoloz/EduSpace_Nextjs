"use client";

import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen ">
      <Navbar />
      {children}
    </div>
  );
}
