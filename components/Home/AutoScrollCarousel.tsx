/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import Splide from "@splidejs/splide";
import "@splidejs/react-splide/css/core";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import { isMobile } from "react-device-detect";
import Courses from "@/app/api/Learn/Course";
import { useUser } from "@/app/dbcontext/UserdbContext";
import { Reveal } from "../RevealFramer";
import { Card, CardFooter, CardBody } from "@nextui-org/react";
import TypingEffect from "@/components/typedtext";
import { useRouter } from "next/navigation";

interface Course {
  courseId: number;
  courseName: string;
  description: string;
  courseLogo: string;
  formattedCourseName: string;
  levelId: number;
}

const AutoScrollCarousel = ({ lng }: { lng: string }) => {
  const [courses, setCourses] = useState<Course[]>([]);

  const { user } = useUser();

  const router = useRouter();

  const handleCourse = (FormatedName: string) => {
    if (user) {
      router.push(`/learn/course/${FormatedName}`);
    } else {
      sessionStorage.setItem(
        "redirect_url",
        `/${lng}/learn/course/${FormatedName}`
      );
      router.push("/user/auth");
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
    const perPage = isMobile ? 3 : 6; // Adjust perPage based on the device type.
    const gap = isMobile ? "1.5rem" : "1.5rem";

    const splide = new Splide(".splide", {
      type: "loop",
      drag: "free",
      gap: gap,
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

  const validCourses = Array.isArray(courses) ? courses : [];

  return (
    <>
      <div className="relative isolate">
        <div className="ml-5 sm:ml-20 max-w-2xl  mt-10 mb-20">
          <div className="text-left">
            <TypingEffect
              text={lng === "en" ? "Courses" : "სასწავლო კურსები"}
              options={{
                typeSpeed: 40,
                loop: false,
                showCursor: false,
              }}
              once={false}
              className="text-3xl  font-bold tracking-tight dark:text-white text-black sm:text-5xl"
            />
          </div>
        </div>
      </div>
      <div className="splide">
        <Reveal>
          <div className="splide__track">
            <ul className="splide__list">
              {validCourses.length > 0 ? (
                validCourses.map((course) => (
                  <li className="splide__slide" key={course.courseId}>
                    <div className="slide-content ">
                      <Card
                        shadow="sm"
                        isPressable
                        onPress={() => handleCourse(course.formattedCourseName)}
                        className="relative group"
                      >
                        <CardBody className="overflow-visible p-0">
                          <img
                            className="w-full h-full sm:object-cover rounded-t-lg sm:transition-all sm:duration-300 sm:ease-in-out sm:filter blur-0 sm:group-hover:blur-2xl "
                            src={course.courseLogo}
                            alt={course.courseName}
                          />
                          <div className="flex justify-center items-center h-full  sm:visible invisible absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="text-center text-sm">
                              <p className="text-white">{course.description}</p>
                            </div>
                          </div>
                        </CardBody>
                        <CardFooter className="text-small justify-between">
                          <div className="flex justify-center items-center h-full">
                            <div className="text-center">
                              <b>{course.courseName}</b>
                              <p className="text-default-500"></p>
                            </div>
                          </div>
                        </CardFooter>
                      </Card>
                    </div>
                  </li>
                ))
              ) : (
                <>
                  <li className="splide__slide">
                    <div className="slide-content">
                      <div className="max-w-xsborder  rounded-lg shadow bg-gray-800 border-gray-700">
                        <div className="flex items-center animate-pulse justify-center h-24 md:h-48 mb-4 rounded ">
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
                        <div className="p-3 animate-pulse">
                          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-48 sm:w-20 w-10 mb-4"></div>
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
    </>
  );
};

export default AutoScrollCarousel;
