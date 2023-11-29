"use client";

import React, { useRef, useState } from "react";
import { Button } from "@nextui-org/react";
import toast from "react-hot-toast";
import Authentication from "@/app/api/User/auth";

function OtpEmail({
  Email,
  onEmailChangeSuccess,
}: {
  Email: string;
  onEmailChangeSuccess: () => void;
}) {
  const inputRefs = Array.from({ length: 4 }, () => useRef(null));

  const AuthAPI = Authentication();

  const [otp, setOtp] = useState(["", "", "", ""]);

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;

    if (e.target.value.length === 1 && index < 3) {
      const nextInputRef = inputRefs[index + 1].current as HTMLInputElement | null;
      if (nextInputRef) {
        nextInputRef.focus();
      }
    }

    setOtp(newOtp);
  };

  const verifyOtp = async () => {
    const verificationCode = sessionStorage.getItem("verificationCode");
    const otpString = otp.join("");

    if (otpString === verificationCode) {
      setIsLoading(true);

      try {
        const response = await AuthAPI.ChangeEmail(Email);

        if (response) {
          toast.error("პაროლი არასწორია");
        } else {
          toast.success("თქვენ გაქვთ წვდომა");
          onEmailChangeSuccess();
        }
      } catch (error) {
        console.error("Error while changing email:", error);
        toast.error("შეცდომა მოხდა");
      }

      setIsLoading(false);
    } else {
      toast.error("არასწროი პინი");
    }
  };

  return (
    <div className="relative bg-[hsla(0,0%,100%,0.8)] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-[#1f1e1e] dark:shadow-black/20 backdrop-blur-[30px] px-6 pt-10 pb-9 mx-auto w-full max-w-lg rounded-2xl">
      <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
        <div className="flex flex-col items-center justify-center text-center space-y-2">
          <div className="font-semibold text-3xl">
            <p>Email Verification</p>
          </div>
          <div className="flex flex-row text-sm font-medium text-gray-400">
            <p>We have sent a code to your email {Email}</p>
          </div>
        </div>

        <div>
          <form>
            <div className="flex flex-col space-y-16">
              <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                {otp.map((digit, index) => (
                  <div key={index} className="w-16 h-16">
                    <input
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg dark:bg-[#1f1e1e] focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      ref={inputRefs[index]}
                      onChange={(e) => handleInputChange(e, index)}
                      type="text"
                      maxLength={1}
                      pattern="[0-9]"
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col space-y-5">
                <div>
                  <Button
                    className="flex flex-row items-center justify-center text-center w-full rounded-xl outline-none py-3 text-sm shadow-sm"
                    variant="shadow"
                    color="primary"
                    onClick={verifyOtp}
                    isLoading={isLoading}
                  >
                    Verify Account
                  </Button>
                </div>

                <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                  <p>Didn't receive code?</p>{" "}
                  <a
                    className="flex flex-row items-center text-blue-600"
                    href="http://"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Resend
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OtpEmail;
