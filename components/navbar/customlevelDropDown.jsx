import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { ChevronDown, Python, Cpp, Csharp } from "@/components/icons";

const icons = {
  chevron: (
    <ChevronDown
      fill="currentColor"
      size={16}
      height={undefined}
      width={undefined}
    />
  ),
  Beginner: <Csharp height={30} width={30} />,
  advanced: <Cpp height={30} width={30} />,
  intermediate: <Python height={30} width={30} />,
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
  ge: [
    {
      key: "beg",
      description: "დამწყებებისათვის საუკეთესო, შესავალი პროგრამირებაში",
      startContent: icons.Beginner,
      textValue: "Beginner",
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
      textValue: "Advanced",
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
      textValue: "Expert",
      courses: [
        { text: "C# ექსპერტი", link: "/learn/course/c-sharp-beginner" },
        { text: "Python ექსპერტი", link: "/learn/course/python-beginner" },
        { text: "C++ ექსპერტი", link: "/learn/course/c-plus-beginner" },
        { text: "Swift ექსპერტი", link: "/learn/course/swift-beginner" },
      ],
    },
  ],
};

function MultiLevelDropdown({ isScrolled, lng }) {
  const lngdropdownItems = dropdownItems[lng ? lng : "ge"];

  return (
    <Dropdown closeOnSelect={false} backdrop="blur">
      <DropdownTrigger>
        <Button
          disableRipple
          className={`p-0 bg-transparent data-[hover=true]:bg-transparent  ${
            isScrolled
              ? "dark:text-white text-black"
              : "dark:text-white text-white"
          }`}
          endContent={icons.chevron}
          radius="sm"
          variant="light"
        >
          {lng === "en" ? "Courses" : "კურსები"}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="ACME features"
        className="w-[340px]"
        itemClasses={{
          base: "gap-4",
        }}
      >
        {lngdropdownItems.map((item) => (
          <DropdownItem
            key={item.key}
            description={item.description}
            startContent={item.startContent}
            textValue={item.textValue}
          >
            <Dropdown>
              <DropdownTrigger>
                <Button
                  size="sm"
                  disableRipple
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                  endContent={icons.chevron}
                  radius="sm"
                  variant="light"
                >
                  {item.textValue}
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Dynamic Actions">
                {item.courses.map((course) => (
                  <DropdownItem
                    key={course.text}
                    color="default"
                    onClick={() => {
                      window.location.href = course.link;
                    }}
                    textValue={course.text}
                  >
                    {course.text}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}

export default MultiLevelDropdown;
