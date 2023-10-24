"use client";

import { Dialog } from "@headlessui/react";
import React, { useState, useEffect } from "react";
import FileUpload from "@/components/social/fileuploade";
import { Textarea } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { useUser } from "@/app/context/UserdbContext";
import Posts from "@/app/api/Social/Post";
import { Skeleton } from "@nextui-org/react";
import { Avatar, User } from "@nextui-org/react";
import Alert from "@/components/social/Alert";

export default function CreatePost({ setPosts }) {
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const [alert, setAlert] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isCreateLoading, setCreateLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    // Simulate loading for demonstration purposes
    setTimeout(() => {
      setIsLoading(false);
    }, 1); // Replace with your actual data fetching logic
    console.log(user);
  }, [user]);

  const posts = Posts();

  const [PostModel, setPostModel] = useState({
    subject: "",
    content: "",
    video: null,
    picture: null,
    Userid: "",
  });

  const handleLanguageSelect = (event) => {
    const selectedValue = event.target.value;

    console.log("selectedValue:", selectedValue);

    switch (selectedValue) {
      case "$.0":
        setPostModel((prevModel) => ({
          ...prevModel,
          subject: "C#",
        }));
        setSelectedLanguage("C#");
        break;
      case "$.1":
        setPostModel((prevModel) => ({
          ...prevModel,
          subject: "Swift",
        }));
        setSelectedLanguage("Swift");
        break;
      case "$.2":
        setPostModel((prevModel) => ({
          ...prevModel,
          subject: "Python",
        }));
        setSelectedLanguage("Python");
        break;
      case "$.3":
        setPostModel((prevModel) => ({
          ...prevModel,
          subject: "C++",
        }));
        setSelectedLanguage("C++");
        break;
      default:
        break;
    }
  };

  const [PostModelError, setPostModelError] = useState("");

  const handleFileSelect = (file, fileType) => {
    setPostModel((prevModel) => {
      if (fileType === "picture") {
        return {
          ...prevModel,
          picture: file,
          video: null,
        };
      } else if (fileType === "video") {
        return {
          ...prevModel,
          video: file,
          picture: null,
        };
      }
      return prevModel;
    });
  };
  const CanceleUpload = () => {
    setPostModel((prevModel) => {
      return {
        ...prevModel,
        video: null,
        picture: null,
      };
    });
  };

  const handlePost = async () => {
    setCreateLoading(true);
    var errorMessage = await posts.CreatePost(
      PostModel.subject,
      PostModel.content,
      PostModel.video,
      PostModel.picture
    );
    if (errorMessage) {
      setPostModelError("Invalid Email or Password");
      console.log(errorMessage);
    } else {
      // Fetch the newly created post from the API
      const newPostResponse = await posts.GetLastPost();
      if (!newPostResponse.error) {
        const newPost = newPostResponse;

        console.log("last post", newPost);

        // Prepend the new post to the beginning of the posts array
        setPosts((prevPosts) => [newPost, ...prevPosts]);

        setAlert({
          message: "პოსტი წარმატებით დაემატა",
          type: "success",
          onClose: () => setAlert(null),
        });

        setPostModel({
          subject: "",
          content: "",
          video: null,
          picture: null,
          Userid: "",
        });

        setIsOpen(false);
        setCreateLoading(false);
      } else {
        setPostModelError("Error fetching new post");
        console.log(newPostResponse.error);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <>
          <div className="flex items-center justify-center ">
            <div className="p-4 md:p-6 shadow-md bg-white rounded-lg dark:bg-gray-800 w-[750px] mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center mt-4 space-x-3 mb-2.5">
                    <svg
                      className="w-10 h-10 text-gray-200 dark:text-gray-700"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    </svg>
                  </div>
                </div>
                <div className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer">
                  <h3 className="md:text-md text-gray-500">დასვი კითხვა</h3>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {user ? (
            <>
              <div className="flex items-center justify-center ">
                <div className="p-4 md:p-6 shadow-md bg-white rounded-lg dark:bg-gray-800 w-[750px] mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Avatar
                        className="transition-transform"
                        size="sm"
                        name={
                          user.firstname && user.lastname
                            ? user.firstName + " " + user.lastName
                            : user.userName
                        }
                        src={user.picture}
                      />
                    </div>
                    <div
                      className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer"
                      onClick={() => setIsOpen(true)}
                    >
                      <h3 className="md:text-md text-gray-500">
                        რა არის შენი კითხვა, {user.userName}?
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* create post dialog  */}

              <Dialog
                open={isOpen}
                onClose={() => {
                  setIsOpen(false);
                  setPostModel({
                    subject: "",
                    content: "",
                    video: null,
                    picture: null,
                    Userid: "",
                  });
                }}
                className="fixed z-10 inset-0"
              >
                <div className="flex items-center justify-center min-h-[80vh] mt-10">
                  {/* dialog overlay  */}
                  <Dialog.Overlay className="fixed inset-0 bg-black opacity-20 " />
                  {/* dialog card  */}
                  <div className="relative bg-white w-96 rounded-lg dark:bg-gray-800 mt-6">
                    {/* dialog header  */}
                    <div className="flex justify-center relative ">
                      {/* dialog title  */}
                      <Dialog.Title className=" py-4 text-xl font-bold dark:text-white">
                        დაპოსტვა
                      </Dialog.Title>
                      {/* dialog close icon button  */}
                      <div className="absolute right-0 p-2">
                        <button
                          className="bg-gray-800 p-2  rounded-full text-black dark:text-white"
                          onClick={() => {
                            setIsOpen(false);
                            setPostModel({
                              subject: "",
                              content: "",
                              video: null,
                              picture: null,
                              Userid: "",
                            });
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    {/* dialog body  */}
                    <Dialog.Description>
                      {/* post author profile */}
                      <div className="my-2 px-4 flex items-center space-x-2">
                        <User
                          className="transition-transform"
                          name={
                            user.firstname && user.lastname
                              ? user.firstName + " " + user.lastName
                              : user.userName
                          }
                          size="sm"
                          src={user.picture}
                        />

                        <div></div>
                      </div>
                      <div className="my-2 px-4 flex items-center space-x-2">
                        <Select
                          label="აირჩიე ენა"
                          variant="bordered"
                          className="max-w-xs"
                          value={selectedLanguage}
                          onChange={handleLanguageSelect}
                        >
                          <SelectItem value="C#">C#</SelectItem>
                          <SelectItem value="Swift">Swift</SelectItem>
                          <SelectItem value="Python">Python</SelectItem>
                          <SelectItem value="C++">C++</SelectItem>
                        </Select>
                      </div>
                      {/* create post interface */}
                      <div className="px-4 py-2">
                        <div className="mb-4">
                          <Textarea
                            label="კითხვა"
                            variant="bordered"
                            labelPlacement="outside"
                            placeholder="დასვი კითხვა"
                            className="max-w-xs"
                            value={PostModel.content}
                            onChange={(e) =>
                              setPostModel({
                                ...PostModel,
                                content: e.target.value,
                              })
                            }
                          />
                        </div>

                        <FileUpload
                          onFileSelect={handleFileSelect}
                          onCancelUpload={CanceleUpload}
                        />
                      </div>

                      <div className="my-2 px-4">
                        <Button
                          color="primary"
                          className="w-full py-2"
                          onClick={handlePost}
                          isDisabled={!selectedLanguage || !PostModel.content}
                          isLoading={isCreateLoading}
                        >
                          დაპოსტვა
                        </Button>
                      </div>
                    </Dialog.Description>
                  </div>
                </div>
              </Dialog>
              {alert && (
                <Alert
                  message={"პოსტი წარმატებით დაემატა"}
                  type={"success"}
                  onClose={alert.onClose}
                />
              )}
            </>
          ) : (
            // Render this content if user is null
            <></>
          )}
        </>
      )}
    </>
  );
}
