"use client";

import MainLayout from "@/app/layouts/Mainlayout";
import React, { useState, useEffect } from "react";
import { CustomTitle } from "@/components/CustomTitle";
import { Hero } from "@/components/Learn/Hero";
import CoursesAPI from "@/app/api/Learn/Course";

interface Course {
  courseId: number;
  courseName: string;
  description: string;
  courseLogo: string;
  formattedCourseName: string;
  levelId: number;
}

export default function PythonIntermediatePage() {
  const courses = CoursesAPI();
  const [course, setCourse] = useState<Course | null>(null);
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await courses.GetCourse("python-intermediate");
        setCourse(response); // Assuming the API response is an array of Course objects
        console.log(response);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourse();
  }, []);

  return (
    <MainLayout>
      {course && (
        <Hero
          logo={course.courseLogo}
          courseName={course.courseName}
          description={course.description}
        />
      )}
    </MainLayout>
  );
}
