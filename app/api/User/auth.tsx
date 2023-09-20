import React from "react";
import Cookies from "universal-cookie";
import { useUser } from "@/app/context/UserDbContext";

const auth_API = "https://192.168.1.68:45455/api/Auth/";

const Authentication = () => {
  const cookies = new Cookies();
  const { login: loginContext } = useUser(); // Rename the login variable

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

  const handleRegistration = async (
    userName: any,
    email: any,
    password: any,
    confirmPassword: any
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

  return {
    handleLogin,
    handleRegistration,
  };
};

export default Authentication;
