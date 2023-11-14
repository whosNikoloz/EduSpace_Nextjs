"use client";

import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import ResetPassowrd from "@/public/Reset password.png";
import Image from "next/image";
import { Button } from "@nextui-org/button";
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
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  const handleResetPassword = async () => {
    setIsLoading(true);
    var errorMessage = await authAPI.handleResetPassword(
      resetToken,
      password,
      confirmPassword
    );

    if (errorMessage) {
      setError(errorMessage.toString());
      console.log(errorMessage);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setTimeout(() => {
        router.push("/user/reset-password/resetpassword-successful");
      }, 300);
    }
  };
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
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                გაიმეორე პაროლი
              </label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
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
            >
              შეცვლა
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
