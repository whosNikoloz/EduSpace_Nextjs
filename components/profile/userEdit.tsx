"use Client";

import React, { FC, useState } from "react";
import { Button, Avatar } from "@nextui-org/react";
import UploadProfilePic from "@/components/profile/uploadProfilePic";
import { Reveal } from "../RevealFramer";
import GeneralEdit from "./generalEdit";
import PasswordEdit from "./passwordEdit";
import EmailEdit from "./emailEdit";

interface UserEditProps {
  userid: number;
  email: string;
  oatuh: boolean;
  username: string;
  firstname: string;
  lastname: string;
  phonenumber: string;
  profilepicture: string;
  onGeneralInfoChange: (updatedInfo: {
    userName: string;
    firstname: string;
    lastname: string;
    number: string;
  }) => void;
}

export const UserEdit: FC<UserEditProps> = ({
  userid,
  username,
  email,
  oatuh,
  firstname,
  lastname,
  profilepicture,
  phonenumber,
  onGeneralInfoChange,
}) => {
  const [generalInfo, setGeneralInfo] = useState({
    userName: username,
    firstname: firstname,
    lastname: lastname,
    number: phonenumber,
  });

  const handleGeneralInfoChange = (updatedInfo: any) => {
    setGeneralInfo(updatedInfo);
    // Call the callback function to notify the parent
    onGeneralInfoChange(updatedInfo);
  };

  return (
    <>
      <div className="col-span-4 sm:col-span-9 grid lg:grid-cols-2 gap-2">
        <div className="shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
          <Reveal direction="up">
            <div className=" bg-[hsla(0,0%,100%,0.8)]  dark:bg-[#1f1e1e] dark:shadow-black/20 backdrop-blur-[30px] rounded-lg p-6 ">
              <div className=" bg-[hsla(0,0%,100%,0.8)]  dark:bg-[#1f1e1e] dark:shadow-black/20 backdrop-blur-[30px] rounded-lg p-6 ">
                <PasswordEdit oauth={oatuh} userid={userid} />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
          <Reveal direction="up">
            <div className=" bg-[hsla(0,0%,100%,0.8)]  dark:bg-[#1f1e1e] dark:shadow-black/20 backdrop-blur-[30px] rounded-lg p-6 ">
              <GeneralEdit
                userName={generalInfo.userName}
                firstname={generalInfo.firstname}
                lastname={generalInfo.lastname}
                number={generalInfo.number}
                userid={userid}
                onChange={handleGeneralInfoChange}
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
              <EmailEdit Email={username} oauth={oatuh} />
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
};
