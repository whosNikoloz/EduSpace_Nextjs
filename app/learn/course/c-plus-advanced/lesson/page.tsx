"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@/app/context/UserdbContext";
import { Button } from "@nextui-org/react";
import { Header } from "@/components/Learn/Lesson/Header";
import { FooterLesson } from "@/components/Learn/Lesson/FooterLesson";
import { Content } from "@/components/Learn/Lesson/Content";
import LearnMaterial from "@/app/api/Learn/LearnMaterial";

interface LearnMaterial {
  levelId: number;
  learnIds: number[]; // List of Learn IDs
  LearnName: string;
  Description: string;
  Video: Video[]; // List of videos
  Test: Test[]; // List of tests
}

interface Video {
  VideoId: number;
  VideoUrl: string;
  VideoName: string; // Change "VideoName" to "videoName" to match the JSON structure
  Description: string;
}

interface Test {
  TestId: number;
  Question: string; // Change "Question" to "question" to match the JSON structure
  Hint: string;
  Answers: Answer[];
}

interface Answer {
  AnswerId: number;
  Option: string;
  IsCorrect: boolean;
}
interface CplusAdvancedLessonPageProps {
  lessonid: number;
}

export default function CplusAdvancedLessonPage({
  lessonid,
}: CplusAdvancedLessonPageProps) {
  const learnAPI = LearnMaterial();
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
        const data = await learnAPI.LearnMaterialByLesson(lessonid); // Assuming this function fetches data
        setCourse(data);
      } catch (error) {
        console.error("Error fetching LearnMaterial data:", error);
      }
    };

    fetchLearnMaterial();
  }, []);

  const [course, setCourse] = useState<LearnMaterial | null>(null);

  return (
    <>
      <div className="mx-auto max-w-7xl pt-6 px-6">
        <Header LessonName={"x  გაკვეთილის სახელი"} />
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
