"use client";

import React, { useState, useEffect } from "react";
import { Compiler } from "@/components/Home/compiler";
import gsap from "gsap";
import { Button } from "@nextui-org/react";

const CompilerSection = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const animateCompiler = () => {
    const splide = document.querySelector(".compiler"); // Get the specific .splide div
    if (splide) {
      gsap.fromTo(
        splide, // Target the specific .splide div
        { opacity: 0, y: 50 }, // Initial state (hidden and moved down)
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: splide, // Use the specific .splide div as the trigger
            start: "top bottom-=100", // Adjust as needed
            end: "top center", // Adjust as needed
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    }
  };

  useEffect(() => {
    animateCompiler();
  }, []);

  const [code, setCode] = useState(
    `using System;
    
public class HelloWorld
{
    public static void Main(string[] args)
    {
        string saxeli = "EduSpace";
    
        //შეცვალე saxeli შენი სახელით 
        //და გაუშვი კომპილაციაზე
    
        Console.WriteLine($"Hello {saxeli}!");
    }
};
    `
  );

  return (
    <div>
      <div className="flex flex-wrap">
        {/* First container */}
        <div className="w-full md:w-1/3 p-6 flex items-center justify-center md:order-2">
          <div className="text-center md:text-left">
            {" "}
            {/* Add responsive classes */}
            <h1 className="text-5xl font-bold tracking-tight text-black dark:text-white">
              Start coding in seconds<span className="text-blue-600"></span>
            </h1>
            <p className="mt-6 text-sm text-gray-600 dark:text-white">
              წადი, სცადე. ჩვენი პრაქტიკული სასწავლო გარემო ნიშნავს თქვენ დაწერთ
              რეალურ კოდს თქვენი პირველივე გაკვეთილიდან.
              <br />
            </p>
            <div className="mt-10 flex items-center justify-center md:justify-start gap-x-6">
              <a href="/learn/c-sharp-beginner">
                <Button className="bg-blue-600 text-white">
                  დაიწყე სწავლა
                </Button>
              </a>
              <a
                href="#compiler-section"
                className="text-sm font-semibold leading-6 text-black dark:text-white"
              >
                Go to Compiler
              </a>
            </div>
          </div>
        </div>

        {/* Second container */}
        <div className="w-full md:w-2/3 md:order-1 p-6">
          <div className="compiler">
            <Compiler code={code} isDarkMode={isDarkMode} onChange={setCode} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompilerSection;
