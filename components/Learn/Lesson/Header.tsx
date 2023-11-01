"use client";

import React from "react";
import { Progress } from "@material-tailwind/react";
import Link from "next/link";
import { ArrowIcon } from "./ArrowIcon";

interface HeaderProps {
  LessonName: string;
  progress: number;
}

export const Header: React.FC<HeaderProps> = ({ LessonName, progress }) => {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center flex-shrink-0">
        <div className="flex flex-row gap-2">
          <Link
            href={"/learn/course/c-plus-advanced"}
            className="text-sm mb-2 md:mb-0"
          >
            <ArrowIcon size={undefined} height={undefined} width={undefined} />
          </Link>
          {LessonName}
        </div>
        <Progress
          value={progress}
          size="sm"
          color="blue"
          className="bg-white w-full md:w-1/2 mx-auto mt-2"
        />
      </div>
    </>
  );
};
