"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";
import { GitBashIcon } from "@/components/Home/GitBashIcon";
import { Reveal } from "../RevealFramer";

import dynamic from "next/dynamic";

const Typewriter = dynamic(() => import("typewriter-effect"), {
  ssr: false, // Disable server-side rendering for this component
});

export const Hero = () => {
  return (
    <>
      <div className="flex flex-wrap md:mt-20 ">
        <div className="w-full md:w-1/2 p-6 lg:text-left text-center">
          <h1 className="text-4xl font-bold tracking-tight text-black sm:text-6xl dark:text-white">
            Welcome to
            <Reveal direction="down">
              <span className="text-blue-600">EduSpace</span>
            </Reveal>
            Learn Programming Online
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
            გამოიკვლიეთ კოდირების სამყარო EduSpace-ით. ისწავლეთ პროგრამირება
            ონლაინ და დაეუფლეთ თქვენს უნარებს.
          </p>
          <div className="mt-10 flex items-center justify-center lg:justify-start gap-x-6">
            <Link href="user/auth">
              <Button variant="shadow" className="bg-blue-600 text-white">
                დაიწყე ახლავე!
              </Button>
            </Link>
            <Link
              href="#step-section"
              className="text-sm font-semibold leading-6 text-black dark:text-white"
            >
              გაიგე მეტი <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2 md:mt-8 mt-9">
          <Reveal direction="left">
            <div className="mx-auto flex items-center justify-center">
              <div className="w-3/4 mx-auto">
                <div className="w-full md:h-96 h-64 shadow-2xl subpixel-antialiased rounded bg-black border-2 border-gray-800 mx-auto">
                  <div
                    className="flex items-center h-8 rounded-t bg-gray-900  text-center text-black"
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
                      <p className="text-center text-xs text-white ml-1">
                        MINGW64:/
                      </p>
                    </div>
                  </div>
                  <div
                    className="pl-1 pt-1 h-auto text-gray-300 font-mono text-xs bg-grey-900"
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
                    <div className="pb-1">
                      <code> $ git status</code>
                    </div>
                    <div>
                      <code> On branch main</code>
                    </div>
                    <div>
                      <code>
                        Your branch is up to date with {"'origin/main'"}.
                      </code>
                    </div>
                    <div className="pt-2">
                      <code>Changes not staged for commit:</code>
                    </div>
                    <div>
                      <code>nothing to commit, working tree clean</code>
                    </div>
                    <div className="pt-1">
                      <code className="text-green-600 ">
                        EduSpace@whosNikoloz
                      </code>
                      <code className="text-purple-500"> MINGW64</code>
                      <code className="text-yellow-500">
                        {" "}
                        ~/OneDrive/desktop/eduspace
                      </code>
                      <code className="text-green-300"> (main)</code>
                    </div>
                    <div className="pb-1 flex items-center gap-2">
                      <code>$</code>
                      <code>
                        <Typewriter
                          options={{
                            strings: [
                              "git commit",
                              "git push",
                              "git add .",
                              "git დაიწყე სწავლა 🤙",
                            ],
                            autoStart: true,
                            loop: true,
                          }}
                        />
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
};
