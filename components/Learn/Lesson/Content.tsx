"use client";

import CodeEditor from "@uiw/react-textarea-code-editor";
import React, { useState } from "react";
import { Answers } from "./Answers";

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
  onAnswerSelected: (isAnswerSelected: boolean) => void;
  onCorrectAnswer: (isAnswerCorrect: boolean) => void;
}

export const Content: React.FC<LearnMaterialDataProps> = ({
  learnMaterialData,
  contentType,
  onAnswerSelected,
  onCorrectAnswer,
}) => {
  const handleAnswerSelected = () => {
    onAnswerSelected(true);
  };

  const handleIsCorrect = (correct: any) => {
    onCorrectAnswer(correct);
  };

  return (
    <div className="flex justify-center items-center h-[calc(100vh-230px)]">
      <div className="grid px-6 items-center w-full lg:w-2/3 max-h-[calc(100vh-230px)] overflow-auto">
        <div className="mt-4">
          {contentType === "learn" && (
            <>
              <p className="content">{learnMaterialData.content}</p>
            </>
          )}
        </div>
        {contentType === "learn" && learnMaterialData.code && (
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
        )}
        {contentType === "learn" && learnMaterialData.video && <video></video>}
        <div className="mt-4">
          {contentType === "test" && (
            <p className="question">{learnMaterialData.test.question}</p>
          )}
        </div>

        {contentType === "test" && (
          <Answers
            answers={learnMaterialData.test.answers}
            onAnswerSelected={handleAnswerSelected}
            isCorrect={handleIsCorrect}
          />
        )}
      </div>
    </div>
  );
};
