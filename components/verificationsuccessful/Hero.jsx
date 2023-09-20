"use client";

import { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import Ilustration from "@/public/ilustration1.png";
import { Code } from "@nextui-org/code";
import Image from "next/image";
import gsap from "gsap";
import Link from "next/link";

export const Hero = ({ userEmail, userName }) => {
  useEffect(() => {
    const bounceAnimation = () => {
      gsap.to(".bounce-img", {
        y: -40, // Adjust the bounce height as needed
        duration: 1,
        yoyo: true,
        repeat: -1, // -1 means infinite repeat
        ease: "power1.inOut",
      });
    };

    bounceAnimation();
  }, []);

  return (
    <>
      <div className="flex flex-wrap md:mt-20">
        {/* Image for small screens */}
        <div className="w-full md:hidden">
          <div className="mx-auto flex items-center justify-center bounce-img">
            <Image src={Ilustration} alt="error" />
          </div>
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
