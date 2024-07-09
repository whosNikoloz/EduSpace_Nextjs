"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import Link from "next/link";

import {
  Locked,
  IconCheck,
  Run,
  Quiz,
  Certification,
} from "@/components/icons";
import { Reveal } from "../RevealFramer";
import { Card, CardBody } from "@nextui-org/react";

const Subject = ({ courseData, userProgress, lang }) => {
  return (
    <div className="space-y-3 mt-5 overflow-hidden">
      {courseData.subjects.map((subject, index) => (
        <SubjectItem
          key={index}
          subject={subject}
          progress={userProgress}
          formattedCourseName={courseData.formattedCourseName}
          courseId={courseData.courseId}
          lang={lang}
        />
      ))}
    </div>
  );
};

const SubjectItem = ({
  subject,
  progress,
  formattedCourseName,
  courseId,
  lang,
}) => {
  const [containerVisible, setContainerVisible] = useState(true);

  const handleToggleContainer = () => {
    setContainerVisible(!containerVisible);
  };

  return (
    <div className="py-2">
      <h4
        className={`cursor-pointer pb-5 flex items-center justify-between text-lg dark:text-white text-black  font-medium ${
          progress?.subjectId === subject.subjectId ? "text-blue-600" : ""
        }`}
        onClick={handleToggleContainer}
      >
        <div className="flex items-center gap-2">
          {progress?.subjectId > subject.subjectId || progress?.complete ? (
            <IconCheck height={25} width={25} />
          ) : progress?.subjectId === subject.subjectId ? (
            <Run height={25} width={25} />
          ) : (
            <Locked height={25} width={25} />
          )}
          {subject.subjectName}
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 dark:text-white text-black ml-2 transform transition-transform ${
            containerVisible ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </h4>
      <div
        className={`transition-all duration-300 ease-in-out ${
          containerVisible ? "max-h-96" : "max-h-0 overflow-hidden"
        }`}
      >
        {subject.lessons.map((lesson, lessonIndex) => {
          const isCompletedLesson =
            progress?.lessonId > lesson.lessonId || progress?.complete;
          const isCurrentLesson = progress?.lessonId === lesson.lessonId;
          const isLockedLesson = !isCompletedLesson && !isCurrentLesson;
          return (
            <Reveal
              key={lessonIndex}
              direction="down"
              once={true}
              duration={0.5}
              delay={lessonIndex * 0.1}
            >
              <div
                className={`px-5 py-4 bg-white dark:bg-gray-800 shadow justify-between rounded-lg mb-4 ${
                  isCompletedLesson
                    ? "bg-green-100"
                    : isLockedLesson
                    ? "dark:bg-gray-900"
                    : ""
                }`}
              >
                {isCompletedLesson ? (
                  <div>
                    <div className="flex flex-row justify-between dark:text-white text-black">
                      <div className="flex flex-row items-center gap-4">
                        <Quiz size={25} />
                        <div className="flex flex-col gap-1">
                          <p className="text-slate-400 text-[8px] lg-text-[10px]">
                            {lang == "ka" ? "გაკვეთილი" : "Lesson"}
                          </p>
                          <p className="dark:text-white text-black sm:text-lg lg:text-xl">
                            {lesson.lessonName}
                          </p>
                        </div>
                      </div>
                      <IconCheck size={25} />
                    </div>
                  </div>
                ) : isCurrentLesson ? (
                  <div>
                    <div className="flex flex-row justify-between dark:text-white text-black">
                      <div className="flex flex-row items-center gap-4">
                        <Quiz size={25} />
                        <div className="flex flex-col gap-1">
                          <p className="text-slate-400 text-[8px] lg-text-[10px]">
                            {lang == "ka" ? "გაკვეთილი" : "Lesson"}
                          </p>
                          <p className="dark:text-white text-black sm:text-lg lg:text-xl">
                            {lesson.lessonName}
                          </p>
                          <div className="rounded-2xl font-medium border lg:w-12 lg:h-6 w-10 h-5 flex items-center justify-center">
                            <p className="text-slate-400 text-[8px] lg-text-[10px]">
                              XP + 10
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Link
                      href={{
                        pathname: `/${lang}/learn/course/${formattedCourseName}/lesson`,
                        query: {
                          lessonId: lesson.lessonId,
                          lesson: lesson.lessonName,
                          subject: subject.subjectId,
                          course: courseId,
                        },
                      }}
                    >
                      <Button
                        className="bg-blue-600 w-full text-white mt-4"
                        color="primary"
                        variant="ghost"
                        size="large"
                      >
                        {lang == "ka" ? "სწავალა" : "Learn"}
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-row justify-between dark:text-white text-black">
                    <div className="flex flex-row items-center gap-4">
                      <Quiz size={25} />
                      <div className="flex flex-col gap-1">
                        <p className="text-slate-600 text-[8px] lg-text-[10px]">
                          {lang == "ka" ? "გაკვეთილი" : "Lesson"}
                        </p>
                        <p className="text-slate-600 sm:text-lg lg:text-xl">
                          {lesson.lessonName}
                        </p>
                        <div className="rounded-2xl font-medium border lg:w-12 lg:h-6 w-10 h-5 flex items-center justify-center">
                          <p className="text-slate-400 text-[8px] lg-text-[10px]">
                            XP + 10
                          </p>
                        </div>
                      </div>
                    </div>
                    <Locked size={25} />
                  </div>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
      <hr className={` ${containerVisible ? "hidden" : "dark:bg-gray-900"}`} />
    </div>
  );
};

const SubjectComponent = ({ courseData, userProgress, lang }) => {
  return (
    <section className="leading-relaxed w-full max-w-screen-xl  mx-auto px-4 md-px-8">
      <div className="mt-14 w-full max-w-2xl mx-auto">
        <Subject
          courseData={courseData}
          userProgress={userProgress}
          lang={lang}
        />
      </div>
      <div className="mt-14 w-full max-w-2xl mx-auto">
        <Card
          isBlurred
          className="border-none  bg-background/60 dark:bg-default-100/50 max-w-[680px] justify-center items-center "
          shadow="sm"
        >
          <CardBody>
            <div className="flex flex-col items-center">
              <Certification size={100} />
              <h1 className="dark:text-white text-black mt-4">
                {lang == "en"
                  ? "Your certificate is close"
                  : "თქვენი სერთიფიკატი ახლოს არის"}
              </h1>
              <p className="dark:text-white text-black mt-3 mb-4">
                {lang == "en"
                  ? "You are doing great! Keep learning to unlock your certificate!"
                  : "მშვენივრად აკეთებ! განაგრძეთ სწავლა თქვენი სერტიფიკატის აღებისთვის!"}
              </p>
              <Button
                className="bg-blue-600 w-1/2 text-white"
                color="primary"
                variant="ghost"
                size="large"
                isDisabled={!userProgress?.complete}
              >
                {lang == "ka" ? "სერთიფიკატის მიღება" : "Claim Certifiaction"}
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  );
};

export default SubjectComponent;
