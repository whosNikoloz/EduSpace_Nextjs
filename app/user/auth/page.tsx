"use client";

import Authentication from "@/app/api/User/auth";
import { useEffect, useState } from "react";
import Style from "@/app/user/auth/page.module.css";
import LoginIl from "@/public/ProgiLust.png";
import RegistrationIl from "@/public/ProgiLust2.png";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import Cookies from "universal-cookie";
import { Button, Input } from "@nextui-org/react";
import { signIn, signOut } from "next-auth/react";
import { Link } from "@nextui-org/react";
import React from "react";
import { set } from "nprogress";
import AnimatedSvg1 from "@/public/AnimatedSvg1.gif";
import AnimatedSvg2 from "@/public/AnimatedSvg2.gif";

interface ApiResponse {
  success: boolean;
  result?: string; // Adjust the type based on the actual data structure
  error?: string;
}

const AuthPage: React.FC = () => {
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
      setLoginEmailError("შეავსე Email ველი");
      setIsLoading(false);
      return;
    }
    if (loginState.password === "") {
      setLoginPasswordError("შეავსე Password ველი");
      setIsLoading(false);
      return;
    }
    const response = (await auth.handleLogin(
      loginState.email,
      loginState.password
    )) as ApiResponse;

    console.log(response);

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
      setRegUserNameError("შეავსე UserName ველი");
      setIsLoading(false);
      return;
    }
    if (registrationState.email === "") {
      setRegEmailError("შეავსე Email ველი");
      setIsLoading(false);
      return;
    }
    if (registrationState.password === "") {
      setRegError("შეავსე Password ველი");
      setIsLoading(false);
      return;
    }
    if (registrationState.confirmPassword === "") {
      setConfirmPasswordError("შეავსე ConfirmPassword ველი");
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
        setLoginEmailError("Please enter a valid email");
        return;
      }
      const response = (await auth.checkEmailLogin(
        loginState.email
      )) as ApiResponse;

      if (!response.success) {
        setLoginEmailError(response.result || "Email already exists");
      } else {
        console.error("Email does not exist. Error:", response.error);
        // You might want to handle this case accordingly, for example, show an error message.
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
        setRegEmailError("Please enter a valid email");
        return;
      }
      const response = (await auth.checkEmailRegister(
        registrationState.email
      )) as ApiResponse;

      if (!response.success) {
        setRegEmailError(response.result || "UserName already exists");
      } else {
        console.error("Email does not exist. Error:", response.error);
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
      } else {
        console.error("Email does not exist. Error:", response.error);
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
      setConfirmPasswordError("პაროლი არ ემთხვევა");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleBlurPassword = () => {
    if (registrationState.password === "") return;

    if (registrationState.password.length < 6) {
      setRegPasswordError("პაროლი უნდა იყოს 8 სიმბოლოზე მეტი");
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
              <h2 className={Style.title}>შესვლა</h2>
              <div className="gap-4 flex flex-col md:w-8/12 w-full">
                <Input
                  value={loginState.email}
                  type="email"
                  label="Email"
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
                  label="Password"
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
                პაროლი დაგავიწყდა ?
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
                შესვლა
              </Button>
              <p className={Style["social-text"]}>
                ან შედით სოციალური პლატფორმებით
              </p>
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
                >
                  <i className="fab fa-facebook"></i>
                </Button>
                <Button
                  onClick={() => handleRegisterOAuth("linkedin")}
                  className={Style["social-icon"]}
                  isIconOnly
                >
                  <i className="fab fa-linkedin"></i>
                </Button>
              </div>
            </form>
            <form className={`${Style.authform} ${Style["sign-up-form"]}`}>
              <h2 className={Style.title}>რეგისტრაცია</h2>
              <div className="gap-4 flex flex-col md:w-8/12 w-full">
                <Input
                  type="text"
                  label="Username"
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
                  label="Email"
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
                  label="Password"
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
                  label="confirmPassword"
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
                რეგისტრაცია
              </Button>
              <p className={Style["social-text"]}>
                ან დარეგისტრირდით სოციალურ პლატფორმებზე
              </p>
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
                >
                  <i className="fab fa-facebook"></i>
                </Button>
                <Button
                  onClick={() => handleRegisterOAuth("linkedin")}
                  className={Style["social-icon"]}
                  isIconOnly
                >
                  <i className="fab fa-linkedin"></i>
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className={Style["panels-container"]}>
          <div className={`${Style.panel} ${Style["left-panel"]}`}>
            <div className={Style.content}>
              <h3>ახალი ხარ ?</h3>
              <p>
                ტექსტი ტექსტი ტექსტი ტექსტი ტექსტი ტექსტი ტექსტი ტექსტი ტექსტი
                ტექსტი
              </p>
              <button
                className={`${Style.btn} ${Style.transparent}`}
                id="sign-up-btn"
                onClick={handleModeToggle} // Toggle sign-up/login form
              >
                რეგისტრაცია
              </button>
            </div>
            <Image src={AnimatedSvg2} className={Style.image} alt="" />
          </div>
          <div className={`${Style.panel} ${Style["right-panel"]}`}>
            <div className={Style.content}>
              <h3>ერთ-ერთი ჩვენგანი ხარ ?</h3>
              <p>
                ტექსტი ტექსტი ტექსტი ტექსტი ტექსტი ტექსტი ტექსტი ტექსტი ტექსტი
                ტექსტი
              </p>
              <button
                className={`${Style.btn} ${Style.transparent}`}
                id="sign-in-btn"
                onClick={handleModeToggle}
              >
                შესვლა
              </button>
            </div>
            <Image src={AnimatedSvg1} className={`${Style.image} `} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
