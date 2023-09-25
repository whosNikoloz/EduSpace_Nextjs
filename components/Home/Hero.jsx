"use client";

import { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import Ilustration from "@/public/ilustration3.png";
import { Code } from "@nextui-org/code";
import Image from "next/image";
import gsap from "gsap";
import Link from "next/link";

export const Hero = () => {
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
      <div className="flex flex-wrap  md:mt-20">
        <div className="w-full md:w-1/2 p-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-black sm:text-6xl dark:text-white">
              Welcome to <span className="text-blue-600">EduSpace</span> - Learn
              Programming Online
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
              გამოიკვლიეთ კოდირების სამყარო EduSpace-ით. ისწავლეთ პროგრამირება
              ონლაინ და დაეუფლეთ თქვენს უნარებს.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="users/auth">
                <Button className="bg-blue-600 text-white">
                  დაიწყე ახლავე!
                </Button>
              </Link>

              <a
                href="#"
                className="text-sm font-semibold leading-6 text-black dark:text-white"
              >
                გაიგე მეტი <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <div className="mx-auto flex items-center justify-center bounce-img">
            <Image src={Ilustration} alt="error" />
          </div>
        </div>
      </div>
    </>
  );
};
