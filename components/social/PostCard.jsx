"use client";

import React, { useEffect, useState } from "react";
import { Textarea } from "@nextui-org/react";
import CommentForm from "./commentform";
import { User, Avatar } from "@nextui-org/react";
import { DotsIcon } from "@/components/icons";
import Posts from "@/app/api/Social/Post";
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
import { Card, CardBody, Image } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

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

function PostCard({ postData, onDelete, lang }) {
  const { user } = useUser();

  const post = Posts();

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

  const formattedTimeAgo = formatTimeAgo(postData.createdAt);
  const text = postData.content;
  const maxTextLength = 300;
  const shouldShowSeeMore = text.length > maxTextLength;

  const [isFullTextVisible, setFullTextVisible] = useState(false);
  const [edittextPost, setEdittextPost] = useState(text);
  const [postcontent, setPostcontent] = useState(text);

  const [editSuccess, setEditSuccess] = useState(false);

  const [deleteSuccess, setdeleteSuccessSuccess] = useState(false);

  const [comments, setComments] = useState(postData.comments);

  const commentCount = comments ? comments.length : 0;

  const [con, setCon] = useState(null);

  const toggleFullText = () => {
    setFullTextVisible(!isFullTextVisible);
  };

  const handleOpenPost = async (postid) => {
    onOpenModalPost();
    if (!user) {
      return;
    }
    const connection = new HubConnectionBuilder()
      .withUrl(
        `https://185.139.57.56:8081/commentHub?userId=${user.userId}&postId=${postid}`
      )
      .configureLogging(LogLevel.Information) // Corrected typo here
      .build();

    setCon(connection);

    connection
      .start()
      .then(() => {
        console.log("Connection started!");
      })
      .catch((error) => {
        console.error("Error starting connection:", error);
      });
  };

  useEffect(() => {
    if (con) {
      con.on("ReceiveComment", (newComment) => {
        setComments((prevComments) => [...prevComments, newComment]);
        toast.success(lang == "ka" ? "კომენტარი დაემატა" : "Comment Added");
      });
    }
  }, [con, lang]);

  const handleClosePost = async () => {
    if (con) {
      con.stop();
    }
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
      setPostModelError(errorMessage);
    } else {
      setEditSuccess(false);
      onCloseEdit();
      toast.success(
        lang == "ka"
          ? "წარმატებით დარედაქტირდა პოსტი"
          : "Post Edited Successfully"
      );
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

  const handleCommentDelete = (commentId) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.commentId !== commentId)
    );
  };

  return (
    <>
      <div className="flex items-center justify-center mb-4">
        <Card
          isBlurred
          className="border-none bg-background/60 dark:bg-gray-800/100 sm:w-[800px] w-[350px] "
          shadow="sm"
        >
          <CardBody>
            <div className="px-2 sm:px-5 py-0   justif rounded-lg  ">
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
                        {lang == "ka" ? "პოსტის რედაქტირება " : "Edit Post"}
                      </DropdownItem>
                      <DropdownItem
                        key="delete"
                        className="text-danger"
                        color="danger"
                        onPress={onOpenChangeWarning}
                      >
                        {lang == "ka" ? "პოსტის წაშლა" : "Delete Post"}
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
                    onClick={() => handleOpenPost(postData.postId)}
                  >
                    {commentCount === 0
                      ? lang == "ka"
                        ? "კომენტარი"
                        : "Comment"
                      : lang == "ka"
                      ? `${commentCount} კომენტარი`
                      : `${commentCount} comments`}
                  </button>
                </Link>
              </div>
            </div>
          </CardBody>
        </Card>
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
                {lang == "ka" ? "პოსტის წაშლა" : "Delete Post"}
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
                  {lang == "ka" ? "დახურვა" : "Close"}
                </Button>
                <Button
                  onClick={handleDelete}
                  color="primary"
                  variant="shadow"
                  isLoading={deleteSuccess}
                >
                  {lang == "ka" ? "წაშლა" : "Delete"}
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
                {postData.user.username}
                {lang == "ka" ? "-ს პოსტი" : "'s Post"}
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
                            className="max-w-lg max-h-[500px] rounded"
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
                  {lang == "ka" ? "რედაქტირება" : "Edit"}
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
        onClose={handleClosePost}
        size="xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {postData.user.username}
                {lang == "ka" ? "-ს პოსტი" : "'s Post"}
              </ModalHeader>
              <ModalBody>
                {/* post author profile */}
                <div className="my-2  flex items-center space-x-2 ">
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
                <div className="my-2  flex items-center ">{text}</div>
                {/* create post interface */}
                <div className="py-2">
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
                              className="max-w-lg max-h-screen rounded mx-auto  w-[350px] sm:w-auto"
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
                        ? lang == "ka"
                          ? "კომენტარი"
                          : "Comment"
                        : lang == "ka"
                        ? `${commentCount} კომენტარი`
                        : `${commentCount} comments`}
                    </button>
                  </Link>
                </div>
                <hr className="border-gray-700" />
                {comments.map((comment) => (
                  <Comment
                    lang={lang}
                    key={comment.commentId}
                    commentId={comment.commentId}
                    username={comment.commentUser.username}
                    commentText={comment.commentContent}
                    avatarUrl={comment.commentUser.picture}
                    createdAt={comment.commentCreatedAt}
                    videoUrl={comment.commentVideo}
                    pictureUrl={comment.commentPicture}
                    userid={comment.commentUser.userId}
                    onCommentDelete={handleCommentDelete}
                  />
                ))}
              </ModalBody>
              <ModalFooter className="py-0 gap-0">
                {user && (
                  <>
                    <Avatar
                      className="transition-transform mt-2"
                      name={
                        user.firstname && user.lastname
                          ? user.firstName + " " + user.lastName
                          : user.userName
                      }
                      isBordered
                      color="primary"
                      src={user.picture}
                      size="sm"
                    />
                    <div className="mb-4 w-full max-w-lg">
                      <CommentForm postid={postData.postId} lang={lang} />
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
