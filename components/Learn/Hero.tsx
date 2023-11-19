"use client";
import { Image } from "@nextui-org/react";
import React from "react";

interface HeroProps {
  logo: string;
  courseName: string;
  description: string; // Correct the property name to match the interface
}

export const Hero: React.FC<HeroProps> = ({
  logo,
  courseName,
  description,
}) => {
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-2xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <Image className="object-cover  rounded-lg" src={logo} alt="" />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {courseName}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
