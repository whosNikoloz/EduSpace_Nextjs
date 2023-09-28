"use client";

import Authentication from "@/app/api/User/auth";
import { useEffect, useState } from "react";
import Style from "@/app/users/auth/page.module.css";
import logSVG from "@/public/log.svg";
import registerSVG from "@/public/register.svg";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import Cookies from "universal-cookie";
import { Button } from "@nextui-org/react";

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
      router.push("/");
    }
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
      router.push("/users/auth/signup-successful");
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
                Or Sign in with social platforms
              </p>
              <div className={Style["social-media"]}>
                <a href="#" className={Style["social-icon"]}>
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className={Style["social-icon"]}>
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className={Style["social-icon"]}>
                  <i className="fab fa-google"></i>
                </a>
                <a href="#" className={Style["social-icon"]}>
                  <i className="fab fa-linkedin-in"></i>
                </a>
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
                Or Sign up with social platforms
              </p>
              <div className={Style["social-media"]}>
                <a href="#" className={Style["social-icon"]}>
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className={Style["social-icon"]}>
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className={Style["social-icon"]}>
                  <i className="fab fa-google"></i>
                </a>
                <a href="#" className={Style["social-icon"]}>
                  <i className="fab fa-linkedin-in"></i>
                </a>
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
            <Image src={logSVG} className={Style.image} alt="" />
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
            <Image src={registerSVG} className={Style.image} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
