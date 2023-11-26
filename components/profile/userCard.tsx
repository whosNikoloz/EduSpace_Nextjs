import React, { FC, useState } from "react";
import { Button, ButtonGroup, Avatar } from "@nextui-org/react";

interface UserCardProps {
  username: string;
  firstname: string;
  lastname: string;
  profilepicture: string;
  createdate: string;
  onSelectionChange: (selectedOption: string) => void;
}

export const UserCard: FC<UserCardProps> = ({
  username,
  firstname,
  lastname,
  profilepicture,
  createdate,
  onSelectionChange,
}) => {
  const [selectedOption, setSelectedOption] = useState("Main"); // Default selection

  const handleButtonClick = (option: string) => {
    setSelectedOption(option);
    onSelectionChange(option);
  };

  return (
    <>
      <div className="col-span-4 sm:col-span-3">
        <div className="p-6 block rounded-lg bg-[hsla(0,0%,100%,0.8)] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-[#1f1e1e] dark:shadow-black/20 backdrop-blur-[30px]">
          <div className="flex flex-col items-center">
            <Avatar
              isBordered
              className="w-24 h-24"
              color="primary"
              src={profilepicture}
            />
            <h1 className="text-2xl font-bold dark:text-white mt-4">
              @{username}
            </h1>
            <p className="text-gray-600">
              {firstname} {lastname}
            </p>
            <div className="mt-6 flex flex-wrap gap-1 justify-center">
              <ButtonGroup>
                <Button
                  color="primary"
                  className="dark:text-white"
                  variant={selectedOption === "Edit" ? "shadow" : "ghost"}
                  onClick={() => handleButtonClick("Edit")}
                >
                  Edit Profile
                </Button>
                <Button
                  color="primary"
                  className="dark:text-white"
                  variant={selectedOption === "Main" ? "shadow" : "ghost"}
                  onClick={() => handleButtonClick("Main")}
                >
                  Main
                </Button>
              </ButtonGroup>
            </div>
          </div>
          <div className="flex flex-col mt-4">
            <span className="text-gray-400  font-bold text-sm mb-2">
              Last active 5 months ago
            </span>
            <span className="text-gray-400  font-bold text-sm   mb-2">
              Joined {createdate}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
