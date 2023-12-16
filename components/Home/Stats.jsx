"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "../RevealFramer";
import Image from "next/image";
import Programming from "@/public/ProgrammingIMG.jpg";

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
      <div className="container mx-auto text-center lg:text-left xl:px-32">
        <div className="grid items-center lg:grid-cols-2">
          <div className="mb-12 lg:mb-0">
            <div className="relative z-[1] block rounded-lg  px-6 py-12  md:px-12 lg:-mr-14 backdrop-blur-[30px]">
              <h2 className="mb-6 text-4xl font-bold">Why is it so great?</h2>
              <p className="mb-12 text-neutral-500 dark:text-neutral-300">
                Nunc tincidunt vulputate elit. Mauris varius purus malesuada
                neque iaculis malesuada. Aenean gravida magna orci, non
                efficitur est porta id. Donec magna diam.
              </p>

              <div className="grid gap-x-6 md:grid-cols-3">
                <div className="mb-12 md:mb-0">
                  <h2 className="text-dark mb-4 text-3xl font-bold">
                    <Number n={200} />%
                  </h2>
                  <h5 className="mb-0 text-lg font-medium text-neutral-500 dark:text-neutral-300">
                    Less sugar
                  </h5>
                </div>

                <div className="mb-12 md:mb-0">
                  <h2 className="text-dark mb-4 text-3xl font-bold">
                    <Number n={70} />%
                  </h2>
                  <h5 className="mb-0 text-lg font-medium text-neutral-500 dark:text-neutral-300">
                    More flavor
                  </h5>
                </div>

                <div className="">
                  <h2 className="text-dark mb-4 text-3xl font-bold">
                    <Number n={10} />%
                  </h2>
                  <h5 className="mb-0 text-lg font-medium text-neutral-500 dark:text-neutral-300">
                    Gluten
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <Reveal direction="left">
            <div>
              <Image
                src={Programming}
                className="rounded-lg sm:rounded-[36% 41% 59% 64%] rotate-lg-6 w-full shadow-lg blocked dark:shadow-black/20"
                alt=""
              />
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
};

export default Stats;
