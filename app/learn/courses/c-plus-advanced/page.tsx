"use client";

import MainLayout from "@/app/layouts/Mainlayout";
import React, { useState, useEffect } from "react";
import { CustomTitle } from "@/components/CustomTitle";
import { Hero } from "@/components/Learn/Hero";
import CoursesAPI from "@/app/api/Learn/Course";
import Subject from "@/components/Learn/Subject";

interface Course {
  courseId: number;
  courseName: string;
  description: string;
  courseLogo: string;
  formattedCourseName: string;
  levelId: number;
}

export default function CplusAdvancedPage() {
  const containers = ["Container 1", "Container 2", "Container 3"];
  const courses = CoursesAPI();
  const [course, setCourse] = useState<Course | null>(null);
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await courses.GetCourse("c-plus-advanced");
        setCourse(response); // Assuming the API response is an array of Course objects
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourse();
  }, []);
  return (
    <MainLayout>
      {course && (
        <>
          <div className="flex flex-col items-center justify-center ">
            <Hero
              logo={course.courseLogo}
              courseName={course.courseName}
              description={course.description}
            />
            <Subject />
          </div>
        </>
      )}
    </MainLayout>
  );
}
