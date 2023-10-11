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
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-teal-accent-400 sm:w-12 sm:h-12">
            <svg
              className="w-8 h-8 text-blue-600 sm:w-10 sm:h-10"
              stroke="currentColor"
              viewBox="0 0 52 52"
            >
              <polygon
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                points="29 13 14 29 25 29 23 39 38 23 27 23"
              />
            </svg>
          </div>
          <h6 className="text-4xl font-bold text-deep-purple-accent-400">
            <Number n={150} />
          </h6>
          <p className="mb-2 font-bold text-md">ჩამოტვირთვები</p>
          <p className="text-blue-400">
            ეს არის ის, რაც ისტორიაში ბევრმა ბრძენმა ადამიანმა შეინახა გონებაში.
          </p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-teal-accent-400 sm:w-12 sm:h-12">
            <svg
              className="w-8 h-8 text-blue-600 sm:w-10 sm:h-10"
              stroke="currentColor"
              viewBox="0 0 52 52"
            >
              <polygon
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                points="29 13 14 29 25 29 23 39 38 23 27 23"
              />
            </svg>
          </div>
          <h6 className="text-4xl font-bold text-deep-purple-accent-400">3k</h6>
          <p className="mb-2 font-bold text-md">მომხმარებლები</p>
          <p className="text-blue-400">
            ბევრი ადამიანისთვის სიმდიდრის შეძენა არ წყვეტს მათ პრობლემებს, ეს
            მხოლოდ ცვლის მათ.
          </p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-teal-accent-400 sm:w-12 sm:h-12">
            <svg
              className="w-8 h-8 text-blue-600 sm:w-10 sm:h-10"
              stroke="currentColor"
              viewBox="0 0 52 52"
            >
              <polygon
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                points="29 13 14 29 25 29 23 39 38 23 27 23"
              />
            </svg>
          </div>
          <h6 className="text-4xl font-bold text-deep-purple-accent-400">
            <Number n={500} />
          </h6>
          <p className="mb-2 font-bold text-md">აბონენტები</p>
          <p className="text-blue-400">
            ეს უაზრო დასაწყისია, იმის აღიარება, რაც გაბედნიერებს დღეს, ამ
            მომენტში.
          </p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-teal-accent-400 sm:w-12 sm:h-12">
            <svg
              className="w-8 h-8 text-blue-600 sm:w-10 sm:h-10"
              stroke="currentColor"
              viewBox="0 0 52 52"
            >
              <polygon
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                points="29 13 14 29 25 29 23 39 38 23 27 23"
              />
            </svg>
          </div>
          <h6 className="text-4xl font-bold text-deep-purple-accent-400">
            1.3k
          </h6>
          <p className="mb-2 font-bold text-md">პროდუქტები</p>
          <p className="text-blue-400">
            ბედნიერებაა, როცა ის არის, რასაც ფიქრობ, რასაც ამბობ და აკეთებ
            ჰარმონიაში.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
