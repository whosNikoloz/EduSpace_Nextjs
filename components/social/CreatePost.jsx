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
import { User } from "@nextui-org/react";
import Alert from "@/components/social/Alert";

export default function CreatePost({ setPosts }) {
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const [alert, setAlert] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for demonstration purposes
    setTimeout(() => {
      setIsLoading(false);
    }, 1); // Replace with your actual data fetching logic
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();

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

    switch (selectedValue) {
      case "$.0":
        setPostModel((prevModel) => ({
          ...prevModel,
          subject: "C#",
        }));
        break;
      case "$.1":
        setPostModel((prevModel) => ({
          ...prevModel,
          subject: "Swift",
        }));
        break;
      case "$.2":
        setPostModel((prevModel) => ({
          ...prevModel,
          subject: "Python",
        }));
        break;
      case "$.3":
        setPostModel((prevModel) => ({
          ...prevModel,
          subject: "C++",
        }));
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

  const handlePost = async () => {
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

        setIsOpen(false);
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
                  <Skeleton className="flex rounded-full w-12 h-12" />
                </div>
                <Skeleton className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer" />
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
                      <User
                        avatarProps={{
                          src: user.picture,
                        }}
                      />
                    </div>
                    <div
                      className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer"
                      onClick={() => setIsOpen(true)}
                    >
                      <h3 className="md:text-md text-gray-500">
                        რა არის შენი კითხვა, {user.firstName}?
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* create post dialog  */}

              <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="fixed z-10 inset-0 overflow-y-auto"
              >
                <div className="flex items-center justify-center min-h-screen mt-10 ">
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
                          onClick={() => setIsOpen(false)}
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
                          name={user.firstName + " " + user.lastName}
                          avatarProps={{
                            src: user.picture,
                          }}
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

                        <FileUpload onFileSelect={handleFileSelect} />
                      </div>

                      <div className="my-2 px-4">
                        <Button
                          color="primary"
                          className="w-full py-2"
                          onClick={handlePost}
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
