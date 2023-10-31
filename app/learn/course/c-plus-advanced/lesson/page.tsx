"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@/app/context/UserdbContext";
import { Button } from "@nextui-org/react";
import { Header } from "@/components/Learn/Lesson/Header";
import { FooterLesson } from "@/components/Learn/Lesson/FooterLesson";
import { Content } from "@/components/Learn/Lesson/Content";
import LearnMaterial from "@/app/api/Learn/LearnMaterial";
import { useSearchParams } from "next/navigation";

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
  const [courses, setCourses] = useState<LearnMaterialData[]>([]);

  const searchParams = useSearchParams();

  const lessonid = searchParams.get("lessonId");
  const lessonname = searchParams.get("lessonName");
  console.log(lessonname);

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
    // Fetch LearnMaterial data here
    const fetchLearnMaterial = async () => {
      try {
        const data = await learnAPI.LearnMaterialByLesson(parseInt(lessonid!));
        setCourses(data);
      } catch (error) {
        console.error("Error fetching LearnMaterial data:", error);
      }
    };

    fetchLearnMaterial();
  }, [lessonid]);

  return (
    <>
      <div className="mx-auto max-w-7xl pt-6 px-6">
        <Header LessonName={lessonname ?? ""} />
      </div>
      <div className="mt-3 md:mt-11">
        <Content contentList={[]} />
      </div>
      <div className="mt-2 md:mt-9">
        <FooterLesson />
      </div>
    </>
  );
}
