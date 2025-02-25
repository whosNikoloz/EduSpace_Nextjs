"use client";

import CodeEditor from "@uiw/react-textarea-code-editor";
import React, { useState, useEffect } from "react";
import { Answers } from "./Answers";
import { ScrollShadow } from "@nextui-org/react";

interface LearnMaterialDataProps {
  learnMaterialData: LearnMaterialData;
}
interface Answer {
  answerId: number;
  option: string;
  isCorrect: boolean;
  testId: number;
}

interface Test {
  testId: number;
  instruction: string;
  question: string;
  code: string | null;
  hint: string;
  learnId: number;
  answers: Answer[];
}

interface Video {
  videoId: number;
  videoUrl: string | null; // Assuming the video URL can be null
  videoName: string | null; // Assuming the video name can be null
  description: string | null; // Assuming the description can be null
}

interface LearnMaterialData {
  learnId: number;
  learnName: string;
  content: string;
  code: string | null;
  videoId: number;
  video: Video | null;
  testId: number;
  test: Test;
  lessonId: number;
}

interface LearnMaterialDataProps {
  learnMaterialData: LearnMaterialData; // Correctly define the prop
  contentType: string;
  onAnswerSelected: (isAnswerSelected: string) => void;
  onCorrectAnswer: (isAnswerCorrect: boolean) => void;
  onTryAgain: number;
}

export const Content: React.FC<LearnMaterialDataProps> = ({
  learnMaterialData,
  contentType,
  onAnswerSelected,
  onCorrectAnswer,
  onTryAgain,
}) => {
  const handleAnswerSelected = (answer: string) => {
    onAnswerSelected(answer);
  };

  const handleIsCorrect = (isCorrect: boolean) => {
    onCorrectAnswer(isCorrect);
  };

  const [shuffledAnswers, setShuffledAnswers] = useState(
    learnMaterialData.test.answers
  );

  const shuffleArray = (array: any[]) => {
    let copy = [...array]; // Create a copy of the array
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  useEffect(() => {
    setShuffledAnswers(shuffleArray(learnMaterialData.test.answers));
    onAnswerSelected("");
    onCorrectAnswer(false);
  }, [
    onTryAgain,
    learnMaterialData.test.answers,
    onAnswerSelected,
    onCorrectAnswer,
  ]);

  return (
    <ScrollShadow
      hideScrollBar
      className="max-h-[calc(100vh-220px)] h-[calc(100vh-220px)] "
    >
      <div className="flex justify-center items-center mt-10">
        <div className="grid px-6 items-center w-full lg:w-2/3 overflow-auto">
          <div className="mt-4">
            {contentType === "learn" && (
              <>
                <h1 className="font-bold text-2xl pb-4">
                  {learnMaterialData.learnName}
                </h1>
                <p className="font-semibold text-md">
                  {learnMaterialData.content}
                </p>
              </>
            )}
          </div>
          {contentType === "learn" && learnMaterialData.code && (
            <>
              <CodeEditor
                value={learnMaterialData.code}
                language="cpp"
                placeholder="Please enter JS code."
                className="rounded-md mt-4"
                padding={15}
                style={{
                  fontSize: 12,
                  backgroundColor: "#161B22",
                  fontFamily:
                    "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                }}
                readOnly
              />
            </>
          )}
          {contentType === "learn" && learnMaterialData.video && (
            <video></video>
          )}
          <div className="mt-4">
            {contentType === "test" && (
              <>
                <p className="font-bold text-xl">
                  {learnMaterialData.test.question}
                </p>
                {learnMaterialData.test.code && (
                  <>
                    <CodeEditor
                      value={learnMaterialData.test.code}
                      language="cpp"
                      placeholder="Please enter JS code."
                      className="rounded-md mt-4"
                      padding={15}
                      style={{
                        fontSize: 12,
                        backgroundColor: "#161B22",
                        fontFamily:
                          "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                      }}
                      readOnly
                    />
                  </>
                )}
              </>
            )}
          </div>

          {contentType === "test" && (
            <Answers
              answers={shuffledAnswers}
              onAnswerSelected={handleAnswerSelected}
              IsCorrect={handleIsCorrect}
              onTryAgain={onTryAgain}
            />
          )}
        </div>
      </div>
    </ScrollShadow>
  );
};
