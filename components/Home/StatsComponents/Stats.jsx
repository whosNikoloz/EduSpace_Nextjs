"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TypingEffect from "@/components/typedtext";
import { GitBashCMD } from "@/components/Home/StatsComponents/gitbashcmd";

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
    languageData[lng ? lng : "ka"];
  return (
    <>
      <div className="container mx-auto text-center lg:text-left xl:px-32">
        <div className="grid items-center lg:grid-cols-2">
          <div className="mb-12 lg:mb-0">
            <div className="relative z-[1] block rounded-lg  px-6 py-12  md:px-12 lg:-mr-14 backdrop-blur-[30px] shadow-2xl  dark:bg-[#0A0A0A]">
              <TypingEffect
                text={title}
                options={{
                  typeSpeed: 70,
                  loop: false,
                  showCursor: false,
                }}
                once={false}
                className="text-4xl font-bold "
              />
              <p className="mb-12 mt-6 text-neutral-500 dark:text-neutral-300">
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
          <div className="sm:ml-10">
            <GitBashCMD />
          </div>
        </div>
      </div>
    </>
  );
};

export default Stats;
