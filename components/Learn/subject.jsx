"use client";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { CertificationIcon } from "../Learn/CertificationIcon";

const Subject = ({ subjectList, idx }) => {
  const [containerVisible, setContainerVisible] = useState(false);

  const handleToggleContainer = () => {
    setContainerVisible(!containerVisible);
  };

  return (
    <div className="space-y-3 mt-5 overflow-hidden">
      <h4
        className="cursor-pointer pb-5 flex items-center justify-between text-lg text-white font-medium"
        onClick={handleToggleContainer}
      >
        {subjectList.q}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 text-white ml-2 transform transition-transform ${
            containerVisible ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </h4>
      <div
        className="duration-300"
        style={
          containerVisible
            ? { height: "auto" }
            : { height: "0px", overflow: "hidden" }
        }
      >
        {subjectList.containers.map((container, index) => (
          <div
            key={index}
            className="px-5 py-4 bg-white dark:bg-gray-800 shadow justif rounded-lg mb-4"
          >
            <p className="text-white">{container}</p>
            <Button>Learn</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default () => {
  const subjectList = [
    {
      q: "What are some random questions to ask?",
      containers: ["1", "2"],
    },
    {
      q: "Do you include common questions?",
      containers: ["2", "2"],
    },
    {
      q: "Subject",
      containers: ["2", "2"],
    },
    {
      q: "Subject",
      containers: ["2", "2"],
    },
    // Add more questions with containers
  ];

  return (
    <section className="leading-relaxed w-full max-w-screen-xl mt-12 mx-auto px-4 md:px-8">
      <div className="mt-14 w-full max-w-2xl mx-auto">
        {subjectList.map((item, idx) => (
          <Subject key={idx} idx={idx} subjectList={item} />
        ))}
      </div>
      <div className="mt-14 w-full max-w-2xl mx-auto">
        <div className="px-5 py-4 bg-white gap-4 dark:bg-gray-800 shadow justify-center items-center rounded-lg mb-4 text-center flex space-y-4">
          <div className="flex flex-col items-center">
            <CertificationIcon size={100} />
            <h1 className="text-white mt-4">Your Certificate is close</h1>
            <p className="text-white mt-3 mb-4">
              You are doing great! Keep learning to unlock your certificate!
            </p>
            <Button
              className="bg-blue-600 w-1/2 text-white"
              color="primary"
              variant="ghost"
              size="large"
            >
              Claim Certificate
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
