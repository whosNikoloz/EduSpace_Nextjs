"use client";

import Link from "next/link";
import { useRef } from "react";

export default function Hero({ lng }) {
  const scrollRef = useRef(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const languageData = {
    en: {
      span1: "Idea of the project.",
      span2: "Learn More",
      h1: "Welcome to",
      h1span: "EduSpace",
      h1span2: "Learn Programming Online",
    },
    ka: {
      span1: "პროექტის მიზანი.",
      span2: "გიაგე მეტი",
      h1: "Welcome to",
      h1span: "EduSpace",
      h1span2: "ისწავლე მარტივად პროგრამირება",
    },
  };

  const { span1, span2, h1, h1span, h1span2 } = languageData[lng];

  return (
    <>
      <div className="relative isolate px-6 pt-40 lg:px-8">
        <div className="mx-auto max-w-3xl ">
          <div className="text-left lg:mt-14 mt-1">
            <h1 className="text-5xl flex flex-col text-mono font-bold tracking-tight  lg:text-6xl text-white">
              {h1}
              <p>
                <Link
                  href="user/auth"
                  className="bg-gradient-to-r from-blue-600 via-blue-600 text-5xl sm:text-7xl  to-white  text-transparent bg-clip-text"
                >
                  {h1span}
                </Link>
              </p>
              {h1span2}
            </h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 justify-end lg:h-[35vh] h-[24vh] text-center lg:absolute lg:bottom-2 left-0 right-0 sm:visible invisible">
        <div
          onClick={handleScroll}
          style={{ cursor: "pointer" }}
          className="relative h-[30px] w-[19px] rounded-[15px] border-[2px] border-[#fff] border-[solid]"
        >
          <div
            ref={scrollRef}
            className="absolute bottom-[20px] left-[4px] top-[4px] w-[8px] animate-[scroller_1500ms_ease-out_infinite] rounded-[8px] bg-[#fff]"
          ></div>
        </div>
        <span className="text-white">Scroll Down</span>
      </div>
    </>
  );
}
