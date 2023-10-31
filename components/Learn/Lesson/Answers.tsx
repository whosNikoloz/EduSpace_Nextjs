"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/react";

interface AnswerProps {
  Answer: string[];
}

export const Answers: React.FC<AnswerProps> = ({ Answer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleAnswerClick = (index: number) => {
    setSelectedAnswer(index);
    setSelectedOption(null); // Deselect any selected option
  };

  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
    setSelectedAnswer(null); // Deselect any selected answer
  };
  return (
    <>
      <div>
        <div>
          {Answer.map((answer, index) => (
            <Button
              key={index}
              color="primary"
              radius="sm"
              variant={selectedOption === index ? "shadow" : "ghost"}
              onClick={() => handleAnswerClick(index)}
            >
              {answer}
            </Button>
          ))}
          <div className="gap-5 flex flex-row justify-center items-center mt-5">
            <Button
              color="primary"
              variant={selectedOption === 2 ? "shadow" : "ghost"}
              radius="sm"
              onClick={() => handleOptionClick(2)}
            >
              ans2
            </Button>
            <Button
              variant={selectedOption === 3 ? "shadow" : "ghost"}
              color="primary"
              radius="sm"
              onClick={() => handleOptionClick(3)}
            >
              ans3
            </Button>
            <Button
              color="primary"
              variant={selectedOption === 4 ? "shadow" : "ghost"}
              radius="sm"
              onClick={() => handleOptionClick(4)}
            >
              ans4
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
