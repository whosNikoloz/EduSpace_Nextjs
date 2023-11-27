import React, { useState } from "react";
import { Button, ButtonGroup } from "@nextui-org/react";

function UserCardSkeleton() {
  const [selectedOption, setSelectedOption] = useState("Main");

  return (
    <>
      <div className="col-span-4 sm:col-span-3 ">
        <div className="p-6 block rounded-lg bg-[hsla(0,0%,100%,0.8)] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-[#1f1e1e] dark:shadow-black/20 backdrop-blur-[30px]">
          <div className="flex flex-col items-center">
            <div className="flex items-center mt-4 mb-4 animate-pulse">
              <svg
                className="w-20 h-20 me-3 text-gray-200 dark:text-gray-700"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
            </div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 animate-pulse"></div>
            <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></div>
            <div className="mt-6 flex flex-wrap gap-1 justify-center">
              <ButtonGroup>
                <Button
                  color="primary"
                  className="dark:text-white"
                  variant={selectedOption === "Edit" ? "shadow" : "ghost"}
                  isDisabled={true}
                >
                  Edit Profile
                </Button>
                <Button
                  color="primary"
                  className="dark:text-white"
                  variant={selectedOption === "Main" ? "shadow" : "ghost"}
                  isDisabled={true}
                >
                  Main
                </Button>
              </ButtonGroup>
            </div>
          </div>
          <div className="flex flex-col mt-4">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 animate-pulse"></div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 animate-pulse"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserCardSkeleton;
