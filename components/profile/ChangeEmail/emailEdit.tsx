"use client";

import React, { useState } from "react";
import ConfirmAccess from "./confirmAccess";
import {
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Authentication from "@/app/api/User/auth";
import toast from "react-hot-toast";
import OtpEmail from "./otpEmail";
import { Card, CardBody, Avatar } from "@nextui-org/react";

interface ResponseType {
  ok: boolean;
  data?: string;
  error?: string;
}

interface ApiResponse {
  success: boolean;
  result?: string; // Adjust the type based on the actual data structure
  error?: string;
}

function EmailEdit({
  Email,
  oauth,
  onEmailChange,
  userid,
}: {
  Email: string;
  oauth: any;
  onEmailChange: (email: string) => void;
  userid: number;
}) {
  const AuthAPI = Authentication();

  const [error, setError] = useState("");

  const onConfirm = async () => {
    const response = (await AuthAPI.ChangeEmailRequest(email)) as ResponseType;

    if (response.ok) {
      if (!response.data) {
        return;
      }
      onCloseAccess();
      onOpenOtp();
      setVerificationCode(response.data);
      console.log(response.data);
    } else if (response.error) {
      onCloseAccess();
      toast.error(response.error);
      setError(response.error);
    }
  };

  const onEmailChangeSuccess = async () => {
    onCloseOtp();

    const response = await AuthAPI.UpdatedUser(userid);

    if (response) {
      toast.error("შეცდომა მომხმარებელი ვერ განახლდა");
    }
  };

  const {
    isOpen: isOpenOtp,
    onOpen: onOpenOtp,
    onClose: onCloseOtp,
  } = useDisclosure();

  const {
    isOpen: isOpenAccess,
    onOpen: onOpenAccess,
    onClose: onCloseAccess,
  } = useDisclosure();

  const handleChange = () => {
    if (error) return;
    onOpenAccess();
  };

  const [VerificationCode, setVerificationCode] = useState("");

  const validateEmail = (value: string) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const handleBlurEmail = async () => {
    if (email === "") return;

    const isValid = validateEmail(email);

    if (!isValid) {
      setError("invalid Email");
    } else {
      setError("");
    }

    const response = (await AuthAPI.checkEmailLogin(email)) as ApiResponse;

    if (response.success) {
      setError(response.result || "Email already exists");
    }
  };

  const handleEmailClear = () => {
    setEmail("");
    setError("");
  };

  const [email, setEmail] = useState(Email);

  return (
    <Card
      isBlurred
      className="border-none  bg-background/60 dark:bg-black-100/50 max-w-[680px] justify-center items-center "
      shadow="sm"
    >
      <CardBody>
        <div className="flex items-center justify-center ">
          <div className="w-full">
            <h1 className="text-xl font-semibold text-start mb-4">
              Email information
            </h1>

            {oauth && (
              <>
                <p className="text-start text-gray-500">Oauth Provider</p>
                <div className="flex flex-col gap-4 mt-4 mb-4 w-full">
                  <Input
                    type="email"
                    className="w-full"
                    label="Email"
                    value={Email}
                    isDisabled
                  />
                </div>

                <Button color="primary" variant="shadow" size="sm" isDisabled>
                  Change
                </Button>
              </>
            )}

            {!oauth && (
              <>
                <div className="flex flex-col gap-4 w-full mt-4 mb-4">
                  <Input
                    type="email"
                    isClearable
                    className="w-full"
                    classNames={{
                      input: ["text-[16px] "],
                    }}
                    label="Email"
                    isInvalid={error ? true : false}
                    value={email}
                    onClear={handleEmailClear}
                    onBlur={handleBlurEmail}
                    errorMessage={error ? error : null}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <span className="text-md ">Email requirements:</span>
                <br />
                <span className="text-sm text-slate-500">
                  Ensure that these requirements are met:
                </span>
                <br />

                <p className="text-xs ml-8 lg:ml-16 text-slate-500 max-w-md">
                  At least 10 characters (and up to 100 characters) At least one
                  lowercase character Inclusion of at least one special
                  character, e.g., ! @ # ? Some text here zoltan
                </p>

                <br />

                <Modal
                  backdrop="blur"
                  isOpen={isOpenAccess}
                  onClose={onCloseAccess}
                >
                  <ModalContent>
                    {(onCloseAccess) => (
                      <>
                        <ConfirmAccess onConfirm={onConfirm} />
                      </>
                    )}
                  </ModalContent>
                </Modal>

                <Modal backdrop="blur" isOpen={isOpenOtp} onClose={onCloseOtp}>
                  <ModalContent>
                    {(onCloseOtp) => (
                      <>
                        <OtpEmail
                          Email={email}
                          onEmailChangeSuccess={onEmailChangeSuccess}
                          verificationCode={VerificationCode}
                        />
                      </>
                    )}
                  </ModalContent>
                </Modal>

                <div className="text-start w-full mt-6">
                  <Button
                    color="primary"
                    variant="shadow"
                    size="sm"
                    onClick={handleChange}
                  >
                    Change
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default EmailEdit;
