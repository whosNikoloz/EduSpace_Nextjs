"use client";

import { useState, useEffect } from "react";
import Ilustration from "@/public/ProgiLust1.png";
import Image from "next/image";
import { Reveal } from "../RevealFramer";

export const Hero = ({ userEmail, userName }) => {
  return (
    <>
      <div className="flex flex-wrap md:mt-36">
        {/* Image for small screens */}
        <div className="w-full md:hidden">
          <Reveal direction="up">
            <div className="mx-auto flex items-center justify-center bounce-img">
              <Image src={Ilustration} alt="error" />
            </div>
          </Reveal>
        </div>

        {/* Title and content for medium screens and above */}
        <div className="w-full md:w-1/2 p-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-black sm:text-6xl dark:text-white">
              Awesome, <span className="text-blue-600">{userName}!</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
              ელფოსტა {userEmail} წარმატებით დადასტურდა!
              <br />
              მალე გადამისამართდებით.
            </p>
          </div>
        </div>

        {/* Image for medium screens and above */}
        <div className="hidden md:block w-1/2">
          <div className="mx-auto flex items-center justify-center bounce-img">
            <Image src={Ilustration} alt="error" />
          </div>
        </div>
      </div>
    </>
  );
};
