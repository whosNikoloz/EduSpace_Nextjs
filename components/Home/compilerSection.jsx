"use client";

import React, { useState } from "react";
import { Compiler } from "@/components/Home/compiler";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useUser } from "@/app/dbcontext/UserdbContext";
import { Reveal } from "../RevealFramer";
import TypingEffect from "@/components/typedtext";
import { useRouter } from "next/navigation";

const CompilerSection = ({ lng }) => {
  const { user } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleCourse = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (user) {
        router.push(`${lng}/learn/course/csharp-beginner`);
      } else {
        sessionStorage.setItem("redirect_url", "/learn/course/csharp-beginner");
        router.push("/user/auth");
      }
    }, 500); // Delay of 500 milliseconds
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

  const languageData = {
    en: {
      paragraph:
        "Go ahead and try it. Our hands-on learning environment is you-write Real code from your very first lesson.",
      buttonTitel: "Start Learning",
    },
    ka: {
      paragraph:
        "წადი, სცადე. ჩვენი პრაქტიკული სასწავლო გარემო ნიშნავს თქვენ დაწერთ რეალურ კოდს თქვენი პირველივე გაკვეთილიდან.",
      buttonTitel: "დაიწყე სწავლა",
    },
  };

  const { paragraph, buttonTitel } = languageData[lng];

  return (
    <div>
      <div className="flex flex-wrap">
        {/* First container */}
        <div className="w-full md:w-1/3 p-6 flex items-center justify-center md:order-2">
          <div className="text-center md:text-left">
            {" "}
            {/* Add responsive classes */}
            <div className=" md:text-4xl lg:text-5xl font-bold tracking-tight text-black flex flex-col dark:text-white">
              <TypingEffect
                text={"Start Coding"}
                options={{
                  typeSpeed: 40,
                  loop: false,
                  showCursor: false,
                }}
                once={false}
                className="text-blue-600"
              />
              in seconds
            </div>
            <p className="mt-6 text-sm text-gray-600 dark:text-white">
              {paragraph}
              <br />
            </p>
            <div className="mt-10 flex items-center justify-center md:justify-start gap-x-6">
              <Button
                className="bg-blue-600 text-white"
                variant="shadow"
                onClick={handleCourse}
                isLoading={isLoading}
              >
                {buttonTitel}
              </Button>
              <Link
                href={`${lng}/compiler/csharp`}
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
            <Compiler
              code={code}
              isDarkMode={true}
              onChange={setCode}
              lng={lng}
            />
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default CompilerSection;
