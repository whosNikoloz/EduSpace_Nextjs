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

const Posts = () => {
  const GetPosts = async (page: number, pageSize: number) => {
    try {
      const apiUrl = `${serverUrl}posts?page=${page}&pageSize=${pageSize}`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const posts = await response.json();
        return posts;
      } else {
        const errorText = await response.text();
        throw new Error(errorText); // Throw an error if the response is not OK
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error; // Rethrow the error to the calling function
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

  const CreatePost = async (
    subject: string,
    content: string,
    video: File | null,
    picture: File | null
  ) => {
    try {
      const token = localStorage.getItem("jwt");
      // Upload the video and picture to Firebase Storage
      const videoUrl = video
        ? await uploadFileToFirebaseStorage(video, "PostContent")
        : null;
      const imageUrl = picture
        ? await uploadFileToFirebaseStorage(picture, "PostContent")
        : null;

      const response = await fetch(serverUrl + "Posts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include the bearer token in the Authorization header
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          subject,
          content,
          video: videoUrl, // Include the Firebase Storage download URL
          picture: imageUrl, // Include the Firebase Storage download URL
        }),
      });

      if (response.ok) {
        // Handle successful response here
      } else {
        const errorText = await response.text();
        console.error("Post creation error:", errorText); // Log the error
        // Display an error message to the user or handle it as needed
        return errorText;
      }
    } catch (error) {
      console.error("Post creation error:", error); // Log the error
      // Display an error message to the user or handle it as needed
      return error;
    }
  };

  const EditPost = async (
    postId: number,
    subject: string,
    content: string,
    video: string | null,
    picture: string | null
  ) => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await fetch(`${serverUrl}posts?postId=${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Include the bearer token in the Authorization header
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          subject,
          content,
          video,
          picture,
        }),
      });

      if (response.ok) {
        // Handle successful response here
      } else {
        const errorText = await response.text();
        console.error("Post Edit error:", errorText); // Log the error
        // Display an error message to the user or handle it as needed
        return errorText;
      }
    } catch (error) {
      console.error("Post Edit error:", error); // Log the error
      // Display an error message to the user or handle it as needed
      return error;
    }
  };

  const GetLastPost = async () => {
    try {
      const response = await fetch(serverUrl + "lastpost", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const posts = await response.json();
        return posts;
      } else {
        const errorText = await response.text();
        return errorText;
      }
    } catch (error) {
      window.alert(error);
      return error;
    }
  };

  const deleteFileByDownloadUrl = async (contentUrl: string) => {
    try {
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

  const DeletePost = async (
    postid: number,
    contentvideo: string,
    contentpicture: string,
    comments: any
  ) => {
    try {
      const token = localStorage.getItem("jwt");

      if (comments) {
        for (const comment of comments) {
          const fileToPass = comment.commentPicture
            ? comment.commentPicture
            : comment.commentVideo;
          if (fileToPass) {
            await deleteFileByDownloadUrl(fileToPass);
          }
        }
      }

      // Delete the post itself
      const postResponse = await fetch(serverUrl + "posts/" + postid, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (postResponse.ok) {
        const fileToPass = contentvideo ? contentvideo : contentpicture;
        if (fileToPass) {
          deleteFileByDownloadUrl(fileToPass);
        }
      } else {
        const errorText = await postResponse.text();
        return errorText;
      }

      // Delete the comments from your SQL database
      // Add your SQL delete code here
    } catch (error) {
      window.alert(error);
      return error;
    }
  };

  return {
    GetPosts,
    CreatePost,
    EditPost,
    GetLastPost,
    DeletePost,
  };
};

export default Posts;
