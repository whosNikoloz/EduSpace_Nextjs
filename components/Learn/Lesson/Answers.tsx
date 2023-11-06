"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/react";

interface Answer {
  answerId: number;
  option: string;
  isCorrect: boolean;
  testId: number;
}

interface AnswerProps {
  answers: Answer[];
  onAnswerSelected: (isAnswerSelected: boolean) => void;
  IsCorrect: (isAnswerSelected: boolean) => void;
}

export const Answers: React.FC<AnswerProps> = ({
  answers,
  onAnswerSelected,
  IsCorrect,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleAnswerClick = (index: number) => {
    if (selectedAnswer !== null) {
      return;
    }
    setSelectedAnswer(index);
    onAnswerSelected(true);
    IsCorrect(answers[index].isCorrect);
  };

  return (
    <div className="gap-5 flex flex-col lg:flex-row justify-center items-center mt-20">
      {answers.map((answer, index) => (
        <div key={answer.answerId} className="mb-2 lg:mb-0">
          <Button
            color={
              selectedAnswer === index
                ? answer.isCorrect
                  ? "success"
                  : "danger"
                : "primary"
            } // Change color based on the correctness of the selected answer
            size="lg"
            variant={selectedAnswer === index ? "shadow" : "ghost"}
            onClick={() => handleAnswerClick(index)}
            className="rounded-md"
          >
            {answer.option}
          </Button>
        </div>
      ))}
    </div>
  );
};
