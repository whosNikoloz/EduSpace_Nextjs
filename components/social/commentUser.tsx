import React, { useState, useEffect } from "react";
import { Avatar, User } from "@nextui-org/react";
import CommentApi from "@/app/api/Social/Comment";
import {
  Dropdown,
  Link,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { DotsIcon } from "@/components/social/DotsIcon";
import { useUser } from "@/app/dbcontext/UserdbContext";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";
import { Image } from "@nextui-org/react";

interface CommentProps {
  commentId: string;
  username: string;
  videoUrl: string;
  pictureUrl: string;
  commentText: string;
  createdAt: string;
  avatarUrl: string;
  userid: number;
}

function formatTimeAgo(timestamp: string | number | Date) {
  const currentDate = new Date();
  const inputDate = new Date(timestamp);
  const currentTime = currentDate.getTime(); // Convert currentDate to timestamp
  const inputTime = inputDate.getTime(); // Convert inputDate to timestamp
  const timeDifferenceInSeconds = Math.floor((currentTime - inputTime) / 1000);

  if (timeDifferenceInSeconds < 60) {
    return "ახლა ხანს";
  } else if (timeDifferenceInSeconds < 3600) {
    const minutes = Math.floor(timeDifferenceInSeconds / 60);
    return `${minutes} წუთის${minutes > 1 ? "" : ""} წინ`;
  } else if (timeDifferenceInSeconds < 86400) {
    const hours = Math.floor(timeDifferenceInSeconds / 3600);
    return `${hours} საათის${hours > 1 ? "" : ""} წინ`;
  } else {
    const days = Math.floor(timeDifferenceInSeconds / 86400);
    return `${days} დღის${days > 1 ? "" : ""} წინ`;
  }
}

const Comment: React.FC<CommentProps> = ({
  userid,
  commentId,
  username,
  createdAt,
  videoUrl,
  pictureUrl,
  commentText,
  avatarUrl,
}) => {
  const formattedTimeAgo = formatTimeAgo(createdAt);
  const { user } = useUser();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleDelete = () => {
    const comment = CommentApi();
    comment
      .DeleteComment(commentId, videoUrl, pictureUrl)
      .then(() => {
        toast.success("წარმატებით წაიშალა");
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  return (
    <div className="flex items-center ">
      <div className=" text-black dark:text-gray-200 p-4 antialiased flex max-w-lg">
        <div>
          <Avatar
            className="transition-transform"
            name={username}
            src={avatarUrl}
          />
        </div>
        <div className="ml-3">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-3xl px-4 pt-2 pb-2.5 mb-2">
            <div className="font-semibold text-sm leading-relaxed">
              {username}
            </div>
            <div className="text-normal leading-snug md:leading-normal">
              {commentText}
            </div>
          </div>
          {pictureUrl != null ? (
            <div className="text-sm mt-0.5 text-gray-500 dark:text-gray-400 ">
              <Image
                className="rounded-lg"
                src={pictureUrl}
                alt=""
                width={400}
                height={400}
              />
            </div>
          ) : videoUrl != null ? (
            <div className="text-sm mt-0.5 text-gray-500 dark:text-gray-400 rounded">
              <video className="rounded-lg" src={videoUrl}></video>
            </div>
          ) : (
            <></>
          )}
          <div className="text-sm ml-4 mt-0.5 text-gray-500 dark:text-gray-400">
            {formattedTimeAgo}
          </div>
        </div>
        {user && userid === user.userId && (
          <Dropdown backdrop="blur">
            <DropdownTrigger>
              <Button isIconOnly variant="light">
                <DotsIcon
                  size={35}
                  filled={undefined}
                  height={undefined}
                  width={undefined}
                  label={undefined}
                />
              </Button>
            </DropdownTrigger>
            <DropdownMenu variant="faded" aria-label="Static Actions">
              <DropdownItem key="new">პოსტის რედაქტირება</DropdownItem>
              <DropdownItem
                key="delete"
                className="text-danger"
                color="danger"
                onPress={onOpen}
              >
                კომენტარის წაშლა
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
        <Modal
          backdrop="blur"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          radius="lg"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  პოსტის წაშლა
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-row gap-2">
                    <svg
                      height="50px"
                      width="50px"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 473.931 473.931"
                      xmlSpace="preserve"
                      fill="#000000"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <circle
                          style={{ fill: "#E84849" }}
                          cx="236.966"
                          cy="236.966"
                          r="236.966"
                        ></circle>
                        <path
                          style={{ fill: "#EDC92C" }}
                          d="M409.266,333.9L246.676,71.853c-1.893-3.057-5.231-4.913-8.823-4.913 c-3.596,0-6.933,1.86-8.827,4.913L65.997,334.618c-1.987,3.203-2.088,7.233-0.251,10.526c1.83,3.293,5.31,5.336,9.074,5.336h326.072 h0.045c5.736,0,10.383-4.651,10.383-10.383C411.313,337.772,410.553,335.632,409.266,333.9z"
                        ></path>
                        <path d="M225.819,242.111l-3.371-50.439c-0.632-9.83-0.943-16.887-0.943-21.167c0-5.826,1.527-10.372,4.576-13.635 c3.053-3.274,7.079-4.902,12.06-4.902c6.039,0,10.08,2.088,12.112,6.264c2.032,4.18,3.053,10.204,3.053,18.058 c0,4.636-0.247,9.347-0.733,14.11l-4.531,51.917c-0.49,6.181-1.542,10.918-3.162,14.222c-1.616,3.296-4.288,4.943-8.004,4.943 c-3.794,0-6.425-1.59-7.895-4.789C227.503,253.504,226.448,248.64,225.819,242.111z M237.508,311.401 c-4.284,0-8.026-1.381-11.214-4.153c-3.195-2.769-4.789-6.649-4.789-11.633c0-4.355,1.527-8.06,4.576-11.117 c3.053-3.053,6.795-4.58,11.218-4.58c4.426,0-3.053,4.913-1.579,8.771-4.745,11.581C245.403,309.997,241.721,311.401,237.508,311.401z"></path>
                      </g>
                    </svg>
                    <p>დარწმუნებულიხართ რომ გსურთ ამ კომენტარის წაშლა ?</p>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button variant="light" onPress={onClose}>
                    დახურვა
                  </Button>
                  <Button
                    onClick={handleDelete}
                    color="primary"
                    variant="shadow"
                  >
                    წაშლა
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default Comment;
