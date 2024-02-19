"use client";

import Authentication from "@/app/api/User/auth";
import { useState } from "react";
import Style from "@/app/[lang]/user/auth/page.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";
import { Button, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { Link } from "@nextui-org/react";
import React from "react";
import AnimatedAuth from "@/public/AnimatedAuth.gif";
import AnimatedReg from "@/public/AnimatedReg.gif";
import { Locale } from "@/i18n.config";

interface ApiResponse {
  success: boolean;
  result?: string; // Adjust the type based on the actual data structure
  error?: string;
}

const AuthData = {
  ka: {
    regData: {
      title: "რეგისტრაცია",
      username: "სახელი",
      email: "ელ-ფოსტა",
      password: "პაროლი",
      confirmPassword: "პაროლის დადასტურება",
      button: "რეიგსტრაცია",
    },
    loginData: {
      title: "შესვლა",
      email: "ელ-ფოსტა",
      password: "პაროლი",
      button: "შესვლა",
    },
  },
  en: {
    regData: {
      title: "Sign Up",
      username: "UserName",
      email: "Email",
      password: "Password",
      confirmPassword: "ConfirmPasswordS",
      button: "Sign Up",
    },
    loginData: {
      title: "Sign in",
      email: "Email",
      password: "Password",
      button: "Sign in",
    },
  },
};

export default function AuthPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { regData, loginData } = AuthData[lang];
  const router = useRouter();

  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [registrationState, setRegistrationState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState("");
  const [regError, setRegError] = useState("");

  const [regUserNameError, setRegUserNameError] = useState("");
  const [regEmailError, setRegEmailError] = useState("");

  const [loginEmailError, setLoginEmailError] = useState("");
  const [loginPasswordError, setLoginPasswordError] = useState("");

  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [regRegPasswordError, setRegPasswordError] = useState("");

  const auth = Authentication();

  const handleModeToggle = () => {
    setIsSignUpMode(!isSignUpMode);
  };

  const handleLogin = async () => {
    if (loginState.email === "") {
      setLoginEmailError(
        lang == "ka"
          ? "შეავსე ელ-ფოსტის ველი"
          : "Please fill in the Email field"
      );
      setIsLoading(false);
      return;
    }
    if (loginState.password === "") {
      setLoginPasswordError(
        lang == "ka"
          ? "შეავსე პაროლის ველი"
          : "Please fill in the Password field"
      );
      setIsLoading(false);
      return;
    }
    const response = (await auth.handleLogin(
      loginState.email,
      loginState.password
    )) as ApiResponse;

    if (!response.success) {
      setLoginError(response.result || "login failed");
      setIsLoading(false);
    } else {
      const redirectUrl = sessionStorage.getItem("redirect_url");
      if (redirectUrl) {
        sessionStorage.removeItem("redirect_url");
        router.push(redirectUrl);
      } else {
        router.push("/");
      }
      setIsLoading(false);
    }
  };

  const handleRegisterOAuth = async (provider: string) => {
    // Trigger OAuth authentication
    const callbackUrl = "/user/auth/oauth";

    await signIn(provider, { callbackUrl });
  };

  const handleRegistration = async () => {
    if (registrationState.username === "") {
      setRegUserNameError(
        lang === "ka"
          ? "შეავსე სახელი ველი"
          : "Please fill in the UserName field"
      );
      setIsLoading(false);
      return;
    }
    if (registrationState.email === "") {
      setRegEmailError(
        lang == "ka" ? "შეავსე ელ-ფოსტა ველი" : "Please fill in the Email field"
      );
      setIsLoading(false);
      return;
    }
    if (registrationState.password === "") {
      setRegError(
        lang == "ka"
          ? "შეავსე პაროლის ველი"
          : "Please fill in the Password field"
      );
      setIsLoading(false);
      return;
    }
    if (registrationState.confirmPassword === "") {
      setConfirmPasswordError(
        lang == "ka"
          ? "შეავსე პაროლის დადასტურების ველი"
          : "Please fill in the ConfirmPassword field"
      );
      setIsLoading(false);
      return;
    }

    var errorMessage = await auth.handleRegistration(
      registrationState.username,
      registrationState.email,
      registrationState.password,
      registrationState.confirmPassword
    );
    if (errorMessage) {
      setRegError("Registartion failed");
      setIsLoading(false);
    } else {
      var cookie = new Cookies();
      cookie.set("regEmail", registrationState.email);
      cookie.set("regUserName", registrationState.username);
      router.push("/user/auth/signup-successful");
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (isSignUpMode) {
      setIsLoading(true);
      handleRegistration();
    } else {
      setIsLoading(true);
      handleLogin();
    }
  };

  const validateEmail = (value: string) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const handleLoginEmailExists = async () => {
    setLoginEmailError("");
    const isEmailValid = validateEmail(loginState.email);
    try {
      if (loginState.email === "") {
        return;
      }
      if (!isEmailValid) {
        setLoginEmailError(
          lang == "ka"
            ? "შეიყვანეთ ელ-ფოსტა სწორად"
            : "Please enter a valid email"
        );

        return;
      }
      const response = (await auth.checkEmailLogin(
        loginState.email
      )) as ApiResponse;

      if (!response.success) {
        setLoginEmailError(response.result || "Email already exists");
      }
    } catch (error) {
      // Handle any errors during the API call
      console.error("Error:", error);
      // You might want to handle this case accordingly, for example, show an error message.
    }
  };

  const handleRegisterEmailExists = async () => {
    const isEmailValid = validateEmail(registrationState.email);
    setRegEmailError("");
    try {
      if (registrationState.email === "") {
        return;
      }
      if (!isEmailValid) {
        setRegEmailError(
          lang == "ka"
            ? "შეიყვანეთ ელ-ფოსტა სწორად"
            : "Please enter a valid email"
        );
        return;
      }
      const response = (await auth.checkEmailRegister(
        registrationState.email
      )) as ApiResponse;

      if (!response.success) {
        setRegEmailError(response.result || "UserName already exists");
      }
    } catch (error) {
      // Handle any errors during the API call
      console.error("Error:", error);
    }
  };

  const handleRegisterUsernameExists = async () => {
    try {
      if (registrationState.username === "") {
        return;
      }
      const response = (await auth.checkUserNameRegister(
        registrationState.username
      )) as ApiResponse;

      if (!response.success) {
        setRegUserNameError(response.result || "UserName already exists");
      }
    } catch (error) {
      // Handle any errors during the API call
      console.error("Error:", error);
    }
  };

  const handleLoginEmailClear = async () => {
    setLoginEmailError("");
    setLoginState({ ...loginState, email: "" });
  };

  const handleLoginPasswordClear = async () => {
    setLoginPasswordError("");
    setLoginState({ ...loginState, password: "" });
  };

  const handleRegEmailClear = async () => {
    setRegEmailError("");
    setRegistrationState({ ...registrationState, email: "" });
  };

  const handleRegUserNameClear = async () => {
    setRegUserNameError("");
    setRegistrationState({ ...registrationState, username: "" });
  };

  const handleBlurConfirmPassword = () => {
    if (registrationState.confirmPassword === "") return;

    if (registrationState.password !== registrationState.confirmPassword) {
      setConfirmPasswordError(
        lang == "ka" ? "პარლი არემთხვევა" : "Password doesnot match"
      );
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleBlurPassword = () => {
    if (registrationState.password === "") return;

    if (registrationState.password.length < 6) {
      setRegPasswordError(
        lang == "ka"
          ? "პაროლი უნდა იყოს 6 სიმბოლოზე მეტი"
          : "Passwrod must be more Then 8 Symbols"
      );
    } else {
      setRegPasswordError("");
    }
  };

  const handleRegConfirmPasswordClear = async () => {
    setConfirmPasswordError("");
    setRegistrationState({ ...registrationState, confirmPassword: "" });
  };

  const handleRegPasswordClear = async () => {
    setRegPasswordError("");
    setRegistrationState({ ...registrationState, password: "" });
  };

  return (
    <>
      <header>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        />
      </header>
      <div
        className={`${Style.container} ${
          isSignUpMode ? Style["sign-up-mode"] : ""
        }`}
      >
        <div className={Style["forms-container"]}>
          <div className={Style["signin-signup"]}>
            <form className={`${Style.authform} ${Style["sign-in-form"]} `}>
              <h2 className={Style.title}>{loginData.title}</h2>
              <div className="gap-4 flex flex-col md:w-8/12 w-full">
                <Input
                  value={loginState.email}
                  type="email"
                  label={loginData.email}
                  classNames={{
                    input: ["text-[16px] "],
                  }}
                  onChange={(e) =>
                    setLoginState({ ...loginState, email: e.target.value })
                  }
                  onBlur={handleLoginEmailExists}
                  startContent={<i className="fas fa-envelope"></i>}
                  isClearable
                  onClear={handleLoginEmailClear}
                  isInvalid={loginEmailError !== ""}
                  errorMessage={loginEmailError}
                />
                <Input
                  type="password"
                  label={loginData.password}
                  classNames={{
                    input: ["text-[16px] "],
                  }}
                  value={loginState.password}
                  onChange={(e) =>
                    setLoginState({ ...loginState, password: e.target.value })
                  }
                  startContent={<i className="fas fa-lock"></i>}
                  isClearable
                  onClear={handleLoginPasswordClear}
                  isInvalid={loginPasswordError !== ""}
                  errorMessage={loginPasswordError}
                />
              </div>

              {loginError && (
                <div className={Style["error-message"]}>{loginError}</div>
              )}

              <Link
                className="text-blue-600 ml-auto py-2 md:ml-52"
                href="/user/forgot-password"
              >
                {lang === "ka" ? "პაროლი დაგავიწყდა ?" : "Forgot password?"}
              </Link>

              <Button
                color="primary"
                size="md"
                variant="shadow"
                type="submit"
                className={`${Style.btn}`}
                onClick={handleSubmit}
                isLoading={isLoading}
              >
                {loginData.button}
              </Button>
              <div className="flex lg:w-8/12 w-full items-center justify-between p-4">
                <div className="w-full h-[1px] bg-gray-300"></div>
                <span className="text-sm uppercase mx-6 text-gray-400">
                  {lang === "ka" ? "ან" : "OR"}
                </span>
                <div className="w-full h-[1px] bg-gray-300"></div>
              </div>
              <div className={Style["social-media"]}>
                <Button
                  onClick={() => handleRegisterOAuth("google")}
                  className={Style["social-icon"]}
                  isIconOnly
                >
                  <i className="fab fa-google"></i>
                </Button>
                <Button
                  onClick={() => handleRegisterOAuth("github")}
                  className={Style["social-icon"]}
                  isIconOnly
                >
                  <i className="fab fa-github"></i>
                </Button>
                <Button
                  onClick={() => handleRegisterOAuth("facebook")}
                  className={Style["social-icon"]}
                  isIconOnly
                  isDisabled={true}
                >
                  <i className="fab fa-facebook"></i>
                </Button>
                <Button
                  onClick={() => handleRegisterOAuth("linkedin")}
                  className={Style["social-icon"]}
                  isIconOnly
                  isDisabled={true}
                >
                  <i className="fab fa-linkedin"></i>
                </Button>
              </div>
            </form>
            <form className={`${Style.authform} ${Style["sign-up-form"]}`}>
              <h2 className={Style.title}>{regData.title}</h2>
              <div className="gap-4 flex flex-col md:w-8/12 w-full">
                <Input
                  type="text"
                  label={regData.username}
                  classNames={{
                    input: ["text-[16px] "],
                  }}
                  value={registrationState.username}
                  onChange={(e) =>
                    setRegistrationState({
                      ...registrationState,
                      username: e.target.value,
                    })
                  }
                  onBlur={handleRegisterUsernameExists}
                  startContent={<i className="fas fa-user"></i>}
                  isClearable
                  onClear={handleRegUserNameClear}
                  isInvalid={regUserNameError !== ""}
                  errorMessage={regUserNameError}
                />
                <Input
                  type="email"
                  label={regData.email}
                  classNames={{
                    input: ["text-[16px] "],
                  }}
                  value={registrationState.email}
                  onChange={(e) =>
                    setRegistrationState({
                      ...registrationState,
                      email: e.target.value,
                    })
                  }
                  startContent={<i className="fas fa-envelope"></i>}
                  isClearable
                  onBlur={handleRegisterEmailExists}
                  onClear={handleRegEmailClear}
                  isInvalid={regEmailError !== ""}
                  errorMessage={regEmailError}
                />

                <Input
                  type="password"
                  label={regData.password}
                  classNames={{
                    input: ["text-[16px] "],
                  }}
                  value={registrationState.password}
                  onChange={(e) =>
                    setRegistrationState({
                      ...registrationState,
                      password: e.target.value,
                    })
                  }
                  startContent={<i className="fas fa-lock"></i>}
                  isClearable
                  onClear={handleRegPasswordClear}
                  isInvalid={regRegPasswordError !== ""}
                  errorMessage={regRegPasswordError}
                  onBlur={handleBlurPassword}
                />
                <Input
                  className={Style.authinput}
                  type="password"
                  classNames={{
                    input: ["text-[16px] "],
                  }}
                  label={regData.confirmPassword}
                  value={registrationState.confirmPassword}
                  onChange={(e) =>
                    setRegistrationState({
                      ...registrationState,
                      confirmPassword: e.target.value,
                    })
                  }
                  onBlur={handleBlurConfirmPassword}
                  startContent={<i className="fas fa-lock"></i>}
                  isClearable
                  onClear={handleRegConfirmPasswordClear}
                  isInvalid={confirmPasswordError !== ""}
                  errorMessage={confirmPasswordError}
                />
              </div>
              <div className={Style["error-message"]}>{regError}</div>
              <Button
                color="primary"
                size="md"
                variant="shadow"
                type="submit"
                className={`${Style.btn}`}
                onClick={handleSubmit}
                isLoading={isLoading}
              >
                {regData.button}
              </Button>
              <div className="flex lg:w-8/12 w-full  items-center justify-between p-4">
                <div className="w-full h-[1px] bg-gray-300"></div>
                <span className="text-sm uppercase mx-6 text-gray-400">
                  {lang === "ka" ? "ან" : "Or"}
                </span>
                <div className="w-full h-[1px] bg-gray-300"></div>
              </div>
              <div className={Style["social-media"]}>
                <Button
                  onClick={() => handleRegisterOAuth("google")}
                  className={Style["social-icon"]}
                  isIconOnly
                >
                  <i className="fab fa-google"></i>
                </Button>
                <Button
                  onClick={() => handleRegisterOAuth("github")}
                  className={Style["social-icon"]}
                  isIconOnly
                >
                  <i className="fab fa-github"></i>
                </Button>
                <Button
                  onClick={() => handleRegisterOAuth("facebook")}
                  className={Style["social-icon"]}
                  isIconOnly
                  isDisabled={true}
                >
                  <i className="fab fa-facebook"></i>
                </Button>
                <Button
                  onClick={() => handleRegisterOAuth("linkedin")}
                  className={Style["social-icon"]}
                  isIconOnly
                  isDisabled={true}
                >
                  <i className="fab fa-linkedin"></i>
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className={Style["panels-container"]}>
          <div className={`${Style.panel} ${Style["left-panel"]}`}>
            <div className={`${Style.content} mx-auto mt-10`}>
              <h3 className="mb-4">
                {lang === "ka" ? "ახალი ხარ ?" : "New Member ?"}
              </h3>
              <button
                className={`${Style.btn} ${Style.transparent}`}
                id="sign-up-btn"
                onClick={handleModeToggle} // Toggle sign-up/login form
              >
                {regData.title}
              </button>
            </div>
            <Image
              src={AnimatedAuth}
              priority={true}
              className={`${Style.image} mx-auto`}
              alt=""
            />
          </div>
          <div className={`${Style.panel} ${Style["right-panel"]}`}>
            <div className={`${Style.content} mx-auto mt-10`}>
              <h3 className="mb-4">
                {lang === "ka" ? "ერთ-ერთი ჩვენგანი ხარ ?" : "One of us ?"}
              </h3>
              <button
                className={`${Style.btn} ${Style.transparent}`}
                id="sign-in-btn"
                onClick={handleModeToggle}
              >
                {loginData.title}
              </button>
            </div>
            <Image
              src={AnimatedReg}
              priority={true}
              className={`${Style.image} mx-auto`}
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}
