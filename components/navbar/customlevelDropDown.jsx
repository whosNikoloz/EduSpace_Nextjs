"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { ChevronDown, Python, Cpp, Csharp } from "@/components/icons";
import { motion } from "framer-motion";
import Link from "next/link";

const icons = {
  chevron: (
    <ChevronDown
      fill="currentColor"
      size={16}
      height={undefined}
      width={undefined}
    />
  ),
  Beginner: <Csharp height={25} width={25} />,
  advanced: <Cpp height={25} width={25} />,
  intermediate: <Python height={25} width={25} />,
};

const dropdownItems = {
  en: [
    {
      key: "beg",
      description: "The best introduction to programming for beginners",
      startContent: icons.Beginner,
      textValue: "Beginner",
      courses: [
        { text: "C# Beginner", link: "/learn/course/c-sharp-beginner" },
        { text: "Python Beginner", link: "/learn/course/python-beginner" },
        { text: "C++ Beginner", link: "/learn/course/c-plus-beginner" },
        { text: "Swift Beginner", link: "/learn/course/swift-beginner" },
      ],
    },
    {
      key: "adv",
      description: "Test yourself and develop yourself",
      startContent: icons.advanced,
      textValue: "Advanced",
      courses: [
        { text: "C# Advanced", link: "/learn/course/c-sharp-beginner" },
        { text: "Python Advanced", link: "/learn/course/python-beginner" },
        { text: "C++ Advanced", link: "/learn/course/c-plus-beginner" },
        { text: "Swift Advanced", link: "/learn/course/swift-beginner" },
      ],
    },
    {
      key: "exp",
      description: "Become the best in programming",
      startContent: icons.intermediate,
      textValue: "Expert",
      courses: [
        { text: "C# Expert", link: "/learn/course/c-sharp-beginner" },
        {
          text: "Python Expert",
          link: "/learn/course/python-beginner",
        },
        { text: "C++ Expert", link: "/learn/course/c-plus-beginner" },
        { text: "Swift Expert", link: "/learn/course/swift-beginner" },
      ],
    },
  ],
  ka: [
    {
      key: "beg",
      description: "დამწყებებისათვის საუკეთესო, შესავალი პროგრამირებაში",
      startContent: icons.Beginner,
      textValue: "შესავალი",
      courses: [
        { text: "C# შესავალი", link: "/learn/course/c-sharp-beginner" },
        { text: "Python შესავალი", link: "/learn/course/python-beginner" },
        { text: "C++ შესავალი", link: "/learn/course/c-plus-beginner" },
        { text: "Swift შესავალი", link: "/learn/course/swift-beginner" },
      ],
    },
    {
      key: "adv",
      description: "გამოცადე შენი თავი და განავითარე თავი",
      startContent: icons.advanced,
      textValue: "მოწინავე",
      courses: [
        { text: "C# მოწინავე", link: "/learn/course/c-sharp-beginner" },
        { text: "Python მოწინავე", link: "/learn/course/python-beginner" },
        { text: "C++ მოწინავე", link: "/learn/course/c-plus-beginner" },
        { text: "Swift მოწინავე", link: "/learn/course/swift-beginner" },
      ],
    },
    {
      key: "exp",
      description: "გახდი საუკეთესო პროგრამირებში",
      startContent: icons.intermediate,
      textValue: "ექსპერტი",
      courses: [
        { text: "C# ექსპერტი", link: "/learn/course/c-sharp-beginner" },
        { text: "Python ექსპერტი", link: "/learn/course/python-beginner" },
        { text: "C++ ექსპერტი", link: "/learn/course/c-plus-beginner" },
        { text: "Swift ექსპერტი", link: "/learn/course/swift-beginner" },
      ],
    },
  ],
};

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

function MultiLevelDropdown({ isScrolled, lng }) {
  const lngdropdownItems = dropdownItems[lng ? lng : "ka"];

  const [isActive, setIsActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        isActive &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsActive(false);
        setActiveIndex(null);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isActive]);

  const handleMouseEnter = (index) => {
    setIsActive(true);
    setActiveIndex(index);
  };

  return (
    <div
      ref={dropdownRef}
      onMouseEnter={() => handleMouseEnter(activeIndex)}
      className="inline-block relative"
    >
      <span
        className={` font-semibold py-2 px-4 rounded inline-flex transition-colors items-center ${
          isScrolled ? "dark:text-white text-black" : "text-white"
        }`}
      >
        <span className="cursor-pointer">
          {lng === "en" ? "Courses" : "კურსები"}
        </span>
      </span>
      {isActive && (
        <motion.ul
          initial={{ opacity: 0, scale: 0.85, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
          className="absolute text-sm  bg-white p-2 mt-3 dark:bg-black backdrop-blur-sm rounded-2xl border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
        >
          {lngdropdownItems.map((item, index) => (
            <li key={index} onMouseEnter={() => handleMouseEnter(index)}>
              <Button
                className="rounded-t cursor-pointer bg-transparent py-2 px-4  whitespace-no-wrap"
                startContent={item.startContent}
              >
                {item.textValue}
              </Button>
              {activeIndex === index && (
                <motion.ul
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={transition}
                  className="absolute ml-36 -mt-10 text-sm bg-white dark:bg-black backdrop-blur-sm rounded-2xl border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
                >
                  {item.courses.map((course, subIndex) => (
                    <li key={subIndex}>
                      <Link href={course.link}>
                        <Button
                          className="py-2 bg-transparent  mx-auto text-center w-[150px]  whitespace-no-wrap"
                          href="#"
                        >
                          {course.text}
                        </Button>
                      </Link>
                    </li>
                  ))}
                </motion.ul>
              )}
            </li>
          ))}
        </motion.ul>
      )}
    </div>
  );
}

export default MultiLevelDropdown;
