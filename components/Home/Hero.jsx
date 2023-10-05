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
        y: -20, // Adjust the bounce height as needed
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
        <div className="w-full md:w-1/2 md:mt-8">
          <div className="mx-auto flex items-center justify-center bounce-img">
            <div className="w-3/4 mx-auto">
              <div className="w-full h-96 shadow-2xl subpixel-antialiased rounded bg-black dark:bg-white border-black mx-auto">
                <div
                  className="flex items-center h-8 rounded-t bg-gray-100 dark:bg-black border-b border-gray-500 text-center text-black"
                  id="headerTerminal"
                >
                  <div
                    className="flex ml-2 items-center text-center border-red-900 bg-red-500 shadow-inner rounded-full w-4 h-4"
                    id="closebtn"
                  ></div>
                  <div
                    className="ml-2 border-yellow-900 bg-yellow-500 shadow-inner rounded-full w-4 h-4"
                    id="minbtn"
                  ></div>
                  <div
                    className="ml-2 border-green-900 bg-green-500 shadow-inner rounded-full w-4 h-4"
                    id="maxbtn"
                  ></div>
                  <div className="mx-auto pr-16" id="terminaltitle">
                    <p className="text-center text-base dark:text-white">
                      Welcome to C# Learning Terminal
                    </p>
                  </div>
                </div>
                <div
                  className="pl-1 pt-1 h-auto text-green-200 dark:text-black font-mono text-sm dark:bg-white"
                  id="console"
                >
                  <p className="pb-1">
                    You are now connected to the C# learning
                  </p>
                  <p className="pb-1">
                    Type the following commands to get started:
                  </p>
                  <code className="text-yellow-400">
                    csharp{">"} Console.WriteLine("Hello, World!");
                  </code>
                  <p className="pb-1">
                    This will print "Hello, World!" to the console.
                  </p>
                  <code className="text-yellow-400">
                    csharp{">"} int number = 42;
                  </code>
                  <p className="pb-1">
                    Declare and initialize an integer variable.
                  </p>
                  <code className="text-yellow-400">
                    csharp{">"} string greeting = "Welcome to C#!";
                  </code>
                  <p className="pb-1">
                    Declare and initialize a string variable.
                  </p>
                  <code className="text-yellow-400">
                    csharp{">"} // Your C# code goes here
                  </code>
                  <p className="pb-1">Feel free to experiment and learn!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
