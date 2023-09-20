"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
          // Add the '+' sign after the number animation is complete
          numberRef.current.innerText = `${n}+`;
        },
      },
      0
    );
  }, [n]);

  return (
    <p
      ref={numberRef}
      className="text-4xl font-bold leading-lg:text-6xl opacity-0"
    >
      0
    </p>
  );
}

const Stats = () => {
  return (
    <section className="p-6 dark:bg-black dark:text-gray-100">
      <div className="container mx-auto grid justify-center grid-cols-2 text-center lg:grid-cols-3">
        <div className="flex flex-col justify-start m-2 lg:m-6">
          <Number n={150} />
          <p className="text-sm sm:text-base">ხელმისაწვდომი კურსები</p>
        </div>
        <div className="flex flex-col justify-start m-2 lg:m-6">
          <Number n={5000} />
          <p className="text-sm sm:text-base">აქტიური მოსწავლეები</p>
        </div>
        <div className="flex flex-col justify-start m-2 lg:m-6">
          <Number n={3000} />
          <p className="text-sm sm:text-base">გაცემული სერთიფიკატები</p>
        </div>
      </div>
    </section>
  );
};

export default Stats;
