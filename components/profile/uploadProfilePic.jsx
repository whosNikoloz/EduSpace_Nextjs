"use client";

import React, { useState } from "react";
import {
  Avatar,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

function UploadProfilePic({ onFileSelect, onCancelUpload, profilePic }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState("opaque");

  const backdrops = ["opaque", "blur", "transparent"];

  const [mediaSrc, setMediaSrc] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setMediaSrc(e.target.result);
      };
      if (file.type.includes("image")) {
        reader.readAsDataURL(file);
        onFileSelect(file);
      } else {
        alert("Invalid file type. Please upload an image.");
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleFileChange({ target: { files: [file] } });
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

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full gap-2">
        <Avatar
          isBordered
          src={profilePic}
          className="w-24 h-24 mb-4"
          color="primary"
        />

        <Button color="primary" variant="shadow" size="sm" onClick={onOpen}>
          Change Profile picture
        </Button>
      </div>
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add profile picture
              </ModalHeader>
              <ModalBody>
                <div
                  className="flex flex-col items-center gap-8 py-8 "
                  htmlFor="dropzone-file"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <svg
                    class="w-32 h-32 me-3 text-gray-200 dark:text-gray-700"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                  </svg>

                  <input
                    id="dropzone-file"
                    type="file"
                    accept="image/*, video/*"
                    className="hidden"
                    onChange={handleFileChange} // Add this line
                  />

                  <div className="flex flex-col gap-4">
                    <p className="text-center">
                      Drag photo here <br /> — or —
                    </p>
                    <div className="flex flex-row gap-8">
                      <Button
                        variant="shadow"
                        color="primary"
                        size="sm"
                        onClick={() =>
                          document.getElementById("dropzone-file").click()
                        }
                      >
                        Upload from computer
                      </Button>
                      <Button variant="shadow" color="primary" size="sm">
                        Take a picture
                      </Button>
                    </div>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default UploadProfilePic;
