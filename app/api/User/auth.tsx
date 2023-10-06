import React from "react";
import Cookies from "universal-cookie";
import { useUser } from "@/app/context/UserdbContext";

const auth_API = "https://192.168.1.68:45455/api/Auth/";
const auth_API_NIkoloza = "https://172.20.10.7:45456/api/Auth/";

const Authentication = () => {
  const cookies = new Cookies();
  const { login: loginContext } = useUser();

  const handleLogin = async (email: any, password: any) => {
    try {
      const response = await fetch(auth_API + "Email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const userData = data.user;

        try {
          localStorage.setItem("jwt_token", data.token);
          loginContext(userData);
        } catch (error) {
          console.error("Error setting cookies:", error);
        }
      } else {
        const errorText = await response.text();
        return errorText;
      }
    } catch (error) {
      window.alert(error);
      return error;
    }
  };

  const handleOAuthLogin = async (
    oAuthprovider: string,
    oAuthproviderId: string
  ) => {
    try {
      const response = await fetch(auth_API + "OAuthEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oAuthprovider,
          oAuthproviderId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const userData = data.user;

        try {
          localStorage.setItem("jwt_token", data.token);
          loginContext(userData);
          return true;
        } catch (error) {
          console.error("Error setting cookies:", error);
        }
      } else {
        const errorText = await response.text();
        return errorText;
      }
    } catch (error) {
      window.alert(error);
      return error;
    }
  };

  const handleRegistration = async (
    userName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    try {
      console.log(email);
      console.log(userName);
      console.log(password);
      console.log(confirmPassword);
      const response = await fetch(auth_API + "register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          userName,
          password,
          confirmPassword,
        }),
      });

      if (response.ok) {
      } else {
        const errorText = await response.text();
        console.error("Registration error:", errorText); // Log the error
        // Display an error message to the user or handle it as needed
        return errorText;
      }
    } catch (error) {
      console.error("Registration error:", error); // Log the error
      return error;
    }
  };

  const CheckeMailExist = async (email: string) => {
    try {
      const response = await fetch(auth_API + "CheckeMailExist/" + email, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Registration error:", error); // Log the error
      return error;
    }
  };

  const handleoAuthRegistration = async (
    email: string,
    username: string,
    picture: string,
    oAuthProvider: string,
    oAuthProviderId: string
  ) => {
    try {
      console.log(email);
      console.log(username);
      console.log(picture);
      console.log(oAuthProvider);
      const response = await fetch(auth_API + "RegisterOAuth2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          picture,
          oAuthProvider,
          oAuthProviderId,
        }),
      });

      if (response.ok) {
        return true;
      } else {
        const errorText = await response.text();
        console.error("Registration error:", errorText); // Log the error
        // Display an error message to the user or handle it as needed
        return errorText;
      }
    } catch (error) {
      console.error("Registration error:", error); // Log the error
      return error;
    }
  };

  return {
    handleLogin,
    handleOAuthLogin,
    handleRegistration,
    handleoAuthRegistration,
    CheckeMailExist,
  };
};

export default Authentication;
