"use client";

import Authentication from "@/app/api/User/auth";
import { useEffect, useState } from "react";
import Style from "@/app/user/auth/page.module.css";
import LoginIl from "@/public/ProgiLust.png";
import RegistrationIl from "@/public/ProgiLust2.png";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import Cookies from "universal-cookie";
import { Button } from "@nextui-org/react";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

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

  const auth = Authentication();

  const handleModeToggle = () => {
    setIsSignUpMode(!isSignUpMode);
  };

  const handleLogin = async () => {
    var errorMessage = await auth.handleLogin(
      loginState.email,
      loginState.password
    );
    if (errorMessage) {
      setLoginError("Invalid Email or Passowrd");
      console.log(errorMessage);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      const redirectUrl = sessionStorage.getItem("redirect_url");
      if (redirectUrl) {
        sessionStorage.removeItem("redirect_url");
        router.push(redirectUrl);
      } else {
        router.push("/");
      }
    }
  };

  const handleRegisterOAuth = async (provider: string) => {
    // Trigger OAuth authentication
    const callbackUrl = "/user/auth/oauth";

    await signIn(provider, { callbackUrl });
  };

  const handleRegistration = async () => {
    var errorMessage = await auth.handleRegistration(
      registrationState.username,
      registrationState.email,
      registrationState.password,
      registrationState.confirmPassword
    );
    if (errorMessage) {
      setRegError("Email or UserName Already Exists");
    } else {
      setIsLoading(false);
      var cookie = new Cookies();
      cookie.set("regEmail", registrationState.email);
      cookie.set("regUserName", registrationState.username);
      router.push("/user/auth/signup-successful");
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
            <form className={`${Style.authform} ${Style["sign-in-form"]}`}>
              <h2 className={Style.title}>შესვლა</h2>
              <div className={Style["input-field"]}>
                <i className="fas fa-user"></i>
                <input
                  className={Style.authinput}
                  type="text"
                  placeholder="Email"
                  value={loginState.email}
                  onChange={(e) =>
                    setLoginState({ ...loginState, email: e.target.value })
                  }
                />
              </div>
              <div className={Style["input-field"]}>
                <i className="fas fa-lock"></i>
                <input
                  className={Style.authinput}
                  type="password"
                  placeholder="Password"
                  value={loginState.password}
                  onChange={(e) =>
                    setLoginState({ ...loginState, password: e.target.value })
                  }
                />
              </div>
              {loginError && (
                <div className={Style["error-message"]}>{loginError}</div>
              )}
              <Link
                href="/user/forgot-password"
                className="text-blue-600 ml-52 py-2"
              >
                პაროლის აღდგენა
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
              <div className={Style["input-field"]}>
                <i className="fas fa-user"></i>
                <input
                  className={Style.authinput}
                  type="text"
                  placeholder="Username"
                  value={registrationState.username}
                  onChange={(e) =>
                    setRegistrationState({
                      ...registrationState,
                      username: e.target.value,
                    })
                  }
                />
              </div>
              <div className={Style["input-field"]}>
                <i className="fas fa-envelope"></i>
                <input
                  className={Style.authinput}
                  type="email"
                  placeholder="Email"
                  value={registrationState.email}
                  onChange={(e) =>
                    setRegistrationState({
                      ...registrationState,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <div className={Style["input-field"]}>
                <i className="fas fa-lock"></i>
                <input
                  className={Style.authinput}
                  type="password"
                  placeholder="Password"
                  value={registrationState.password}
                  onChange={(e) =>
                    setRegistrationState({
                      ...registrationState,
                      password: e.target.value,
                    })
                  }
                />
              </div>
              <div className={Style["input-field"]}>
                <i className="fas fa-lock"></i>
                <input
                  className={Style.authinput}
                  type="password"
                  placeholder="confirmPassword"
                  value={registrationState.confirmPassword}
                  onChange={(e) =>
                    setRegistrationState({
                      ...registrationState,
                      confirmPassword: e.target.value,
                    })
                  }
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
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Debitis, ex ratione. Aliquid!
              </p>
              <button
                className={`${Style.btn} ${Style.transparent}`}
                id="sign-up-btn"
                onClick={handleModeToggle} // Toggle sign-up/login form
              >
                რეგისტრაცია
              </button>
            </div>
            <Image src={LoginIl} className={Style.image} alt="" />
          </div>
          <div className={`${Style.panel} ${Style["right-panel"]}`}>
            <div className={Style.content}>
              <h3>ერთ-ერთი ჩვენგანი ხარ ?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                laboriosam ad deleniti.
              </p>
              <button
                className={`${Style.btn} ${Style.transparent}`}
                id="sign-in-btn"
                onClick={handleModeToggle}
              >
                შესვლა
              </button>
            </div>
            <Image src={RegistrationIl} className={Style.image} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
