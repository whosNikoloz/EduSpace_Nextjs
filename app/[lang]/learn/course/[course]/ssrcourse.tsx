"use client";

import React, { useState, useEffect } from "react";

import CoursesAPI from "@/app/api/Learn/Course";
import { useUser } from "@/app/dbcontext/UserdbContext";
import ProgressAPI from "@/app/api/Learn/Progress";
import { Hero } from "@/components/Learn/Hero";
import Subject from "@/components/Learn/subject";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Card,
  CardBody,
} from "@nextui-org/react";
import Link from "next/link";
import { Locale } from "@/i18n.config";
import { useQuery } from "react-query";
import CourseHeroSkeleton from "@/components/Learn/cousreheroskeleton";
import SubjectSkeleton from "@/components/Learn/subjectSkeleton";
import { Certification } from "@/components/icons";
import { useRouter } from "next/navigation";

interface Course {
  courseId: number;
  courseName: string;
  subjects: any;
  description: string;
  courseLogo: string;
  formattedCourseName: string;
  levelId: number;
}
interface UserProgress {
  progressId: number;
  subjectId: number;
  lessonId: number;
  complete: boolean;
}

export default function SSRCourse({
  params: { lang, course },
}: {
  params: { lang: Locale; course: string };
}) {
  const { user } = useUser();
  const [courses, setCourses] = useState<Course | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Function to fetch the user progress
  const fetchUserProgress = async (courseId: number, userId: number) => {
    return await ProgressAPI().GetProgress(
      { userid: userId },
      { courseid: courseId }
    );
  };

  const {
    data: courseData,
    isLoading: isCourseLoading,
    error: courseError,
  } = useQuery(
    ["fetchCourse", course],
    () => CoursesAPI().GetCourse(course, lang),
    {
      refetchInterval: 30000, // Refetch the data every 30 seconds
      onSuccess: (data) => {
        if (user) {
          fetchUserProgress(data.courseId, user.userId);
        }
      },
    }
  );

  const {
    data: userProgress,
    isLoading: isUserProgressLoading,
    error: userProgressError,
  } = useQuery(
    ["fetchUserProgress", user],
    () => {
      if (courseData && user) {
        return ProgressAPI().GetProgress(
          { userid: user.userId },
          { courseid: courseData.courseId }
        );
      }
    },
    {
      enabled: !!courseData && !!user,
      refetchInterval: 30000, // Refetch the data every 30 seconds
    }
  );

  useEffect(() => {
    if (courseData) {
      setCourses(courseData);
      setProgress(userProgress);
    }
    if (!user && (!userProgress || userProgress === null)) {
      const timeoutId = setTimeout(() => {
        onOpen();
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [user, userProgress, courseData, onOpen]);

  const router = useRouter();

  const handelAuthNeeded = () => {
    sessionStorage.setItem(
      "redirect_url",
      `/${lang}/learn/course/${courses?.formattedCourseName}`
    );
    router.push(`/${lang}/user/auth`);
  };

  if (isCourseLoading || !courses) {
    return (
      <>
        <div className="flex flex-col items-center justify-center  dark:bg-pattern-dark bg-pattern-white text-white">
          <CourseHeroSkeleton />
          <SubjectSkeleton />
          <div className="mt-14 mb-2 w-full items-center flex justify-center  mx-auto">
            <Card
              isBlurred
              className="border-none  bg-white dark:bg-gray-800  w-80 md:max-w-[610px] md:w-full justify-center items-center "
              shadow="sm"
            >
              <CardBody>
                <div className="flex flex-col items-center text-center text-sm">
                  <Certification size={100} height={0} width={0} />
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
                    className="bg-blue-600  text-white text-sm"
                    color="primary"
                    variant="ghost"
                    isDisabled
                  >
                    {lang == "ka"
                      ? "სერთიფიკატის მიღება"
                      : "Claim Certifiaction"}
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        {courses && (
          <div className="flex flex-col items-center justify-center  dark:bg-pattern-dark bg-pattern-white text-white py-4">
            <Hero
              logo={courses.courseLogo}
              courseName={courses.courseName}
              description={courses.description}
            />
            <Subject courseData={courses} userProgress={progress} lang={lang} />
          </div>
        )}
        <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">!</ModalHeader>
                <ModalBody>
                  <p>
                    {lang == "en"
                      ? "Authorization is required to begin"
                      : "დასაწყებად აუცილებელია ავტორიზაცია"}
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    onPress={onClose}
                    onClick={() => handelAuthNeeded()}
                  >
                    {lang == "ka" ? "შესვლა" : "Log In"}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
}
