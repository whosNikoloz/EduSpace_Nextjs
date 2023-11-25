import React, { useState } from "react";
import { Avatar, Button } from "@nextui-org/react";

function UploadProfilePic({ onFileSelect, onCancelUpload, profilePic }) {
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
    <div className="flex flex-col items-center justify-center w-full gap-2">
      <Avatar src={profilePic} alt="Profile Pic" className="w-24 h-24" />
      <Button
        onClick={() => document.getElementById("dropzone-file").click()}
        color="primary"
        variant="shadow"
        size="sm"
      >
        Upload
      </Button>
      <input
        id="dropzone-file"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}

export default UploadProfilePic;
