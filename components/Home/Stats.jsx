"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "../RevealFramer";

// Define a TypeScript interface for the props

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

const Stats = () => {
  return (
    <>
      <Reveal direction="up">
        <div className="flex flex-col justify-center items-center  pt-4">
          <div className="min-w-[175px] md:min-w-[300px] xl:min-w-[800px] mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
            <div className="relative flex flex-grow !flex-row flex-col items-center rounded-[10px] border-[1px] border-gray-200 bg-gray-50 dark:bg-gray-900 bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
              <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                  <span className="flex items-center text-brand-500 dark:text-blue-600">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 24 24"
                      className="h-6 w-6"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"></path>
                    </svg>
                  </span>
                </div>
              </div>
              <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                <p className="font-dm text-sm font-medium text-brand-200  dark:text-blue-300">
                  Stats
                </p>
                <h4 className="text-xl font-bold text-navy-700 dark:text-blue-600">
                  <Number n={1000} />
                </h4>
              </div>
            </div>
            <div className="relative flex flex-grow !flex-row flex-col items-center rounded-[10px]  border-[1px] border-gray-200 bg-gray-50 dark:bg-gray-900 bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
              <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                  <span className="flex items-center text-brand-500 dark:text-blue-600">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 24 24"
                      className="h-7 w-7"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M4 9h4v11H4zM16 13h4v7h-4zM10 4h4v16h-4z"></path>
                    </svg>
                  </span>
                </div>
              </div>
              <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                <p className="font-dm text-sm font-medium text-brand-200  dark:text-blue-300">
                  აქტიური სტუდენტი
                </p>
                <h4 className="text-xl font-bold text-navy-700 dark:text-blue-600">
                  <Number n={145} />
                </h4>
              </div>
            </div>
            <div className="relative flex flex-grow !flex-row flex-col items-center rounded-[10px]  border-[1px] border-gray-200 bg-gray-50 dark:bg-gray-900 bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
              <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                  <span className="flex items-center text-brand-500 dark:text-blue-600">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 512 512"
                      className="h-6 w-6"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M208 448V320h96v128h97.6V256H464L256 64 48 256h62.4v192z"></path>
                    </svg>
                  </span>
                </div>
              </div>
              <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                <p className="font-dm text-sm font-medium text-brand-200  dark:text-blue-300">
                  აქტიური კურსები
                </p>
                <h4 className="text-xl font-bold text-navy-700 dark:text-blue-600">
                  <Number n={2423} />
                </h4>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </>
  );
};

export default Stats;
