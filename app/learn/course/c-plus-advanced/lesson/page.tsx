"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@/app/context/UserdbContext";
import { Button } from "@nextui-org/react";
import { Header } from "@/components/Learn/Lesson/Header";

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

export default function CplusAdvancedLessonPage() {
  const { user } = useUser();
  const [course, setCourse] = useState<LearnMaterial | null>(null);

  return (
    <>
      <Header LessonName={"x  გაკვეთილის სახელი"} />
    </>
  );
}
