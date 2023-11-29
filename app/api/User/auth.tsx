import React from "react";
import Cookies from "universal-cookie";
import { useUser } from "@/app/dbcontext/UserdbContext";

const auth_API = "https://192.168.1.68:45455/api/Auth/";
const user_API = "https://192.168.1.68:45455/api/User/";
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

  const handleForgotPassword = async (email: string) => {
    try {
      const apiUrl = `${user_API}ForgotPassword?email=${encodeURIComponent(
        email
      )}`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
      } else {
        const errorText = await response.text();
        return errorText;
      }
    } catch (error) {
      window.alert(error);
      return error;
    }
  };

  const handleResetPassword = async (
    Token: string,
    Password: string,
    ConfirmPassword: string
  ) => {
    try {
      const response = await fetch(user_API + "ResetPassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Token,
          Password,
          ConfirmPassword,
        }),
      });

      if (response.ok) {
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

  const CheckeOAuthExist = async (
    oAuthProvider: string,
    oAuthProviderId: string
  ) => {
    try {
      const response = await fetch(auth_API + "OAuth2Exist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oAuthProvider,
          oAuthProviderId,
        }),
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

  const handleChangePassowrd = async (
    userid: number,
    OldPassword: string,
    Password: string,
    ConfirmPassword: string
  ) => {
    try {
      const token = localStorage.getItem("jwt_token");
      const response = await fetch(user_API + "ChangePassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Include the bearer token in the Authorization header
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userid,
          OldPassword,
          Password,
          ConfirmPassword,
        }),
      });

      if (response.ok) {
      } else {
        const errorText = await response.text();
        return errorText;
      }
    } catch (error) {
      window.alert(error);
      return error;
    }
  };

  const handleChangeGeneral = async (
    userid: number,
    UserName: string,
    FirstName: string,
    LastName: string,
    PhoneNumber: string
  ) => {
    try {
      const token = localStorage.getItem("jwt_token");
      const response = await fetch(user_API + "ChangeGeneral", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Include the bearer token in the Authorization header
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userid,
          UserName,
          FirstName,
          LastName,
          PhoneNumber,
        }),
      });

      if (response.ok) {
      } else {
        const errorText = await response.text();
        return errorText;
      }
    } catch (error) {
      window.alert(error);
      return error;
    }
  };

  const UpdatedUser = async (userid: number) => {
    try {
      const apiUrl = `${user_API}${userid}`; // Construct the URL with query parameters
      const token = localStorage.getItem("jwt_token");
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Include the bearer token in the Authorization header
          Authorization: `Bearer ${token}`,
        },
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

  const ReLogin = async (password: string) => {
    try {
      const encodedPassword = encodeURIComponent(password);
      const apiUrl = `${user_API}ReLogin/${encodedPassword}`; // Construct the URL with query parameters
      const token = localStorage.getItem("jwt_token");
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Include the bearer token in the Authorization header
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
      } else {
        const errorText = await response.text();
        return errorText;
      }
    } catch (error) {
      window.alert(error);
      return error;
    }
  };

  const ChangeEmailRequest = async (email: string) => {
    try {
      const encodedPassword = encodeURIComponent(email);
      const apiUrl = `${user_API}ChangeEmailRequest/${encodedPassword}`; // Construct the URL with query parameters
      const token = localStorage.getItem("jwt_token");
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include the bearer token in the Authorization header
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const verificationCode = await response.text();
        sessionStorage.setItem(
          "verificationCode",
          encodeURIComponent(verificationCode)
        );
      } else {
        const errorText = await response.text();
        return errorText;
      }
    } catch (error) {
      window.alert(error);
      return error;
    }
  };

  const ChangeEmail = async (email: string) => {
    try {
      const encodedPassword = encodeURIComponent(email);
      const apiUrl = `${user_API}ChangeEmail/${encodedPassword}`; // Construct the URL with query parameters
      const token = localStorage.getItem("jwt_token");
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include the bearer token in the Authorization header
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        return;
      } else {
        const errorText = await response.text();
        return errorText;
      }
    } catch (error) {
      window.alert(error);
      return error;
    }
  };

  return {
    handleLogin,
    handleOAuthLogin,
    handleRegistration,
    handleoAuthRegistration,
    CheckeOAuthExist,
    handleForgotPassword,
    handleResetPassword,
    handleChangePassowrd,
    handleChangeGeneral,
    UpdatedUser,
    ReLogin,
    ChangeEmailRequest,
    ChangeEmail,
  };
};

export default Authentication;
