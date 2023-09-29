"use client";

import React, { useEffect, useState } from "react";
import Splide from "@splidejs/splide";
import "@splidejs/react-splide/css/core";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import { isMobile } from "react-device-detect";
import ilustration from "@/public/ilustration2.png";
import Courses from "@/app/api/Learn/Course";
import Image from "next/image";

interface Course {
  courseId: number;
  courseName: string;
  description: string;
  courseLogo: string;
  formattedCourseName: string;
  levelId: number;
}

const AutoScrollCarousel = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const courseAPI = Courses();
    const fetchCourses = async () => {
      try {
        const response = await courseAPI.GetCourses();
        setCourses(response); // Assuming the API response is an array of Course objects
        console.log(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
    console.log(courses);
  }, []);

  useEffect(() => {
    const perPage = isMobile ? 2 : 4; // Adjust perPage based on the device type.

    const splide = new Splide(".splide", {
      type: "loop",
      drag: "free",
      gap: "1rem",
      focus: "center",
      perPage: perPage,
      arrows: false,
      autoScroll: {
        speed: 1,
      },
    });

    splide.mount({ AutoScroll });

    return () => {
      splide.destroy();
    };
  }, [courses]);

  return (
    <div className="splide">
      <div className="splide__track">
        <ul className="splide__list">
          {courses.length > 0 ? ( // Check if there is fetched data
            courses.map((course) => (
              <li className="splide__slide" key={course.courseId}>
                <div className="slide-content">
                  <div className="max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href={`/learn/courses/${course.formattedCourseName}`}>
                      <img
                        className="rounded-t-lg"
                        src={course.courseLogo}
                        alt={course.courseName}
                      />
                    </a>
                    <div className="p-3">
                      <a href={`/learn/courses/${course.formattedCourseName}`}>
                        <h5 className="mb-2 text-base font-bold tracking-tight text-gray-900 dark:text-white">
                          {course.courseName}
                        </h5>
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="splide__slide">
              <div className="slide-content">
                <div className="max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <a href="#">
                    <Image
                      className="rounded-t-lg"
                      src={ilustration}
                      alt="Courses"
                    />
                  </a>
                  <div className="p-3">
                    <a href="#">
                      <h5 className="mb-2 text-base font-bold tracking-tight text-gray-900 dark:text-white">
                        იტვირთება
                      </h5>
                    </a>
                  </div>
                </div>
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AutoScrollCarousel;
