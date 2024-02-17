"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "../RevealFramer";
import dynamic from "next/dynamic";
import { GitBashIcon } from "../icons";

const Typewriter = dynamic(() => import("typewriter-effect"), {
  ssr: false, // Disable server-side rendering for this component
});

function Number({ n }) {
  const numberRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: numberRef.current,
        start: "top bottom",
      },
    });

    tl.to(
      numberRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 5,
        innerText: n,
        roundProps: "innerText",
        onComplete: () => {
          if (numberRef.current) {
            numberRef.current.innerText = `${n}`;
          }
        },
      },
      0
    );
  }, [n]);

  return <span ref={numberRef}>0</span>;
}

const languageData = {
  en: {
    title: "Why We?",
    paragraph:
      "Experience superior online learning with our user-friendly platform. Diverse courses, interactive tools, and expert content create an engaging educational journey. Adaptive learning, community connections, and responsive support ensure an accessible, enriching experience. Join us for a transformative approach to education in just a few clicks.",
    list1: "Active Students",
    list2: "Registered Courses",
    list3: "Claimed Certifications",
  },
  ka: {
    title: "რატომ ჩვენ?",
    paragraph:
      "განიცადეთ უმაღლესი ონლაინ სწავლა ჩვენს მოსახერხებელი მომხმარებლისთვის პლატფორმა. მრავალფეროვანი კურსები, ინტერაქტიული ინსტრუმენტები და ექსპერტის შინაარსი შექმენით საინტერესო საგანმანათლებლო მოგზაურობა. ადაპტური სწავლა, საზოგადოების კავშირები და საპასუხო მხარდაჭერა უზრუნველყოფს  ხელმისაწვდომი, გამდიდრებული გამოცდილება. შემოგვიერთდით ტრანსფორმაციისთვის  მიდგომა განათლებისადმი მხოლოდ რამდენიმე დაწკაპუნებით.",
    list1: "აქტიური სტუდენტი",
    list2: "დარეგისტრირებული კურსები",
    list3: "გაცემული სერთიფიკატები",
  },
};

const Stats = ({ lng }) => {
  const { title, paragraph, list1, list2, list3 } =
    languageData[lng ? lng : "ge"];
  return (
    <>
      <div className="container mx-auto text-center lg:text-left xl:px-32">
        <div className="grid items-center lg:grid-cols-2">
          <div className="mb-12 lg:mb-0">
            <div className="relative z-[1] block rounded-lg  px-6 py-12  md:px-12 lg:-mr-14 backdrop-blur-[30px]">
              <h2 className="mb-6 text-4xl font-bold">{title}</h2>
              <p className="mb-12 text-neutral-500 dark:text-neutral-300">
                {paragraph}
              </p>

              <div className="grid gap-x-6 md:grid-cols-3">
                <div className="mb-12 md:mb-0">
                  <h2 className="text-dark mb-4 text-3xl font-bold">
                    <Number n={20000} />+
                  </h2>
                  <h5 className="mb-0 text-lg font-medium text-neutral-500 dark:text-neutral-300">
                    {list1}
                  </h5>
                </div>

                <div className="mb-12 md:mb-0">
                  <h2 className="text-dark mb-4 text-3xl font-bold">
                    <Number n={170} />+
                  </h2>
                  <h5 className="mb-0 text-lg font-medium text-neutral-500 dark:text-neutral-300">
                    {list2}
                  </h5>
                </div>

                <div className="">
                  <h2 className="text-dark mb-4 text-3xl font-bold">
                    <Number n={300} />+
                  </h2>
                  <h5 className="mb-0 text-lg font-medium text-neutral-500 dark:text-neutral-300">
                    {list3}
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <Reveal direction="left">
            <div className="mx-auto flex items-center justify-center text-start">
              <div className="w-3/4 mx-auto">
                <div className="w-full md:h-96 h-64 shadow-2xl subpixel-antialiased rounded bg-[#161b22]  border-2 border-gray-800 mx-auto">
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

export default Stats;
