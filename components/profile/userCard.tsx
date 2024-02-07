import React, { FC, useState } from "react";
import { Card, CardBody, Avatar } from "@nextui-org/react";

interface UserCardProps {
  username: string;
  firstname: string;
  lastname: string;
  profilepicture: string;
  joinedAt: string;
  onSelectionChange: (selectedOption: string) => void;
}

export const UserCard: FC<UserCardProps> = ({
  username,
  firstname,
  lastname,
  profilepicture,
  joinedAt,
  onSelectionChange,
}) => {
  const [selectedOption, setSelectedOption] = useState("Main"); // Default selection

  const date = new Date(joinedAt);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth() returns 0-11, so we add 1
  const day = date.getDate();
  const formattedDate = `${year}-${day}-${month < 10 ? "0" + month : month}`; // Outputs: 2023-16-11

  const handleCategoryChange = (option: string) => {
    setSelectedOption(option);
    onSelectionChange(option);
  };

  return (
    <>
      <div className="col-span-4 sm:col-span-3">
        <Card
          isBlurred
          className="border-none  bg-background/60 dark:bg-default-100/50 max-w-[680px] justify-center items-center "
          shadow="sm"
        >
          <CardBody>
            <div className="p-6 block rounded-lg ">
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
                  <div className="flex items-center p-1 border border-blue-600  dark:border-blue-400 rounded-xl gap-1">
                    <input
                      type="radio"
                      id="Main"
                      name="category"
                      className="hidden "
                      checked={selectedOption === "Main"}
                      onChange={() => handleCategoryChange("Main")}
                    />
                    <label
                      htmlFor="Main"
                      className={`px-4 py-2 text-xs font-medium capitalize ${
                        selectedOption === "Main"
                          ? "text-white bg-blue-600 hover:bg-blue-600"
                          : "text-blue-600 dark:text-blue-400 dark:hover:text-white hover:bg-blue-600 hover:text-white"
                      } rounded-xl md:py-3 md:px-12 cursor-pointer`}
                    >
                      Main
                    </label>

                    <input
                      type="radio"
                      id="Edit"
                      name="category"
                      className="hidden"
                      checked={selectedOption === "Edit"}
                      onChange={() => handleCategoryChange("Edit")}
                    />
                    <label
                      htmlFor="Edit"
                      className={`px-6 py-2 text-xs font-medium capitalize ${
                        selectedOption === "Edit"
                          ? "text-white bg-blue-600 hover:bg-blue-600"
                          : "text-blue-600 dark:text-blue-400 dark:hover:text-white hover:bg-blue-600 hover:text-white"
                      } rounded-xl md:py-3 md:px-12 cursor-pointer`}
                    >
                      Profile
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex flex-col mt-4">
                <span className="text-gray-400  font-bold text-sm mb-2">
                  Last active 5 months ago
                </span>
                <span className="text-gray-400  font-bold text-sm   mb-2">
                  Joined {formattedDate}
                </span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};
