"use client";

import React, { useState, useEffect, use } from "react";
import { useUser } from "@/app/context/UserdbContext";
import { Header } from "@/components/Learn/Lesson/Header";
import { FooterLesson } from "@/components/Learn/Lesson/FooterLesson";
import { Content } from "@/components/Learn/Lesson/Content";
import LearnMaterial from "@/app/api/Learn/LearnMaterial";
import { useSearchParams } from "next/navigation";
import Styles from "@/styles/Loader.module.css";
import Image from "next/image";
import EduSpace from "@/public/EduSpaceLogo.png";
import ProgressAPI from "@/app/api/Learn/Progress";
import { useRouter } from "next/navigation";

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

export default function CplusAdvancedLessonPage({
  searchParams,
}: {
  searchParams: {
    lessonId: string;
    lesson: string;
    course: string;
    subject: string;
  };
}) {
  const router = useRouter();

  const learnAPI = LearnMaterial();
  const [learn, setLearn] = useState<LearnMaterialData[]>([]);

  const { user } = useUser();

  const progressAPI = ProgressAPI();

  const [loading, setLoading] = useState(true);

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [contentType, setContentType] = useState("learn"); // Add content type state
  const [contentFooter, setcontentFooter] = useState("first"); // Add content footer state

  const [answerSelected, setAnswerSelected] = useState(false);
  const [answerSelectedCorrect, setAnswerSelectedCorrect] = useState(false);

  const [progress, setProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  // Convert to numbers if they are non-null and valid numbers
  const lessonIdAsNumber = searchParams.lessonId
    ? parseInt(searchParams.lessonId, 10)
    : null;

  const courseIdAsNumber = searchParams.course
    ? parseInt(searchParams.course, 10)
    : null;
  const subjectIdAsNumber = searchParams.subject
    ? parseInt(searchParams.subject, 10)
    : null;

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
        if (!lessonIdAsNumber) return;
        const data = await learnAPI.LearnMaterialByLesson(lessonIdAsNumber);
        setLearn(data);

        // Calculate totalPage based on fetched learn data
        const calculatedTotalPage = Math.ceil(data.length * 2);
        setTotalPage(calculatedTotalPage);

        // Set loading to false when data is loaded
        setLoading(false);
      } catch (error) {
        console.error("Error fetching LearnMaterial data:", error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchLearnMaterial();
  }, [lessonIdAsNumber]);

  useEffect(() => {
    const updatedProgress = (currentPage / totalPage) * 100;
    setProgress(updatedProgress);
  }, [currentPage, totalPage]);

  const handleContinue = () => {
    if (contentType === "test") {
      setCurrentLessonIndex(currentLessonIndex + 1);
      setcontentFooter("learn");
      setContentType("learn");
      setAnswerSelected(false);
    } else {
      if (currentLessonIndex == learn.length - 1) {
        setcontentFooter("last");
        setContentType("test");
        setAnswerSelected(false);
      } else {
        setcontentFooter("test");
        setContentType("test");
        setAnswerSelected(false);
      }
    }
    setCurrentPage(currentPage + 1);
    const updatedProgress = ((currentPage + 2) / totalPage) * 100;
    setProgress(updatedProgress);
  };

  const handlePrev = () => {
    if (contentType == "test") {
      if (currentLessonIndex == 0) {
        setcontentFooter("first");
        setContentType("learn");
        setAnswerSelected(false);
      } else {
        setcontentFooter("learn");
        setContentType("learn");
        setAnswerSelected(false);
      }
    } else {
      setCurrentLessonIndex(currentLessonIndex - 1);
      setcontentFooter("test");
      setContentType("test");
      setAnswerSelected(false);
    }
    setCurrentPage(currentPage - 1);
  };

  const handleAnswerSelected = (
    selected: boolean | ((prevState: boolean) => boolean)
  ) => {
    setAnswerSelected(selected);
  };

  const handleFinish = () => {
    setcontentFooter("finished");
  };

  const handleOnFinished = async () => {
    try {
      const data = await progressAPI.CompleteLesson(
        user?.userId || 0,
        subjectIdAsNumber || 0,
        courseIdAsNumber || 0,
        lessonIdAsNumber || 0
      );
      router.push("/learn/course/c-plus-advanced");
    } catch (error) {
      console.error("Error fetching Progress data:", error);
    }
  };

  return (
    <>
      {contentFooter !== "finished" && ( // Check if contentFooter is not "finished"
        <div className="mx-auto max-w-7xl pt-6 px-6">
          <Header LessonName={searchParams.lesson ?? ""} progress={progress} />
        </div>
      )}
      <div className="mt-3 md:mt-11">
        {loading ? (
          <section className="flex flex-col items-center justify-center h-[calc(100vh-265px)] gap-4 py-8 md:py-10 mt-20">
            <div className={Styles.Loader}>
              <Image
                src={EduSpace}
                alt="Description of the image"
                width={100} // Specify the width of the image
                height={100}
              />
            </div>
          </section>
        ) : contentFooter === "finished" ? (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-265px)] gap-4 py-8 md:py-10 mt-20 mb-20">
            <div className={Styles.Loader}>
              <Image
                src={EduSpace}
                alt="Description of the image"
                width={100} // Specify the width of the image
                height={100}
              />
            </div>
            <p>Lesson completed!</p>
            <p>You learned Numerical Data. You’re one step </p>
            <p>closer to reaching your goal!</p>
          </div>
        ) : (
          learn.length > 0 && (
            <Content
              learnMaterialData={learn[currentLessonIndex]}
              contentType={contentType} // Pass content type as a prop
              onAnswerSelected={handleAnswerSelected}
              onCorrectAnswer={setAnswerSelectedCorrect}
            />
          )
        )}
      </div>
      <div className="mt-2 md:mt-9">
        <FooterLesson
          contentFooter={contentFooter}
          Hint={learn[currentLessonIndex]?.test?.hint}
          onContinue={handleContinue}
          answerSelected={answerSelected}
          onFinish={handleFinish}
          onFinished={handleOnFinished}
          answerSelectedCorrect={answerSelectedCorrect}
          onPrev={handlePrev}
        />
      </div>
    </>
  );
}
