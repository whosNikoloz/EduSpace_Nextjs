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
import CropImg from "./cropimg";
import Authentication from "@/app/api/User/auth";
import toast from "react-hot-toast";
import { Card, CardBody } from "@nextui-org/react";

function UploadProfilePic({
  profilePic,
  userid,
}: {
  profilePic: string;
  userid: number;
}) {
  const {
    isOpen: isUploadModalOpen,
    onOpen: onUploadModalOpen,
    onClose: onUploadModalClose,
  } = useDisclosure();

  const {
    isOpen: isCropModalOpen,
    onOpen: onCropModalOpen,
    onClose: onCropModalClose,
  } = useDisclosure();

  const {
    isOpen: isCroppedModalOpen,
    onOpen: onCroppedModalOpen,
    onClose: onCroppedModalClose,
  } = useDisclosure();

  const UserAPI = Authentication();

  const [isLoadingUpload, setIsLoadingUpload] = useState(false);
  const [isLoadinCrop, setIsLoadingCrop] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [UploadedImg, setUploadedImg] = useState<string | null>(null);
  const [croppedImg, setCroppedImg] = useState<string | null>(null);

  const base64ToBlob = (base64: string, mimeType: string = "image/jpeg") => {
    const byteCharacters = atob(base64.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  };

  const handleSavePicture = async () => {
    const oldpicture = profilePic;
    const newpicture = croppedImg;
    setIsUploading(true);

    if (newpicture) {
      const blob = base64ToBlob(newpicture);
      const file = new File([blob], "profilePic.jpg", { type: "image/jpeg" });

      const response = await UserAPI.ChangeProfilePicture(
        file,
        oldpicture,
        userid
      );

      if (response) {
        toast.error("Error uploading profile picture");
      } else {
        setIsUploading(false);
        toast.success("Profile picture updated successfully");
        const RefreshUser = await UserAPI.UpdatedUser(userid);
        if (RefreshUser) {
          toast.error("Error refreshing user");
        }
      }
      onCroppedModalClose();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoadingUpload(true);
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setUploadedImg(result);
        setIsLoadingUpload(false);
        onUploadModalClose();
        onCropModalOpen();
      };
      if (file.type.includes("image")) {
        reader.readAsDataURL(file);
      } else {
        alert("Invalid file type. Please upload an image.");
      }
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    handleFileChange({
      target: { files: [file] },
    } as unknown as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <>
      <Card
        isBlurred
        className="border-none  bg-background/60 dark:bg-black-100/50 max-w-[680px] justify-center items-center "
        shadow="sm"
      >
        <CardBody>
          <div className="flex flex-col items-center justify-center w-full gap-2">
            <Avatar
              isBordered
              src={profilePic}
              className="w-24 h-24 mb-4"
              color="primary"
            />

            <Button
              color="primary"
              variant="shadow"
              size="sm"
              onClick={onUploadModalOpen}
            >
              Change Profile picture
            </Button>
          </div>
        </CardBody>
      </Card>

      <Modal
        backdrop="blur"
        isOpen={isUploadModalOpen}
        onClose={onUploadModalClose}
      >
        <ModalContent>
          {(onUploadModalClose) => (
            <>
              <ModalHeader className="flex flex-row gap-1">
                Add profile picture
              </ModalHeader>
              <ModalBody>
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center gap-8 py-8"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <Avatar src={profilePic} className="w-28 h-28 text-large" />

                  <input
                    id="dropzone-file"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
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
                        onClick={() => {
                          const fileInput = document.getElementById(
                            "dropzone-file"
                          ) as HTMLInputElement | null;
                          fileInput?.click();
                        }}
                        isLoading={isLoadingUpload}
                      >
                        Upload from computer
                      </Button>
                      <Button variant="shadow" color="primary" size="sm">
                        Take a picture
                      </Button>
                    </div>
                  </div>
                </label>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Second Modal */}
      <Modal
        backdrop="blur"
        isOpen={isCropModalOpen}
        onClose={onCropModalClose}
      >
        <ModalContent>
          {(onCropModalClose) => (
            <>
              <ModalHeader>Second Modal</ModalHeader>
              <ModalBody>
                <CropImg
                  profilePic={UploadedImg || profilePic}
                  onCropComplete={(croppedImageData: string) => {
                    setCroppedImg(croppedImageData);
                    onCropModalClose();
                    onCroppedModalOpen();
                  }}
                />
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        backdrop="blur"
        isOpen={isCroppedModalOpen}
        onClose={onCroppedModalClose}
      >
        <ModalContent>
          {(onCroppedModalClose) => (
            <>
              <ModalHeader>Cropped Image</ModalHeader>
              <ModalBody>
                <img
                  src={croppedImg || profilePic}
                  alt="Cropped Profile Pic"
                  className="w-full rounded-full"
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="shadow"
                  color="primary"
                  onClick={onCroppedModalClose}
                >
                  Close
                </Button>
                <Button
                  variant="shadow"
                  color="primary"
                  onClick={handleSavePicture}
                  isLoading={isUploading}
                >
                  Save as profile picture
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default UploadProfilePic;
