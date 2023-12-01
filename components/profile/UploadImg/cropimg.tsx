"use client";

import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Button } from "@nextui-org/react";

interface CropImgProps {
  profilePic: string;
  onCropComplete: (croppedImageData: string) => void;
}

interface Area {
  width: number;
  height: number;
  x: number;
  y: number;
}

const CropImg: React.FC<CropImgProps> = ({ profilePic, onCropComplete }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const handleCropComplete = useCallback(
    (
      croppedArea: any,
      croppedAreaPixels: React.SetStateAction<Area | null>
    ) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleNextButtonClick = async () => {
    if (croppedAreaPixels) {
      const croppedImageData = await getCroppedImgData(
        profilePic,
        croppedAreaPixels
      );
      onCropComplete(croppedImageData);
    }
  };

  const getCroppedImgData = async (imageSrc: string, crop: Area | null) => {
    if (!crop) {
      return "";
    }

    // Load the image
    const image = new Image();
    image.src = imageSrc;
    await new Promise((resolve) => {
      image.onload = resolve;
    });

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Make sure the canvas context was successfully created
    if (!ctx) {
      throw new Error("Unable to create canvas context.");
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = crop.width;
    canvas.height = crop.height;

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    // Return the cropped image as a data URL
    return canvas.toDataURL("image/jpeg");
  };

  return (
    <>
      <div style={{ position: "relative", width: "100%", height: "400px" }}>
        <Cropper
          image={profilePic}
          crop={crop}
          zoom={zoom}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={handleCropComplete}
          aspect={1}
          cropShape="round"
        />
      </div>
      <div className="flex justify-center mt-4">
        <Button
          variant="shadow"
          color="primary"
          size="sm"
          className="w-1/2"
          onClick={handleNextButtonClick}
          isLoading={false}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default CropImg;
