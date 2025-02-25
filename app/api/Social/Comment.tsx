import "firebase/auth";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject as deleteFirebaseObject,
} from "firebase/storage";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL + "/api/v1/";

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

const Comment = () => {
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
            // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            console.error("Error uploading file:", error);
            reject(error);
          },
          async () => {
            // Upload completed successfully, get the download URL.
            const downloadURL = await getDownloadURL(fileRef);
            resolve(downloadURL);
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

  const CreateComment = async (
    content: any,
    picture: File,
    video: File,
    postid: number
  ) => {
    try {
      const token = localStorage.getItem("jwt");
      // Upload the video and picture to Firebase Storage
      const videoUrl = video
        ? await uploadFileToFirebaseStorage(video, "CommentContent")
        : null;
      const imageUrl = picture
        ? await uploadFileToFirebaseStorage(picture, "CommentContent")
        : null;

      const response = await fetch(serverUrl + postid + "/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include the bearer token in the Authorization header
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content,
          picture: imageUrl, // Include the Firebase Storage download URL
          video: videoUrl, // Include the Firebase Storage download URL
        }),
      });

      if (response.ok) {
        // Handle successful response here
      } else {
        const errorText = await response.text();
        console.error("Comment creation error:", errorText); // Log the error
        // Display an error message to the user or handle it as needed
        return errorText;
      }
    } catch (error) {
      console.error("Comment creation error:", error); // Log the error
      return error;
    }
  };

  const deleteFileByDownloadUrl = async (contentUrl: any) => {
    try {
      // Find the corresponding file path using the mapping

      if (contentUrl) {
        // Create a reference to the file path in Firebase Storage
        const fileRef = ref(storage, contentUrl);

        // Delete the file using the renamed imported function
        await deleteFirebaseObject(fileRef);
      } else {
        console.error("File not found in your app's mapping");
      }
    } catch (error) {
      console.error("Error deleting file from Firebase Storage:", error);
    }
  };

  const DeleteComment = async (
    commentid: string,
    contentvideo: string,
    contentpicture: string
  ) => {
    try {
      const commentIdNumber = parseInt(commentid, 10); // Convert commentid to a number

      if (isNaN(commentIdNumber)) {
        throw new Error("commentid is not a valid number");
      }

      const token = localStorage.getItem("jwt");

      const response = await fetch(serverUrl + "comment/" + commentIdNumber, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const fileToPass = contentvideo ? contentvideo : contentpicture;
        if (fileToPass) {
          deleteFileByDownloadUrl(fileToPass);
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

  return {
    CreateComment,
    DeleteComment,
  };
};

export default Comment;
