import React, { FC } from "react";
import { Button, Avatar } from "@nextui-org/react";
import UploadProfilePic from "@/components/profile/uploadProfilePic";
import { Reveal } from "../RevealFramer";
import NameEdit from "./nameEdit";

interface UserEditProps {
  username: string;
  firstname: string;
  lastname: string;
  profilepicture: string;
  createdate: string;
  onSelectionChange: (selectedOption: string) => void;
}

export const UserEdit: FC<UserEditProps> = ({
  username,
  firstname,
  lastname,
  profilepicture,
  createdate,
  onSelectionChange,
}) => {
  return (
    <>
      <div className="col-span-4 sm:col-span-9 grid lg:grid-cols-2 gap-2  ">
        <div className="shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
          <Reveal direction="up">
            <div className=" bg-[hsla(0,0%,100%,0.8)]  dark:bg-[#1f1e1e] dark:shadow-black/20 backdrop-blur-[30px] rounded-lg p-6 ">
              <UploadProfilePic
                onFileSelect={undefined}
                onCancelUpload={undefined}
                profilePic={profilepicture}
              />
            </div>
          </Reveal>
        </div>

        <div className="shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
          <Reveal direction="up">
            <div className=" bg-[hsla(0,0%,100%,0.8)]  dark:bg-[#1f1e1e] dark:shadow-black/20 backdrop-blur-[30px] rounded-lg p-6 ">
              <NameEdit
                userName={username}
                firstname={firstname}
                lastname={lastname}
              />
            </div>
          </Reveal>
        </div>
        <div className="shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
          <Reveal direction="up">
            <div className=" bg-[hsla(0,0%,100%,0.8)]  dark:bg-[#1f1e1e] dark:shadow-black/20 backdrop-blur-[30px] rounded-lg p-6 ">
              <UploadProfilePic
                onFileSelect={undefined}
                onCancelUpload={undefined}
                profilePic={profilepicture}
              />
            </div>
          </Reveal>
        </div>
        <div className="shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
          <Reveal direction="up">
            <div className=" bg-[hsla(0,0%,100%,0.8)]  dark:bg-[#1f1e1e] dark:shadow-black/20 backdrop-blur-[30px] rounded-lg p-6 ">
              <UploadProfilePic
                onFileSelect={undefined}
                onCancelUpload={undefined}
                profilePic={profilepicture}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
};
