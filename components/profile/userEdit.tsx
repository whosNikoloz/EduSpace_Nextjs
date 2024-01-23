"use Client";

import React, { FC, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import UploadProfilePic from "./UploadImg/uploadProfilePic";
import { Reveal } from "../RevealFramer";
import GeneralEdit from "./UploadGeneral/generalEdit";
import PasswordEdit from "./passwordEdit";
import EmailEdit from "./ChangeEmail/emailEdit";
import OtpEmail from "./ChangeEmail/otpEmail";

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

  const [changeemail, setChangeEmail] = useState(email);

  const handleGeneralInfoChange = (updatedInfo: any) => {
    setGeneralInfo(updatedInfo);
    // Call the callback function to notify the parent
    onGeneralInfoChange(updatedInfo);
  };

  const [selectedEmail, setSelectedEmail] = useState(email);

  const handleEmailChange = (newEmail: any) => {
    setSelectedEmail(newEmail);
  };
  return (
    <>
      <div className="col-span-4 sm:col-span-9 grid lg:grid-cols-2 gap-2">
        <div className="shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
          <Reveal direction="up">
            <div className=" bg-[hsla(0,0%,100%,0.8)]  dark:bg-[#1f1e1e] dark:shadow-black/20 backdrop-blur-[30px] rounded-lg p-6 ">
              <div className=" dark:bg-[#1f1e1e]  rounded-lg p-6 ">
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
              <UploadProfilePic profilePic={profilepicture} userid={userid} />
            </div>
          </Reveal>
        </div>
        <div className="shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
          <Reveal direction="up">
            <div className=" bg-[hsla(0,0%,100%,0.8)]  dark:bg-[#1f1e1e] dark:shadow-black/20 backdrop-blur-[30px] rounded-lg p-6 ">
              <EmailEdit
                Email={changeemail}
                oauth={oatuh}
                onEmailChange={handleEmailChange}
                userid={userid}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
};
