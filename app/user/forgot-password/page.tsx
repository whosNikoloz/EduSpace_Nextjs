"use client";

import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Image from "next/image";
import { EduSpace } from "@/components/EduSpaceLogo";
import ForgotPassword from "@/public/Forgot password.png";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import Authentication from "@/app/api/User/auth";

export default function ForgotPasswordPage() {
  const authAPI = Authentication();
  const [email, setEmail] = useState("");

  const cookie = new Cookies();

  const router = useRouter();

  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async () => {
    setIsLoading(true);
    var errorMessage = await authAPI.handleForgotPassword(email);

    if (errorMessage) {
      setError(errorMessage.toString());
    } else {
      cookie.set("forgetEmail", email);
      setIsLoading(false);
      setTimeout(() => {
        router.push("/user/forgot-password/forgotpassword-successful");
      }, 500);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 flex flex-col md:flex-row h-screen">
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
        <div className="w-full p-6 bg-white rounded-lg h-auto shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            პაროლის გადატვირთვა
          </h2>
          <div className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                მეილი
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@gmail.com"
                required
                onChange={(e) => setEmail(e.target.value)}
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
              onClick={handleForgotPassword}
              isLoading={isLoading}
            >
              გადატვირთვა
            </Button>
          </div>
        </div>
      </div>
      <div className="hidden md:flex md:w-1/2 items-center justify-center">
        <Image
          src={ForgotPassword}
          alt=""
          className="w-full h-auto max-w-full max-h-screen mr-20"
        />
      </div>
    </section>
  );
}
