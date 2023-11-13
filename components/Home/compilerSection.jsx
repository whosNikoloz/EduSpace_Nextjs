"use client";

import React, { useState, useEffect } from "react";
import { Compiler } from "@/components/Home/compiler";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useUser } from "@/app/dbcontext/UserdbContext";
import { Reveal } from "../RevealFramer";

const CompilerSection = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { user } = useUser();

  const handleCourse = () => {
    if (user) {
      window.location.href = "/learn/course/c-sharp-beginner";
    } else {
      sessionStorage.setItem("redirect_url", "/learn/course/c-sharp-beginner");
      window.location.href = "/user/auth";
    }
  };

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
              <Reveal direction="down">
                <span className="text-blue-600">Start Coding</span>
              </Reveal>
              in seconds
            </h1>
            <p className="mt-6 text-sm text-gray-600 dark:text-white">
              წადი, სცადე. ჩვენი პრაქტიკული სასწავლო გარემო ნიშნავს თქვენ დაწერთ
              რეალურ კოდს თქვენი პირველივე გაკვეთილიდან.
              <br />
            </p>
            <div className="mt-10 flex items-center justify-center md:justify-start gap-x-6">
              <Button
                className="bg-blue-600 text-white"
                variant="shadow"
                onClick={handleCourse}
              >
                დაიწყე სწავლა
              </Button>
              <Link
                href="#compiler-section"
                className="text-sm font-semibold leading-6 text-black dark:text-white"
              >
                Go to Compiler
              </Link>
            </div>
          </div>
        </div>

        {/* Second container */}
        <div className="w-full md:w-2/3 md:order-1 p-6">
          <Reveal direction="right">
            <Compiler code={code} isDarkMode={isDarkMode} onChange={setCode} />
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default CompilerSection;
