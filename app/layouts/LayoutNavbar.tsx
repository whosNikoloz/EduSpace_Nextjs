"use client";

import "@/styles/globals.css";
import { Navbar } from "@/components/navbar/navbar";

export default function LayoutNavbar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
