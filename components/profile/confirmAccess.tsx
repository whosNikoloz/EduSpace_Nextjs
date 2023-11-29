"use client";

import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import Authentication from "@/app/api/User/auth";
import toast from "react-hot-toast";

function ConfirmAccess({ onConfirm }: { onConfirm: () => void }) {
  const AuthAPI = Authentication();


  const [password, setPassword] = React.useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);

    if (!password) {
      toast.error("შეავსეთ ველი");
      setIsLoading(false);
      return;
    }

    const response = await AuthAPI.ReLogin(password);

    if (response) {
      toast.error("პაროლი არასწორია");
      setIsLoading(false);
    } else {
      toast.success("თქვენ გაქვთ წვდომა");
      setIsLoading(false);
      onConfirm();
    }
  };

  return (
    <div className="relative  bg-[hsla(0,0%,100%,0.8)] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-[#1f1e1e] dark:shadow-black/20 backdrop-blur-[30px] px-6 pt-10 pb-9  mx-auto w-full max-w-lg rounded-2xl">
      <div className="mx-auto flex w-full max-w-md flex-col space-y-8">
        <div className="flex flex-col items-center justify-center text-center ">
          <div className="font-semibold text-3xl">
            <p>Confrim Access</p>
          </div>
        </div>

        <div>
          <form action="" method="post">
            <div className="flex flex-col space-y-8">
              <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs ">
                <Input
                  type="password"
                  label="Password"
                  labelPlacement="outside"
                  isInvalid={error ? true : false}
                  value={password}
                  onClear={() => setPassword("")}
                  errorMessage={error ? error : null}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex flex-col ">
                <Button
                  className="flex flex-row items-center justify-center text-center w-full  rounded-xl outline-none py-3  text-sm shadow-sm"
                  variant="shadow"
                  color="primary"
                  onClick={handleConfirm}
                  isLoading={isLoading}
                >
                  Confirm
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ConfirmAccess;
