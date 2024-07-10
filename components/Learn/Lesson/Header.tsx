import React from "react";
import { Progress } from "@nextui-org/react";
import Link from "next/link";
import { Arrow } from "@/components/icons";

interface HeaderProps {
  LessonName: string;
  progress: number;
  formatedCourse: string;
}

export const Header: React.FC<HeaderProps> = ({
  LessonName,
  progress,
  formatedCourse,
}) => {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center flex-shrink-0">
        <div className="flex flex-row gap-2">
          <Link
            href={`/learn/course/${formatedCourse}`}
            className="text-sm mb-2 md:mb-0"
          >
            <Arrow size={24} height={24} width={24} />
          </Link>
          {LessonName}
        </div>
        <Progress
          value={progress}
          size="sm"
          className=" w-full md:w-1/2 mx-auto mt-2"
        />
      </div>
    </>
  );
};
