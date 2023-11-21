"use client";

import React, { useEffect, useState } from "react";
import Splide from "@splidejs/splide";
import "@splidejs/react-splide/css/core";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import { isMobile } from "react-device-detect";
import ilustration from "@/public/ilustration2.png";
import Courses from "@/app/api/Learn/Course";
import { Skeleton } from "@nextui-org/react";
import Link from "next/link";
import { useUser } from "@/app/dbcontext/UserdbContext";
import { Reveal } from "../RevealFramer";

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

  const { user } = useUser();

  const handleCourse = (FormatedName: string) => {
    if (user) {
      window.location.href = `/learn/course/${FormatedName}`;
    } else {
      sessionStorage.setItem("redirect_url", `/learn/course/${FormatedName}`);
      window.location.href = "/user/auth";
    }
  };

  useEffect(() => {
    const courseAPI = Courses();
    const fetchCourses = async () => {
      try {
        const response = await courseAPI.GetCourses();
        setCourses(response); // Assuming the API response is an array of Course objects
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const perPage = isMobile ? 4 : 6; // Adjust perPage based on the device type.

    const splide = new Splide(".splide", {
      type: "loop",
      drag: "free",
      gap: "0.5rem",
      pauseOnHover: false,
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
      <Reveal>
        <div className="splide__track">
          <ul className="splide__list">
            {courses.length > 0 ? ( // Check if there is fetched data
              courses.map((course) => (
                <li className="splide__slide" key={course.courseId}>
                  <div className="slide-content">
                    <div className="w-12 lg:w-56 border border-gray-200 rounded-lg shadow bg-blue-600 dark:border-gray-700">
                      <button
                        onClick={() => handleCourse(course.formattedCourseName)}
                      >
                        <div className="slide-content">
                          <div className="max-w-sm  border border-gray-200 rounded-lg shadow bg-blue-600 dark:border-gray-700">
                            <img
                              className="rounded-t-lg"
                              src={course.courseLogo}
                              alt={course.courseName}
                            />
                            <div className="p-3">
                              <h5 className="mb-2 font-bold tracking-tight text-xs lg:text-base text-white">
                                {course.courseName}
                              </h5>
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <>
                <li className="splide__slide">
                  <div className="slide-content">
                    <div className="max-w-xsborder  rounded-lg shadow bg-gray-800 border-gray-700">
                      <Link href="#">
                        <div className="flex items-center animate-pulse justify-center h-24 md:h-48 mb-4 rounded dark:bg-gray-700">
                          <svg
                            className="w-10 h-10 text-gray-200 dark:text-gray-600"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 16 20"
                          >
                            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                          </svg>
                        </div>
                      </Link>
                      <div className="p-3 animate-pulse">
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-48 w-auto mb-4"></div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="splide__slide">
                  <div className="slide-content">
                    <div className="max-w-xsborder  rounded-lg shadow bg-gray-800 border-gray-700 ">
                      <Link href="#">
                        <div className="flex items-center animate-pulse justify-center h-24 md:h-48 mb-4 rounded dark:bg-gray-700">
                          <svg
                            className="w-10 h-10 text-gray-200 dark:text-gray-600"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 16 20"
                          >
                            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                          </svg>
                        </div>
                      </Link>
                      <div className="p-3 animate-pulse">
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-48 w-auto mb-4"></div>
                      </div>
                    </div>
                  </div>
                </li>
              </>
            )}
          </ul>
        </div>
      </Reveal>
    </div>
  );
};

export default AutoScrollCarousel;
