"use client";

import MainLayout from "@/app/layouts/Mainlayout";
import React, { useState, useEffect } from "react";
import { CustomTitle } from "@/components/CustomTitle";
import { Hero } from "@/components/Learn/Hero";
import CoursesAPI from "@/app/api/Learn/Course";
import Subject from "@/components/Learn/subject";

interface Course {
  courseId: number;
  courseName: string;
  subjects: any;
  description: string;
  courseLogo: string;
  formattedCourseName: string;
  levelId: number;
}

export default function CplusAdvancedPage() {
  const courses = CoursesAPI();
  const [course, setCourse] = useState<Course | null>(null);
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await courses.GetCourse("c-plus-advanced");
        setCourse(response); // Assuming the API response is an array of Course objects
        console.log(response.subjects);
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
            <Subject courseData={course} />
          </div>
        </>
      )}
    </MainLayout>
  );
}
