"use client";

import "@/styles/globals.css";
import { Navbar } from "@/components/navbar/navbar";
import { useParams } from "next/navigation";

export default function LayoutNavbar({
  children,
}: {
  children: React.ReactNode;
}) {
  const { lng } = useParams();
  const CurrLanguage = lng === "ge" ? "ge" : "en";

  return (
    <div className="relative flex flex-col h-screen">
      <Navbar lng={CurrLanguage} />
      <div className="mt-16">{children}</div>
    </div>
  );
}
