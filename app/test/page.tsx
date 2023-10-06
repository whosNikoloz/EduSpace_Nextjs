"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  console.log(session?.user?.email);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {session?.user?.image}
    </main>
  );
}
