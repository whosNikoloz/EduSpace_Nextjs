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
        </div>
      </div>
    </>
  );
};
