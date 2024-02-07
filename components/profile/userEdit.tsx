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
  oauth: boolean;
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
  oauth,
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
        <Reveal direction="up">
          <GeneralEdit
            userName={generalInfo.userName}
            firstname={generalInfo.firstname}
            lastname={generalInfo.lastname}
            number={generalInfo.number}
            userid={userid}
            onChange={handleGeneralInfoChange}
          />
        </Reveal>
        <Reveal direction="up">
          <PasswordEdit oauth={oauth} userid={userid} />
        </Reveal>
        <Reveal direction="up">
          <UploadProfilePic profilePic={profilepicture} userid={userid} />
        </Reveal>
        <Reveal direction="up">
          <EmailEdit
            Email={changeemail}
            oauth={oauth}
            onEmailChange={handleEmailChange}
            userid={userid}
          />
        </Reveal>
      </div>
    </>
  );
};
