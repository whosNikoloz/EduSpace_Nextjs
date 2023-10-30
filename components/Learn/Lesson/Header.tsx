"use client";

import React from "react";
import { Progress } from "@material-tailwind/react";
import { Button } from "@nextui-org/react";
import Link from "next/link";

interface HeaderProps {
  LessonName: string;
}

export const Header: React.FC<HeaderProps> = ({ LessonName }) => {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center flex-shrink-0">
        <Link
          href={"/learn/course/c-plus-advanced"}
          className="text-sm mb-2 md:mb-0"
        >
          {LessonName}
        </Link>
        <Progress
          value={25}
          size="sm"
          color="blue"
          className="bg-white w-full md:w-1/2 mx-auto mt-2"
        />
      </div>
    </>
  );
};
