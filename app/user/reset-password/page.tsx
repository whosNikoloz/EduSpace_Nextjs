"use client";

import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import ResetPassowrd from "@/public/Reset password.png";
import Image from "next/image";
import { Button, Input } from "@nextui-org/react";
import { EduSpace } from "@/components/EduSpaceLogo";
import Authentication from "@/app/api/User/auth";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: {
    token: string;
  };
}) {
  const resetToken = searchParams.token;
  const authAPI = Authentication();

  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    setIsLoading(true);
    var errorMessage = await authAPI.handleResetPassword(
      resetToken,
      password,
      confirmPassword
    );

    if (errorMessage) {
      router.push("/user/auth");
      console.error(errorMessage);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setTimeout(() => {
        router.push("/user/reset-password/resetpassword-successful");
      }, 300);
    }
  };

  const handleBlurPassword = () => {
    if (password === "") return;

    if (password.length < 6) {
      setPasswordError("პაროლი უნდა იყოს 8 სიმბოლოზე მეტი");
    } else {
      setPasswordError("");
    }
  };

  const handleBlurConfirmPassword = () => {
    if (confirmPassword === "") return;

    if (password !== confirmPassword) {
      setConfirmPasswordError("პაროლი არ ემთხვევა");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleConfirmPasswordClear = async () => {
    setConfirmPasswordError("");
    setConfirmPassword("");
  };

  const handlePasswordClear = async () => {
    setPasswordError("");
    setPassword("");
  };

  const [Terms, setTerms] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    setIsButtonDisabled(
      !Terms ||
        confirmPasswordError !== "" ||
        passwordError !== "" ||
        confirmPassword === "" ||
        password === ""
    );
  }, [Terms, confirmPasswordError, passwordError, confirmPassword, password]);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 flex flex-col md:flex-row h-screen">
      <div className="hidden md:flex md:w-1/2 items-center justify-center">
        <Image
          src={ResetPassowrd}
          alt=""
          className="w-full h-auto max-w-full max-h-screen ml-20"
        />
      </div>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0 md:w-2/3">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <div className="w-8 h-8 mr-2">
            <EduSpace />
          </div>
          EduSpace
        </a>
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            პაროლის შეცვლა
          </h2>
          <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ახალი პაროლი
              </label>
              <Input
                type="password"
                name="password"
                size="lg"
                variant="bordered"
                id="password"
                placeholder="••••••••"
                required
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={passwordError !== ""}
                onBlur={handleBlurPassword}
                onClear={handlePasswordClear}
                errorMessage={passwordError}
              />
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                გაიმეორე პაროლი
              </label>
              <Input
                type="password"
                name="confirm-password"
                id="confirm-password"
                placeholder="••••••••"
                size="lg"
                variant="bordered"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
                isInvalid={confirmPasswordError !== ""}
                onBlur={handleBlurConfirmPassword}
                onClear={handleConfirmPasswordClear}
                errorMessage={confirmPasswordError}
              />
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="newsletter"
                  aria-describedby="newsletter"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  required
                  onChange={(e) => {
                    setTerms(e.target.checked);
                  }}
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="newsletter"
                  className="font-light text-gray-500 dark:text-gray-300"
                >
                  დაეთანხმე{" "}
                  <a
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    href="#"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>
            <Button
              type="submit"
              color="primary"
              variant="shadow"
              className="w-full"
              isLoading={isLoading}
              onClick={handleResetPassword}
              isDisabled={isButtonDisabled}
            >
              შეცვლა
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
