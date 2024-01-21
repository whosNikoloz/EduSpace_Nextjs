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
    <div className="relative flex flex-col h-full  dark:bg-gradient-to-l dark:from-[#1B1D34] dark:via-opacity-50 dark:to-transparent  ">
      <Navbar />
      {children}

      <Footer />
      <div className="sm:hidden">
        <BottomNavigation />
      </div>
    </div>
  );
}
