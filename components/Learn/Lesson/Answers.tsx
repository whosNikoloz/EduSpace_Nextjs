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
  isCorrect: (isCorrect: boolean) => void; // Modify this prop
  onAnswerSelected: (isAnswerSelected: boolean) => void;
}

export const Answers: React.FC<AnswerProps> = ({
  answers,
  isCorrect,
  onAnswerSelected,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleAnswerClick = (index: number) => {
    setSelectedAnswer(index);
    onAnswerSelected(true);
    isCorrect(answers[index].isCorrect); // Call isCorrect with the correctness of the selected answer
  };

  return (
    <div className="gap-5 flex flex-col lg:flex-row justify-center items-center mt-20">
      {answers.map((answer, index) => (
        <div key={answer.answerId} className="mb-2 lg:mb-0">
          <Button
            color="primary"
            size="md"
            radius="sm"
            variant={selectedAnswer === index ? "shadow" : "ghost"}
            onClick={() => handleAnswerClick(index)}
          >
            {answer.option}
          </Button>
        </div>
      ))}
    </div>
  );
};
