"use client";

import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/navbar/navbar";
import { Link } from "@nextui-org/link";
import { Footer } from "@/components/footer";


export default function MainLayout({
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
      <Footer />
    </div>
  );
}
