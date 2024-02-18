"use client";

import { Link } from "@nextui-org/react";
import { EduSpace } from "@/components/EduSpaceLogo";
import { usePathname } from "next/navigation";
import TypingEffect from "@/components/typedtext";

export default function NotFound() {
  const pathname = usePathname();

  const language = pathname.split("/")[1];
  return (
    <>
      <nav
        className={`z-50 fixed w-full top-0 bg-transparent 
        }`}
      >
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-center">
              <div className="flex flex-shrink-0 items-center">
                <Link href="/">
                  <EduSpace />
                </Link>
                <Link
                  href="/"
                  className={`font-bold text-inherit  dark:text-white text-white
                  }`}
                >
                  {" "}
                  EduSpace
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="justify-start relative flex min-h-screen  mx-auto bg-[#0C0C0C] text-white py-6 ">
        <div className="ml-4  flex-col  items-start mt-10">
          <p className="flex flex-col">
            <TypingEffect
              text={" Microsoft Windows [Version 10.0.18363.1256]"}
              options={{
                typeSpeed: 10,
                loop: false,
                showCursor: false,
              }}
              className="font-mono text-[#d6d8db] "
              once={true}
            />
            <TypingEffect
              text={"  (c) 2019 Microsoft Corporation. All rights reserved."}
              options={{
                typeSpeed: 10,
                loop: false,
                showCursor: false,
                startDelay: 1400,
              }}
              className="font-mono text-[#d6d8db] "
              once={true}
            />
          </p>
          <br />
          <p className="run font-mono">
            <TypingEffect
              text={"EduSpace:/ErrorPage>"}
              options={{
                typeSpeed: 10,
                loop: false,
                showCursor: false,
                startDelay: 3000,
              }}
              className="font-mono text-[#d6d8db]"
              once={true}
            />
            <TypingEffect
              text={"NotFoundPage.tsx"}
              options={{
                typeSpeed: 10,
                loop: false,
                showCursor: true,
                cursorChar: "|",
                startDelay: 3900,
              }}
              className="font-mono text-[#28a745]"
              once={true}
            />
          </p>
        </div>
        <div className="absolute inset-0 flex items-center justify-center ">
          <div className="flex flex-col items-center gap-3 sm:gap-6 text-center text-white">
            <TypingEffect
              text={
                language === "ka"
                  ? "გვერდი ვერ მოიძებნა! 404"
                  : "Not Found Error 404"
              }
              options={{
                typeSpeed: 30,
                loop: false,
                startDelay: 4000,
                showCursor: false,
              }}
              className="font-mono lg:text-5xl sm:text-4xl text-2xl font-black text-white"
              once={true}
            />
            <h1 className=""></h1>
            <Link href="/" className="rounded-lg border p-2 text-white">
              {language === "ka" ? "მთავარი გვერდი" : "Back to Home"}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
