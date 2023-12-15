"use client";

import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer";
import BottomNavigation from "@/components/navbar/bottomnavigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      {children}

      <Footer />
      <div className="sm:hidden">
        <BottomNavigation />
      </div>
    </div>
  );
}
