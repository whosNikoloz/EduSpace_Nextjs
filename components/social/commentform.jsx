import React, { useRef, useState } from "react";
import Comment from "@/app/api/Social/Comment";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { Textarea, input } from "@nextui-org/react";

function CommentForm({ postid }) {
  const fileInputRef = useRef(null);
  const [commentText, setCommentText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const comment = Comment();

  const handleAttachFile = () => {
    // Trigger the file input when the button is clicked
    fileInputRef.current.click();
  };

  const [commentModel, setCommentModel] = useState({
    content: "",
    video: null,
    picture: null,
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type.startsWith("image")) {
        // Handle image file
        const imageUrl = URL.createObjectURL(selectedFile);
        setSelectedImage(imageUrl);
        setSelectedVideo(null);

        // Update commentModel with the selected picture
        setCommentModel((prevModel) => ({
          ...prevModel,
          picture: selectedFile,
          video: null,
        }));
      } else if (selectedFile.type.startsWith("video")) {
        // Handle video file
        setSelectedImage(null);
        setSelectedVideo(URL.createObjectURL(selectedFile));

        // Update commentModel with the selected video
        setCommentModel((prevModel) => ({
          ...prevModel,
          video: selectedFile,
          picture: null,
        }));
      }
    }
  };

  const handleDeleteContent = () => {
    setSelectedImage(null);
    setSelectedVideo(null);

    commentModel.picture = null;
    commentModel.video = null;

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      await comment.CreateComment(
        commentText,
        commentModel.picture,
        commentModel.video,
        postid
      );
      setCommentModel((prevModel) => ({
        ...prevModel,
        content: "",
        video: null,
        picture: null,
      }));
      setCommentText("");
      setSelectedImage(null);
      setSelectedVideo(null);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full  rounded-lg">
        <div className="px-4">
          <Textarea
            id="comment"
            minRows={1}
            variant="bordered"
            size="sm"
            value={commentText}
            className="min-h-[50px]"
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="დაწერე კომენტარი..."
            required
          />
          {selectedImage && (
            <div className="px-3 py-2 ">
              <div className="flex items-center">
                <Image
                  src={selectedImage}
                  alt="Selected"
                  className="max-h-20"
                  width={100}
                  height={100}
                />
                <button
                  type="button"
                  className="ml-2 p-2 text-red-500 rounded-full hover:text-red-700 dark:hover:text-red-300"
                  onClick={handleDeleteContent}
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
          {selectedVideo && (
            <div className="px-3 py-2">
              <div className="flex items-center">
                <video
                  controls
                  className="max-h-20"
                  height="auto"
                  src={selectedVideo}
                  alt="Video Description"
                />
                <button
                  type="button"
                  className="ml-2 p-2 text-red-500 rounded-full hover:text-red-700 dark:hover:text-red-300"
                  onClick={handleDeleteContent}
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between px-3 py-2 ">
          <Button
            type="submit"
            isLoading={isLoading}
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          >
            დაპოსტე კომენტარი
          </Button>
          <div className="flex pl-0 space-x-1 sm:pl-2">
            {!selectedImage && !selectedVideo && (
              <button
                type="button"
                className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                onClick={handleAttachFile}
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 12 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"
                  />
                </svg>
                <span className="sr-only">Attach file</span>
              </button>
            )}
            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default CommentForm;
