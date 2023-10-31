"use client";

import React from "react";
import { Button } from "@nextui-org/react";

interface AnswerProps {
  Answer: string[];
}

export const Answers: React.FC<AnswerProps> = ({ Answer }) => {
  return (
    <>
      <div>
        <div>
          {Answer.map((Answer, index) => (
            <Button key={index}>{Answer}</Button>
          ))}
          <div className="gap-5 flex flex-row justify-center items-center mt-5">
            <Button color="primary" radius="sm">
              ans2
            </Button>
            <Button color="primary" radius="sm">
              ans3
            </Button>
            <Button color="primary" radius="sm">
              ans4
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
