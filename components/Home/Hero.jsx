"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";
import { GitBashIcon } from "@/components/Home/GitBashIcon";
import { Reveal } from "../RevealFramer";
import { VectorIcon } from "../Learn/VectorIcon";

import dynamic from "next/dynamic";

const Typewriter = dynamic(() => import("typewriter-effect"), {
  ssr: false, // Disable server-side rendering for this component
});

export const Hero = () => {
  return (
    <>
      <div className="relative isolate px-6 pt-32 lg:px-8">
        <div className="mx-auto max-w-3xl ">
          <div class="hidden sm:mb-8 sm:flex sm:justify-center">
            <div class="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-400 ring-1 ring-gray-500 hover:ring-blue-600">
              Announcing our next round of funding.{" "}
              <Link
                href="#step-section"
                className="font-semibold text-blue-600 "
              >
                <span class="absolute inset-0" aria-hidden="true"></span>Read
                more <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
          <div className="text-left mt-14">
            <h1 className="text-3xl font-bold tracking-tight  sm:text-6xl text-white">
              Welcome to
              <Reveal direction="down">
                <Link href="user/auth">
                  <span className="bg-gradient-to-r from-blue-600 via-blue-600 text-5xl sm:text-7xl  to-white  text-transparent bg-clip-text ">
                    EduSpace
                  </span>
                </Link>
              </Reveal>
              Learn Programming Online
            </h1>

            <div className="gap-3 flex flex-col text-center mt-56">
              <div class="flex items-center justify-center">
                <div class="relative h-[30px] w-[19px] rounded-[15px] border-[2px] border-[#fff] border-[solid]">
                  <div class="absolute bottom-[20px] left-[4px] top-[4px] w-[8px] animate-[scroller_1500ms_ease-out_infinite] rounded-[8px] bg-[#fff]"></div>
                </div>
              </div>
              <span className="text-white">Scroll Down</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
