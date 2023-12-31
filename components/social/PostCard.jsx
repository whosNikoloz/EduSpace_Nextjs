"use client";

import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Textarea } from "@nextui-org/react";
import CommentForm from "./commentform";
import { User, Avatar } from "@nextui-org/react";
import { DotsIcon } from "@/components/social/DotsIcon";
import Posts from "@/app/api/Social/Post";
import { Skeleton } from "@nextui-org/react";
import {
  Dropdown,
  Link,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useUser } from "@/app/dbcontext/UserdbContext";
import Comment from "@/components/social/commentUser";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";

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

function PostCard({ postData, onDelete }) {
  const { user } = useUser();

  const post = Posts();

  const [IsAddingComment, setIsAddingComment] = useState(false);

  const {
    isOpen: isOpenWarning,
    onOpen: onOpenWarning,
    onOpenChange: onOpenChangeWarning,
  } = useDisclosure();

  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
    onOpenChange: onOpenChangeEdit,
  } = useDisclosure();

  const {
    isOpen: isOpenModalPost,
    onOpen: onOpenModalPost,
    onOpenChange: onOpenChangeModalPost,
  } = useDisclosure();

  const handleNewComment = () => {
    // Set a flag to indicate that a new comment is created
    setIsAddingComment(true);
    setTimeout(() => {
      setIsAddingComment(false);
    }, 2000);
  };

  const formattedTimeAgo = formatTimeAgo(postData.createdAt);
  const text = postData.content;
  const maxTextLength = 300;
  const shouldShowSeeMore = text.length > maxTextLength;
  const commentCount = postData.comments ? postData.comments.length : 0;

  const [isFullTextVisible, setFullTextVisible] = useState(false);
  const [edittextPost, setEdittextPost] = useState(text);
  const [postcontent, setPostcontent] = useState(text);

  const [editSuccess, setEditSuccess] = useState(false);

  const [deleteSuccess, setdeleteSuccessSuccess] = useState(false);

  const toggleFullText = () => {
    setFullTextVisible(!isFullTextVisible);
  };

  const handleEditPost = async () => {
    setEditSuccess(true);

    var errorMessage = await post.EditPost(
      postData.postId,
      postData.subject,
      edittextPost,
      postData.video,
      postData.picture
    );
    if (errorMessage) {
      setPostModelError("Invalid Email or Password");
      console.log(errorMessage);
    } else {
      setEditSuccess(false);
      onCloseEdit();
      toast.success("წარმატებით დარედაქტირდა პოსტი");
      setPostcontent(edittextPost);
    }
  };

  const handleDelete = async () => {
    setdeleteSuccessSuccess(true);
    try {
      await post.DeletePost(
        postData.postId,
        postData.video,
        postData.picture,
        postData.comments
      );
      onDelete(postData.postId); // Notify the parent component about the deletion
      setdeleteSuccessSuccess(false);
      onOpenChangeWarning(false);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="px-5 py-4 bg-white dark:bg-gray-800 shadow justif rounded-lg w-full md:w-[800px] mb-4">
          <div className="flex justify-between mb-4">
            <User
              name={
                postData.user.firstname && postData.user.lastname
                  ? postData.user.firstname + " " + postData.user.lastname
                  : postData.user.username
              }
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
                  <DropdownItem key="edit" onPress={onOpenChangeEdit}>
                    პოსტის რედაქტირება
                  </DropdownItem>
                  <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                    onPress={onOpenChangeWarning}
                  >
                    პოსტის წაშლა
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}
          </div>
          <p
            className={`text-gray-800 dark:text-gray-100 leading-snug md:leading-normal overflow-hidden`}
            style={{
              marginBottom: "1rem", // Adjust margin as needed
            }}
          >
            {shouldShowSeeMore && !isFullTextVisible
              ? postcontent.slice(0, maxTextLength)
              : postcontent}
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
            <div className="flex items-center justify-center w-full">
              {postData.video && (
                <video
                  controls
                  className="w-auto max-h-screen rounded"
                  src={postData.video}
                  alt="Video Description"
                />
              )}
              {postData.picture && (
                <button onClick={onOpenModalPost}>
                  <Image
                    className="w-auto max-h-screen rounded"
                    src={postData.picture}
                    alt="Image Description"
                  />
                </button>
              )}
            </div>
          )}
          <div className="flex justify-between items-center mt-5">
            <div className="flex"></div>
            <Link>
              <button
                className="ml-1 text-gray-500 dark:text-gray-400 font-light"
                onClick={onOpenModalPost}
              >
                {commentCount === 0 ? "კომენტარი" : `${commentCount} კომენტარი`}
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Modal
        backdrop="blur"
        isOpen={isOpenWarning}
        onOpenChange={onOpenChangeWarning}
        radius="2xl"
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
                  <p>დარწმუნებულიხართ რომ გსურთ ამ პოსტის წაშლა ?</p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="foreground" variant="light" onPress={onClose}>
                  დახურვა
                </Button>
                <Button
                  onClick={handleDelete}
                  color="primary"
                  variant="shadow"
                  isLoading={deleteSuccess}
                >
                  წაშლა
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        backdrop="blur"
        isOpen={isOpenEdit}
        onOpenChange={onOpenChangeEdit}
        radius="2xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {postData.user.username} პოსტი
              </ModalHeader>
              <ModalBody>
                {/* post author profile */}
                <div className="my-2 px-4 flex items-center space-x-2 ">
                  <User
                    name={
                      postData.user.firstname && postData.user.lastname
                        ? postData.user.firstname + " " + postData.user.lastname
                        : postData.user.username
                    }
                    description={formattedTimeAgo + "  " + postData.subject}
                    avatarProps={{
                      src: postData.user.picture,
                    }}
                  />
                </div>
                <div className="my-2 px-4 flex items-center ">
                  <Textarea
                    value={edittextPost}
                    variant="underlined"
                    onChange={(e) => setEdittextPost(e.target.value)}
                  />
                </div>
                {/* create post interface */}
                <div className="px-4 py-2 ">
                  <div className="flex items-center justify-center">
                    {(postData.picture || postData.video) && (
                      <div className="flex items-center justify-center w-full">
                        {postData.video && (
                          <video
                            controls
                            className="w-auto max-h-screen rounded"
                            src={postData.video}
                            alt="Video Description"
                          />
                        )}
                        {postData.picture && (
                          <Image
                            className="max-w-lg max-h-screen rounded"
                            src={postData.picture}
                            alt="Image Description"
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-center items-center">
                <Button
                  variant="shadow"
                  color="primary"
                  isLoading={editSuccess}
                  onClick={handleEditPost}
                >
                  რედაქტირება
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isOpenModalPost}
        onOpenChange={onOpenChangeModalPost}
        scrollBehavior="inside"
        size="xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {postData.user.username} პოსტი
              </ModalHeader>
              <ModalBody>
                {/* post author profile */}
                <div className="my-2 px-4 flex items-center space-x-2 ">
                  <User
                    name={
                      postData.user.firstname && postData.user.lastname
                        ? postData.user.firstname + " " + postData.user.lastname
                        : postData.user.username
                    }
                    description={formattedTimeAgo + "  " + postData.subject}
                    avatarProps={{
                      src: postData.user.picture,
                    }}
                  />
                </div>
                <div className="my-2 px-4 flex items-center ">{text}</div>
                {/* create post interface */}
                <div className="px-4 py-2 ">
                  <div className="flex items-center justify-center">
                    {(postData.picture || postData.video) && (
                      <div className="flex items-center justify-center w-full">
                        {postData.video && (
                          <video
                            controls
                            className="w-auto max-h-screen rounded"
                            src={postData.video}
                            alt="Video Description"
                          />
                        )}
                        {postData.picture && (
                          <>
                            <Image
                              className="max-w-lg max-h-screen rounded"
                              src={postData.picture}
                              alt="Image Description"
                            />
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center mt-5">
                  <div className="flex"></div>
                  <Link>
                    <button className="mr-4 text-gray-500 dark:text-gray-400 font-light">
                      {commentCount === 0
                        ? "კომენტარი"
                        : `${commentCount} კომენტარი`}
                    </button>
                  </Link>
                </div>
                {postData.comments.map((comment) => (
                  <Comment
                    key={comment.commentId}
                    commentId={comment.commentId}
                    username={comment.commentUser.username}
                    commentText={comment.commentContent}
                    avatarUrl={comment.commentUser.picture}
                    createdAt={comment.commentCreatedAt}
                    videoUrl={comment.commentVideo}
                    pictureUrl={comment.commentPicture}
                    userid={comment.commentUser.userId}
                  />
                ))}

                {IsAddingComment ? (
                  <>
                    <div className="flex items-center bg-white dark:bg-gray-800">
                      <div className="bg-white dark:bg-gray-800 text-black dark:text-gray-200 p-4 antialiased flex max-w-lg">
                        <div>
                          <Skeleton className="flex rounded-full w-12 h-12" />
                        </div>
                        <div className="ml-3">
                          <Skeleton className="rounded-3xl">
                            <div className="bg-gray-100 dark:bg-gray-700 rounded-3xl px-4 pt-2 pb-2.5 mb-2">
                              <div className="font-semibold text-sm leading-relaxed">
                                <Skeleton className="h-3 w-3/5 rounded-lg" />
                              </div>
                              <div className="text-normal leading-snug md:leading-normal"></div>
                            </div>
                            <div className="text-sm ml-4 mt-0.5 text-gray-500 dark:text-gray-400">
                              {formattedTimeAgo}
                            </div>
                          </Skeleton>
                        </div>
                        <Button isIconOnly variant="light">
                          <DotsIcon
                            size={35}
                            filled={undefined}
                            height={undefined}
                            width={undefined}
                            label={undefined}
                          />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </ModalBody>
              <ModalFooter>
                {user && (
                  <>
                    <Avatar
                      className="transition-transform"
                      name={
                        user.firstname && user.lastname
                          ? user.firstName + " " + user.lastName
                          : user.userName
                      }
                      src={user.picture}
                    />
                    <div className="mb-4 w-full max-w-lg">
                      <CommentForm
                        postid={postData.postId}
                        onCommentSubmit={handleNewComment}
                      />
                    </div>
                  </>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default PostCard;
