"use client";

import React, { useState, useEffect } from "react";

import CoursesAPI from "@/app/api/Learn/Course";
import { useUser } from "@/app/dbcontext/UserdbContext";
import ProgressAPI from "@/app/api/Learn/Progress";
import MainLayout from "@/app/layouts/Mainlayout";
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
} from "@nextui-org/react";
import Link from "next/link";

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

export default function CsharpBeginnerPage() {
  const { user } = useUser();
  const [course, setCourse] = useState<Course | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchCourseAndProgress = async () => {
      try {
        const courseResponse = await CoursesAPI().GetCourse("c-sharp-beginner");
        setCourse(courseResponse);
        if (user) {
          const userProgress = await ProgressAPI().GetProgress(
            { userid: user.userId },
            { courseid: courseResponse.courseId }
          );
          setProgress(userProgress);
        } else {
          setProgress(null);
          setTimeout(() => {
            onOpen(); // Open modal if user is not logged in
          }, 3000);
        }
      } catch (error) {
        console.error("Error fetching course or user progress:", error);
      }
    };

    const fetchData = async () => {
      await fetchCourseAndProgress();
      const intervalId = setInterval(fetchCourseAndProgress, 30000);
      return () => clearInterval(intervalId);
    };

    fetchData();

    return () => {
      setProgress(null);
    }; // Clean up course and progress on unmount
  }, [user]);

  return (
    <MainLayout>
      {course && (
        <div className="flex flex-col items-center justify-center bg-gradient-to-t dark:from-black dark:via-blue-900 dark:to-black from-white to-white via-blue-300">
          <Hero
            logo={course.courseLogo}
            courseName={course.courseName}
            description={course.description}
          />
          <Subject courseData={course} userProgress={progress} />
        </div>
      )}
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">!</ModalHeader>
              <ModalBody>
                <p>დასაწყებად აუცილებელია ავტორიზაცია</p>
              </ModalBody>
              <ModalFooter>
                <Link href="/user/auth">
                  <Button color="primary" onPress={onClose}>
                    შესვლა
                  </Button>
                </Link>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </MainLayout>
  );
}
