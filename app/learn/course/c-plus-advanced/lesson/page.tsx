"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@/app/context/UserdbContext";
import { Button } from "@nextui-org/react";
import { Header } from "@/components/Learn/Lesson/Header";
import { FooterLesson } from "@/components/Learn/Lesson/FooterLesson";
import { Content } from "@/components/Learn/Lesson/Content";
import LearnMaterial from "@/app/api/Learn/LearnMaterial";
import { useSearchParams } from "next/navigation";
import { connectStorageEmulator } from "firebase/storage";
import { set } from "nprogress";

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

export default function CplusAdvancedLessonPage() {
  const learnAPI = LearnMaterial();
  const [learn, setLearn] = useState<LearnMaterialData[]>([]);

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [contentType, setContentType] = useState("learn"); // Add content type state
  const [contentFooter, setcontentFooter] = useState("first"); // Add content footer state

  const [isTestVisible, setIsTestVisible] = useState(false);

  const [answerSelected, setAnswerSelected] = useState(false);
  const [answerSelectedCorrect, setAnswerSelectedCorrect] = useState(false);

  const [testPassed, setTestPassed] = useState(answerSelectedCorrect);

  const searchParams = useSearchParams();
  const lessonid = searchParams.get("lessonId");
  const lessonname = searchParams.get("lessonName");

  useEffect(() => {
    const beforeUnloadHandler = (e: {
      preventDefault: () => void;
      returnValue: string;
    }) => {
      e.preventDefault();
      e.returnValue = "";
      const confirmationMessage =
        "Are you sure you want to leave this page? Your changes may not be saved.";
      (e || window.event).returnValue = confirmationMessage;
      return confirmationMessage;
    };

    window.addEventListener("beforeunload", beforeUnloadHandler);

    return () => {
      window.removeEventListener("beforeunload", beforeUnloadHandler);
    };
  }, []);

  useEffect(() => {
    setTestPassed(answerSelectedCorrect);
  }, [answerSelectedCorrect]);

  useEffect(() => {
    // Fetch LearnMaterial data here
    const fetchLearnMaterial = async () => {
      try {
        const data = await learnAPI.LearnMaterialByLesson(1);
        setLearn(data);
      } catch (error) {
        console.error("Error fetching LearnMaterial data:", error);
      }
    };

    fetchLearnMaterial();
  }, [lessonid]);

  const handleContinue = () => {
    if (isTestVisible) {
      if (testPassed && currentLessonIndex < learn.length - 1) {
        setCurrentLessonIndex(currentLessonIndex + 1);
        setcontentFooter(
          currentLessonIndex === learn.length - 2 ? "last" : "learn"
        );
      } else {
        setIsTestVisible(false);
        setTestPassed(false);
        setcontentFooter("learn");
        setContentType("learn");
      }
    } else {
      setIsTestVisible(true);
      setContentType("test");
      setcontentFooter("test");
    }
  };

  const handlePrev = () => {
    if (currentLessonIndex > 0) {
      if (isTestVisible) {
        setIsTestVisible(false);
        setContentType("learn");
        setcontentFooter("learn");
      } else {
        setCurrentLessonIndex(currentLessonIndex - 1);
        setContentType("test");
        setcontentFooter("test");
      }
    }
  };

  const handleAnswerSelected = (
    selected: boolean | ((prevState: boolean) => boolean)
  ) => {
    setAnswerSelected(selected);
  };

  const handleFinish = () => {
    // Redirect to a congratulations page
  };

  return (
    <>
      <div className="mx-auto max-w-7xl pt-6 px-6">
        <Header LessonName={lessonname ?? ""} progress={50} />
      </div>
      <div className="mt-3 md:mt-11">
        {learn.length > 0 && (
          <Content
            learnMaterialData={learn[currentLessonIndex]}
            contentType={contentType} // Pass content type as a prop
            onAnswerSelected={handleAnswerSelected}
            onCorrectAnswer={setAnswerSelectedCorrect}
          />
        )}
      </div>
      <div className="mt-2 md:mt-9">
        <FooterLesson
          contentFooter={contentFooter}
          onContinue={handleContinue}
          answerSelected={answerSelected}
          answerSelectedCorrect={answerSelectedCorrect}
          onPrev={handlePrev}
        />
      </div>
    </>
  );
}
