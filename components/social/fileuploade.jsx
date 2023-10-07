import React, { useState } from "react";
import { Button } from "@nextui-org/button";

function FileUpload({ onFileSelect, onCancelUpload }) {
  const [mediaSrc, setMediaSrc] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setMediaSrc(e.target.result);
      };
      if (file.type.includes("image") || file.type.includes("video")) {
        reader.readAsDataURL(file);
        // Call the onFileSelect callback with the selected file
        onFileSelect(file, file.type.includes("image") ? "picture" : "video");
      } else {
        alert("Invalid file type. Please upload an image or video.");
      }
    }
  };

  const handleReupload = () => {
    setMediaSrc(null);
    onFileSelect(null);
    onCancelUpload();
    const fileInput = document.getElementById("dropzone-file");
    if (fileInput) {
      fileInput.value = ""; // Clear the file input
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = "copy";
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setMediaSrc(e.target.result);
      };
      if (file.type.includes("image") || file.type.includes("video")) {
        reader.readAsDataURL(file);
        // Call the onFileSelect callback with the selected file
        onFileSelect(file, file.type.includes("image") ? "picture" : "video");
      } else {
        alert("Invalid file type. Please upload an image or video.");
      }
    }
  };

  return (
    <div
      className="flex items-center justify-center w-full"
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDrop={handleDrop}
    >
      {mediaSrc ? (
        <div>
          {mediaSrc.includes("image") ? (
            <img
              src={mediaSrc}
              alt="Uploaded"
              className="w-64 h-64 rounded-lg object-cover cursor-pointer"
              onClick={() => document.getElementById("dropzone-file").click()}
            />
          ) : (
            <video
              src={mediaSrc}
              alt="Uploaded"
              controls
              className="w-64 h-64 rounded-lg cursor-pointer"
              onClick={() => document.getElementById("dropzone-file").click()}
            />
          )}
          <Button
            onClick={handleReupload}
            color="danger"
            className="mt-2 px-4 py-2  rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200"
          >
            თავიდან ატვირთვა
          </Button>
        </div>
      ) : (
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-64 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">დააჭირე რათა ატვირთო</span> ან ჩააგდე
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              MP4, PNG, JPG ან GIF
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            accept="image/*, video/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      )}
    </div>
  );
}

export default FileUpload;
