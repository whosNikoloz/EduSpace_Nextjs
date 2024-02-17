"use client";

import { useEffect } from "react";
import { Link } from "@nextui-org/react";
import { EduSpace } from "@/components/EduSpaceLogo";

import Typed from "typed.js";

const NotFound = () => {
  useEffect(() => {
    const element = document.getElementById("user-type");

    if (element) {
      const strings = [element.innerHTML];

      const options = {
        strings,
        typeSpeed: 10,
        loop: false,
      };

      const typed = new Typed(".type", options);

      // Clean up function to destroy the Typed instance when component unmounts
      return () => {
        typed.destroy();
      };
    }
  }, []);

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

      <div className="justify-start relative flex min-h-screen  overflow-hidden bg-[#0C0C0C] py-6 ">
        <p dir="ltr" className="type mt-10"></p>
        <div id="user-type" className="hidden ">
          <div className="ml-4  flex-col  items-start">
            <span className="font-mono text-[#d6d8db]">
              Microsoft Windows [Version 10.0.18363.1256]
            </span>
            <p className="font-mono text-[#d6d8db]">
              (c) 2019 Microsoft Corporation. All rights reserved.
            </p>
            <br />
            <p className="run font-mono">
              <span className="text-[#d6d8db]">
                EduSpace:\ErrorPage\404&gt;
              </span>
              <span className="text-[#28a745]">404page.html</span>
              <span className="relative inline-block">
                <span className="relative inline-block bottom-[-2px] left-1 w-[15px] h-[6px]  bg-gray-200 animate-pulse    p-1"></span>
              </span>
            </p>
          </div>
          <div className="absolute inset-0 flex items-center justify-center ">
            <div className="flex flex-col items-center gap-4 text-center text-white">
              <h1 className="font-mono text-5xl font-black text-white">
                Not Found Error 404
              </h1>
              <div className="flex gap-4">
                <Link href="/" className="rounded-lg border p-2 text-white">
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
