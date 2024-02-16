"use client";

import React, { useState, useEffect } from "react";
import CoursesAPI from "@/app/api/Learn/Course";
import { useUser } from "@/app/dbcontext/UserdbContext";
import ProgressAPI from "@/app/api/Learn/Progress";
import MainLayout from "@/app/[lang]/layouts/Mainlayout";
import { Hero } from "@/components/Learn/Hero";
import Subject from "@/components/Learn/subject";
import { Locale } from "@/i18n.config";

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

export default function CplusAdvancedPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { user } = useUser();
  const [course, setCourse] = useState<Course | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);

  // Combine the two useEffects into one
  useEffect(() => {
    const fetchCourseAndProgress = async () => {
      if (!user) return;

      try {
        const courseResponse = await CoursesAPI().GetCourse("c-plus-expert");
        setCourse(courseResponse);

        const userProgress = await ProgressAPI().GetProgress(
          { userid: user.userId },
          { courseid: courseResponse.courseId }
        );
        setProgress(userProgress);
      } catch (error) {
        console.error("Error fetching course or user progress:", error);
      }
    };

    fetchCourseAndProgress(); // Fetch course and user progress instantly

    const intervalId = setInterval(fetchCourseAndProgress, 30000); // Then fetch course and user progress every 30 seconds

    return () => clearInterval(intervalId); // Clean up on unmount or when dependencies change
  }, [user]); // Fetch course and user progress when user changes

  return (
    <MainLayout lang={lang}>
      {course && (
        <div className="flex flex-col items-center justify-center ">
          <Hero
            logo={course.courseLogo}
            courseName={course.courseName}
            description={course.description}
          />
          <Subject courseData={course} userProgress={progress} />
        </div>
      )}
    </MainLayout>
  );
}
