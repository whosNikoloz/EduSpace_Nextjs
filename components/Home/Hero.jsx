"use client";

import { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import gsap from "gsap";
import Link from "next/link";
import { GitBashIcon } from "@/components/Home/GitBashIcon";

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
              <div className="w-full h-96 shadow-2xl subpixel-antialiased rounded  dark:bg-black border-2 border-gray-800 mx-auto">
                <div
                  className="flex items-center h-8 rounded-t bg-gray-800 dark:bg-grey-900  text-center text-black"
                  id="headerTerminal"
                >
                  <div
                    className="flex ml-2 items-center text-center border-red-900 bg-red-500 shadow-inner rounded-full w-3 h-3"
                    id="closebtn"
                  ></div>
                  <div
                    className="ml-2 border-yellow-900 bg-yellow-500 shadow-inner rounded-full w-3 h-3"
                    id="minbtn"
                  ></div>
                  <div
                    className="ml-2 border-green-900 bg-green-500 shadow-inner rounded-full w-3 h-3"
                    id="maxbtn"
                  ></div>
                  <div
                    className="mx-auto pr-16 flex items-center"
                    id="terminaltitle"
                  >
                    <GitBashIcon size={23} />
                    <p className="text-center text-xs dark:text-white ml-1">
                      MINGW64:/
                    </p>
                  </div>
                </div>
                <div
                  className="pl-1 pt-1 h-auto text-green-200 dark:text-gray-300 font-mono text-xs dark:bg-grey-900"
                  id="console"
                >
                  <p className="pt-1">
                    <code className="text-green-600 ">
                      EduSpace@whosNikoloz
                    </code>
                    <code className="text-purple-500"> MINGW64</code>
                    <code className="text-yellow-500">
                      {" "}
                      ~/OneDrive/desktop/eduspace
                    </code>
                    <code className="text-green-300"> (main)</code>
                  </p>
                  <p className="pb-1">
                    <code> $ git status</code>
                  </p>
                  <p>
                    <code> On branch main</code>
                  </p>
                  <p>
                    <code>Your branch is up to date with 'origin/main'.</code>
                  </p>
                  <p className="pt-2">
                    <code>Changes not staged for commit:</code>
                  </p>
                  <p>
                    <code>
                      {"     "}
                      (use "git add/rm file..." to update what will be
                      committed)
                    </code>
                  </p>
                  <p>
                    <code>
                      (use "git restore file..." to discard changes in working
                      directory)
                    </code>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
