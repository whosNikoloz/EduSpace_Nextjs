"use client";

import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Textarea } from "@nextui-org/react";
import CommentForm from "./commentform";
import { User } from "@nextui-org/react";
import { DotsIcon } from "@/components/social/DotsIcon";
import Posts from "@/app/api/Social/Post";
import {
  Dropdown,
  Link,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useUser } from "@/app/context/UserDbContext";
import Comment from "@/components/social/commentUser";
import WarningAlert from "./WarningAlert";

function formatTimeAgo(timestamp) {
  const currentDate = new Date();
  const inputDate = new Date(timestamp);
  const timeDifferenceInSeconds = Math.floor((currentDate - inputDate) / 1000);

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

function PostCard({ postData }) {
  const { user } = useUser();
  const [isFullTextVisible, setFullTextVisible] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [showWarningAlert, setShowWarningAlert] = useState(false);

  const toggleFullText = () => {
    setFullTextVisible(!isFullTextVisible);
  };

  const confirmDelete = () => {
    setShowWarningAlert(true);
  };

  const handleDelete = () => {
    const post = Posts();
    setIsDeleting(true);
    post
      .DeletePost(postData.postId, postData.video, postData.picture)
      .then(() => {
        setIsDeleting(false);
        setIsOpen(false); // Close the dialog after deletion
        onDelete(postData.postId); // Notify the parent component about the deletion
      })
      .catch((error) => {
        setIsDeleting(false);
        console.error("Error deleting post:", error);
      });
  };

  const formattedTimeAgo = formatTimeAgo(postData.createdAt);
  const text = postData.content;
  const maxTextLength = 300;
  const shouldShowSeeMore = text.length > maxTextLength;
  const commentCount = postData.comments ? postData.comments.length : 0;

  return (
    <>
      <div className="flex items-center justify-center ">
        <div className="px-5 py-4 bg-white dark:bg-gray-800 shadow justif rounded-lg   w-[800px] mb-4">
          <div className="flex justify-between mb-4">
            <User
              name={postData.user.firstname + " " + postData.user.lastname}
              description={formattedTimeAgo + "  " + postData.subject}
              avatarProps={{
                src: postData.user.picture,
              }}
            />
            {user && postData.user.userId === user.userId && (
              <Dropdown backdrop="blur">
                <DropdownTrigger>
                  <Button isIconOnly variant="light">
                    <DotsIcon size={35} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu variant="faded" aria-label="Static Actions">
                  <DropdownItem key="new">პოსტის რედაქტირება</DropdownItem>
                  <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                    onClick={confirmDelete}
                  >
                    პოსტის წაშლა
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}
          </div>
          <p
            className={`text-gray-800 dark:text-gray-100 leading-snug md:leading-normal`}
          >
            {shouldShowSeeMore && !isFullTextVisible
              ? text.slice(0, maxTextLength)
              : text}
            {shouldShowSeeMore && (
              <button
                onClick={toggleFullText}
                className="text-blue-500 ml-2 text-xs hover:underline"
              >
                {isFullTextVisible ? "ნახვა ნაკლები" : "მეტის ნახვა"}
              </button>
            )}
          </p>
          <br />
          {(postData.picture || postData.video) && (
            <>
              {postData.video && (
                <video
                  controls
                  width="100%"
                  max-width="100%"
                  height="auto"
                  src={postData.video}
                  alt="Video Description"
                />
              )}
              {postData.picture && (
                <button>
                  <img
                    className="rounded"
                    src={postData.picture}
                    width="100%"
                    max-width="100%"
                    height="auto"
                    layout="responsive"
                    alt="Image Description"
                    onClick={() => setIsOpen(true)}
                  />
                </button>
              )}
            </>
          )}
          <div className="flex justify-between items-center mt-5">
            <div className="flex"></div>
            <Link>
              <button
                className="ml-1 text-gray-500 dark:text-gray-400 font-light"
                onClick={() => setIsOpen(true)}
              >
                {commentCount}{" "}
                {commentCount === 1 ? "კომენტარი" : "კომენტარები"}
              </button>
            </Link>
          </div>
        </div>
      </div>
      {showWarningAlert && (
        <WarningAlert
          title="პოსტის წაშლა"
          message="დარწმუნებული ხართ, რომ გსურთ ამ პოსტის წაშლა?"
          onCancel={() => setShowWarningAlert(false)}
          onAgree={() => {
            setShowWarningAlert(false);
            handleDelete();
          }}
        />
      )}

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen mt-10">
          {/* dialog overlay */}
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-20" />
          {/* dialog card */}
          <div className="relative bg-white w-full md:w-9/12 lg:w-8/12 rounded-lg dark:bg-gray-800 mt-6">
            {/* dialog header */}
            <div className="flex justify-center relative ">
              {/* dialog title */}
              <Dialog.Title className="py-4 text-xl text-center font-bold dark:text-white">
                {postData.user.username} პოსტი
              </Dialog.Title>
              {/* dialog close icon button */}
              <div className="absolute right-0 p-2">
                <button
                  className="p-2 rounded-full text-black dark:text-white"
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
            {/* dialog body */}
            <Dialog.Description>
              {/* post author profile */}
              <div className="my-2 px-4 flex items-center space-x-2 ">
                <User
                  name={postData.user.firstname + " " + postData.user.lastname}
                  description={formattedTimeAgo + "  " + postData.subject}
                  avatarProps={{
                    src: postData.user.picture,
                  }}
                />
              </div>
              <div className="my-2 px-4 flex items-center ">{text}</div>
              {/* create post interface */}
              <div className="px-4 py-2">
                <div className="flex items-center justify-center">
                  {(postData.picture || postData.video) && (
                    <>
                      {postData.video && (
                        <video
                          controls
                          width="100%"
                          max-width="100%"
                          height="auto"
                          src={postData.video}
                          alt="Video Description"
                        />
                      )}
                      {postData.picture && (
                        <img
                          className="rounded"
                          src={postData.picture}
                          width="100%"
                          max-width="100%"
                          height="auto"
                          layout="responsive"
                          alt="Image Description"
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center mt-5">
                <div className="flex"></div>
                <Link>
                  <button className="mr-4 text-gray-500 dark:text-gray-400 font-light">
                    {commentCount}{" "}
                    {commentCount === 1 ? "კომენტარი" : "კომენტარები"}
                  </button>
                </Link>
              </div>

              <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

              {postData.comments.map((comment) => {
                return (
                  <Comment
                    username={comment.commentUser.username}
                    commentText={comment.commentContent}
                    avatarUrl={comment.commentUser.picture}
                    createdAt={comment.commentCreatedAt}
                    videoUrl={comment.commentVideo} // Set a default contentUrl if none found
                    pictureUrl={comment.commentPicture}
                  />
                );
              })}

              <div className="my-1 px-4 flex items-start space-x-2 mt-5">
                {user && (
                  <>
                    <User
                      name
                      avatarProps={{
                        src: user.picture,
                      }}
                    />
                    <div className="mb-4  w-full max-w-lg ">
                      <CommentForm postid={postData.postId} />
                    </div>
                  </>
                )}
              </div>
            </Dialog.Description>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default PostCard;
