"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "../RevealFramer";

export const ConnectorSecond = ({ text }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-2/6 md:w-1/2 lg:w-4/6 relative">
        <Reveal direction="down">
          <div className="h-10 md:h-36 lg:h-56 border-blue-600 border-r-4  w-full ">
            <span className="absolute bottom-2 text-center w-full text-sm sm:text-lg font-mono font-bold">
              {text}
            </span>
          </div>
        </Reveal>
      </div>

      <div className="w-2/6 border-b-4 lg:w-4/6 md:w-1/2 border-blue-600  "></div>

      <div className="w-2/6 md:w-1/2 lg:w-4/6">
        <Reveal direction="down">
          <div className="h-10 md:h-36 lg:h-56 border-blue-600  border-l-4 w-full "></div>
        </Reveal>
      </div>
    </div>
  );
};
