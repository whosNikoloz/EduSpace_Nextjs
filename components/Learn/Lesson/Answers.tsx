"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import toast from "react-hot-toast";

interface Answer {
  answerId: number;
  option: string;
  isCorrect: boolean;
  testId: number;
}

interface AnswerProps {
  answers: Answer[];
  onAnswerSelected: (isAnswerSelected: string) => void;
  IsCorrect: (isAnswerSelected: boolean) => void;
  onTryAgain: number;
}

export const Answers: React.FC<AnswerProps> = ({
  answers,
  onAnswerSelected,
  IsCorrect,
  onTryAgain,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnswerClick = (index: number) => {
    if (isLoading || selectedAnswer !== null) {
      return; // Exit early if already loading or an answer is already selected
    }

    setIsLoading(true); // Set loading state when an answer is clicked
    setSelectedAnswer(index); // Set the selected answer immediately

    setTimeout(() => {
      setIsLoading(false); // Reset loading state after processing

      const isCorrect = answers[index].isCorrect;

      isCorrect ? toast.success("Correct!") : toast.error("Incorrect!");

      IsCorrect(isCorrect);
      onAnswerSelected(answers[index].option);
    }, 1000); // Simulate processing time
  };

  useEffect(() => {
    setSelectedAnswer(null); // Reset selected answer on try again
  }, [onTryAgain]);

  return (
    <div className="gap-3 flex flex-col justify-center items-center mt-20 lg:mt-40">
      {answers.map((answer, index) => (
        <div key={answer.answerId} className="mb-2 lg:mb-0">
          <Button
            color={
              selectedAnswer === index
                ? isLoading
                  ? "primary"
                  : answer.isCorrect
                  ? "success"
                  : "danger"
                : "primary"
            } // Change color based on the correctness of the selected answer and loading state
            size="lg"
            variant="shadow"
            isLoading={isLoading && selectedAnswer === index}
            onClick={() => handleAnswerClick(index)}
            className="rounded-md w-full font-bold"
          >
            <span className="text-xs md:text-[16px]">{answer.option}</span>
          </Button>
        </div>
      ))}
    </div>
  );
};
