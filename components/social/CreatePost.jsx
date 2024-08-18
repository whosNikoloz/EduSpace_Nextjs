"use client";

import React, { useState, useEffect } from "react";
import FileUpload from "@/components/social/fileuploade";
import { Textarea, input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { useUser } from "@/app/dbcontext/UserdbContext";
import Posts from "@/app/api/Social/Post";
import { Avatar, User } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function CreatePost({ setPosts, lang }) {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [isCreateLoading, setCreateLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const router = useRouter();

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

  const resetState = () => {
    setPostModel({
      subject: "",
      content: "",
      video: null,
      picture: null,
      Userid: "",
    });
    setSelectedLanguage("");
    setPostModelError("");
  };

  const handleModalChange = (isOpen) => {
    if (!isOpen) {
      resetState();
      isOpen = false;
    }
    onOpenChange(isOpen);
  };

  const handelAuthNeeded = () => {
    sessionStorage.setItem("redirect_url", `/${lang}/social`);
    router.push(`/${lang}/user/auth`);
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
    } else {
      // Fetch the newly created post from the API
      const newPostResponse = await posts.GetLastPost();
      if (!newPostResponse.error) {
        const newPost = newPostResponse;

        // Prepend the new post to the beginning of the posts array
        setPosts((prevPosts) => [newPost, ...prevPosts]);

        toast.success(
          lang == "ka" ? "წარმატებით დაიპოსტა" : "Post created successfully"
        );

        setPostModel({
          subject: "",
          content: "",
          video: null,
          picture: null,
          Userid: "",
        });
        onClose();
        setCreateLoading(false);
      } else {
        setPostModelError("Error fetching new post");
        toast.error(
          lang == "ka" ? "სამწუხაროდ ვერ დაიპოსტა" : "Post could not be created"
        );
      }
    }
  };

  return (
    <>
      <>
        {user ? (
          <>
            <div className="flex items-center justify-center ">
              <div className="p-4 md:p-6 shadow-md bg-white rounded-lg dark:bg-gray-800 w-[400px] sm:w-[735px] mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Avatar
                      className="transition-transform"
                      size="sm"
                      isBordered
                      color="primary"
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
                    onClick={() => onOpen()}
                  >
                    <h3 className="md:text-md text-sm text-gray-500">
                      {lang == "ka"
                        ? "რა არის შენი კითხვა,"
                        : "What's on your mind,"}
                      {user.userName}?
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            <Modal
              isOpen={isOpen}
              onOpenChange={handleModalChange}
              scrollBehavior="inside"
              backdrop="blur"
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      {lang == "ka" ? "დაპოსტვა" : "Create Post"}
                    </ModalHeader>
                    <ModalBody>
                      <div className="my-2 px-4 flex items-center space-x-2">
                        <User
                          className="transition-transform"
                          name={
                            user.firstname && user.lastname
                              ? user.firstName + " " + user.lastName
                              : user.userName
                          }
                          size="sm"
                          avatarProps={{
                            src: user.picture,
                          }}
                        />
                      </div>
                      <div className="my-2 px-4 flex items-center space-x-2">
                        <Select
                          label={
                            lang == "ka" ? "აირჩიე ენა" : "Select Language"
                          }
                          variant="bordered"
                          size="sm"
                          className="max-w-full"
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
                            label={lang == "ka" ? "კითხვა" : "Question"}
                            variant="bordered"
                            minRows={1.5}
                            labelPlacement="outside"
                            classNames={{
                              input: ["text-[16px] "],
                            }}
                            placeholder={
                              lang == "ka" ? "დასვი კითხვა" : "Ask a question"
                            }
                            className="max-w-full text-[16px]"
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
                          lang={lang}
                        />
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <div className="my-2 px-4">
                        <Button
                          color="primary"
                          className="w-full py-2"
                          onClick={handlePost}
                          isDisabled={!selectedLanguage || !PostModel.content}
                          isLoading={isCreateLoading}
                        >
                          {lang == "ka" ? "დაპოსტვა" : "Post"}
                        </Button>
                      </div>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </>
        ) : (
          // Render this content if user is null
          <>
            <div className="flex items-center justify-center ">
              <div className="p-4 md:p-6 shadow-md bg-white rounded-lg dark:bg-gray-800 w-[400px] sm:w-[735px] mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Avatar
                      className="transition-transform"
                      size="sm"
                      isBordered
                      color="primary"
                      name={"nika kobaidze"}
                      src={
                        "https://firebasestorage.googleapis.com/v0/b/eduspace-a81b5.appspot.com/o/UserProfiles%2F1709757310950-aqj9p53e5a8-profilePic.jpg?alt=media&token=9d52da4d-3141-4ed8-a8c3-17388be047bb"
                      }
                    />
                  </div>
                  <div
                    className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer"
                    onClick={() => handelAuthNeeded()}
                  >
                    <h3 className="md:text-md text-sm text-gray-500">
                      {lang == "ka"
                        ? "კითხვის დასასმელად აუცილებელია რეგისტრაცია"
                        : "Registration is required to ask a question"}
                      ?
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    </>
  );
}
