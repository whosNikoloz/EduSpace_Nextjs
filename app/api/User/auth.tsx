import Cookies from "universal-cookie";
import { useUser } from "@/app/dbcontext/UserdbContext";
import "firebase/auth";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  deleteObject,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const serverUrl_Auth = process.env.NEXT_PUBLIC_SERVER_URL + "/api/v1/Auth/";
const serverUrl_User = process.env.NEXT_PUBLIC_SERVER_URL + "/api/v1/User/";

const Authentication = () => {
  const cookies = new Cookies();
  const { login: loginContext } = useUser();

  const checkEmailLogin = async (email: string) => {
    try {
      const response = await fetch(serverUrl_Auth + "Login/check-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email, // Replace with the actual email
        }),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.successful) {
          return { success: true };
        } else {
          return { success: false, result: data.error };
        }
      }
    } catch (error) {
      console.error("An error occurred during the request:", error);
    }
  };

  const handleLogin = async (email: any, password: any) => {
    try {
      const response = await fetch(serverUrl_Auth + "Email", {
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

        if (data.successful) {
          try {
            loginContext(data.response.token);
            return { success: true };
          } catch (error) {
            console.error("Error setting cookies:", error);
          }
        } else {
          return { success: false, result: data.error };
        }
      } else {
        const errorText = await response.text();
        // Handle other errors, for example, log the error or display an error message
        console.error("Error:", errorText);
        return { success: false, result: "An unexpected error occurred" };
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
      const response = await fetch(serverUrl_Auth + "OAuthEmail", {
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
        try {
          loginContext(data.response.token);
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
      const apiUrl = `${serverUrl_User}ForgotPassword?email=${encodeURIComponent(
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
      const response = await fetch(serverUrl_User + "ResetPassword", {
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

  const checkEmailRegister = async (email: string) => {
    try {
      const response = await fetch(serverUrl_Auth + "Register/check-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email, // Replace with the actual email
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status) {
          return { success: true };
        } else {
          return { success: false, result: data.error };
        }
      }
    } catch (error) {
      console.error("An error occurred during the request:", error);
    }
  };

  const checkUserNameRegister = async (username: string) => {
    try {
      const response = await fetch(
        serverUrl_Auth + "Register/check-username/" + username,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        if (data.status) {
          return { success: true };
        } else {
          return { success: false, result: data.error };
        }
      }
    } catch (error) {
      console.error("An error occurred during the request:", error);
    }
  };

  const handleRegistration = async (
    userName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    try {
      const response = await fetch(serverUrl_Auth + "Register", {
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
      const response = await fetch(serverUrl_Auth + "OAuth2Exist", {
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
      const response = await fetch(serverUrl_Auth + "RegisterOAuth2", {
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
      const token = localStorage.getItem("jwt");
      const response = await fetch(serverUrl_User + "ChangePassword", {
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
      const token = localStorage.getItem("jwt");
      const response = await fetch(serverUrl_User + "ChangeGeneral", {
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
      const apiUrl = `${serverUrl_User}${userid}`; // Construct the URL with query parameters
      const token = localStorage.getItem("jwt");
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
        try {
          localStorage.removeItem("jwt");
          loginContext(data.token);
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
      const apiUrl = `${serverUrl_User}ReLogin/${encodedPassword}`; // Construct the URL with query parameters
      const token = localStorage.getItem("jwt");
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
      const apiUrl = `${serverUrl_User}ChangeEmailRequest/${encodedPassword}`; // Construct the URL with query parameters
      const token = localStorage.getItem("jwt");
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
        return { ok: true, data: verificationCode };
      } else {
        const errorText = await response.text();
        return { ok: false, error: errorText };
      }
    } catch (error) {
      window.alert(error);
      return error;
    }
  };

  const ChangeEmail = async (email: string) => {
    try {
      const encodedPassword = encodeURIComponent(email);
      const apiUrl = `${serverUrl_User}ChangeEmail/${encodedPassword}`; // Construct the URL with query parameters
      const token = localStorage.getItem("jwt");
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

  const ChangeProfilePicture = async (
    picture: File,
    oldpicture: string,
    userId: number
  ) => {
    try {
      if (oldpicture) {
        try {
          await deleteFileFromFirebaseStorage(oldpicture);
        } catch (error) {
          console.error("Error deleting old picture:", error);
        }
      }

      const pictureUrl = picture
        ? await uploadFileToFirebaseStorage(picture, "UserProfiles")
        : null;

      const token = localStorage.getItem("jwt");
      const response = await fetch(serverUrl_User + "UploadImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include the bearer token in the Authorization header
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          pictureUrl,
        }),
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

  const uploadFileToFirebaseStorage = async (
    file: File,
    folderName: string
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        const uniqueFileName = `${Date.now()}-${Math.random()
          .toString(36)
          .substring(2)}-${file.name}`;
        const fileRef = ref(storage, `${folderName}/${uniqueFileName}`);
        const uploadTask = uploadBytesResumable(fileRef, file);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // You can monitor the progress here if needed.
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
            console.error("Error uploading file:", error);
            reject(error);
          },
          async () => {
            try {
              // Upload completed successfully, get the download URL.
              const downloadURL = await getDownloadURL(fileRef);
              resolve(downloadURL);
            } catch (error) {
              console.error("Error getting download URL:", error);
              reject(error);
            }
          }
        );

        // Wait for the upload to complete.
        await uploadTask;
      } catch (error) {
        console.error("Error uploading file to Firebase Storage:", error);
        reject(error);
      }
    });
  };

  const deleteFileFromFirebaseStorage = async (fileUrl: string) => {
    try {
      const storage = getStorage();
      const fileRef = ref(storage, fileUrl);

      // Check if the file exists
      const url = await getDownloadURL(fileRef);
      if (url) {
        // Delete the file
        await deleteObject(fileRef);
      }
    } catch (error) {
      if ((error as { code: string }).code === "storage/object-not-found") {
        // File doesn't exist
      } else {
        // Some other error occurred
        console.error("Error deleting file:", error);
      }
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
    ChangeProfilePicture,
    checkEmailLogin,
    checkEmailRegister,
    checkUserNameRegister,
  };
};

export default Authentication;
