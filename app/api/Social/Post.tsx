import "firebase/auth";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
  listAll,
  deleteObject as deleteFirebaseObject,
} from "firebase/storage";

const social_API = "https://localhost:45455/api/Social/";
const social_API_NIkoloza = "https://172.20.10.7:45456/api/Social/";

const social_conveyAPI = "https://widebluerock55.conveyor.cloud/api/Social/";

const mac_social_API = "https://localhost:7163/api/Social/";

const firebaseConfig = {
  apiKey: "AIzaSyCpTtUB_NqmFfsoccOBozkZ8tMlpzTd0U0",
  authDomain: "eduspace-a81b5.firebaseapp.com",
  projectId: "eduspace-a81b5",
  storageBucket: "eduspace-a81b5.appspot.com",
  messagingSenderId: "121358878167",
  appId: "1:121358878167:web:789c88cd50bdc3ada3b792",
  measurementId: "G-F18D5YQKCK",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const Posts = () => {
  const GetPosts = async (page: number, pageSize: number) => {
    try {
      const apiUrl = `${social_conveyAPI}Posts?page=${page}&pageSize=${pageSize}`;

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
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            console.error("Error uploading file:", error);
            reject(error);
          },
          async () => {
            try {
              // Upload completed successfully, get the download URL.
              const downloadURL = await getDownloadURL(fileRef);
              console.log(
                "File uploaded successfully. Download URL:",
                downloadURL
              );
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
      const token = localStorage.getItem("jwt_token");
      // Upload the video and picture to Firebase Storage
      const videoUrl = video
        ? await uploadFileToFirebaseStorage(video, "PostContent")
        : null;
      const imageUrl = picture
        ? await uploadFileToFirebaseStorage(picture, "PostContent")
        : null;

      const response = await fetch(social_conveyAPI + "Posts/", {
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
      const token = localStorage.getItem("jwt_token");
      const response = await fetch(social_conveyAPI + "Posts/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Include the bearer token in the Authorization header
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          postId,
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
      const response = await fetch(social_conveyAPI + "LastPost", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const posts = await response.json();
        console.log(posts);
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

  const FilteredPosts = async (
    subject: string,
    page: number,
    pageSize: number
  ) => {
    try {
      const encodedSubject = encodeURIComponent(subject);
      const apiUrl = `${social_conveyAPI}Posts/${encodedSubject}?page=${page}&pageSize=${pageSize}`;
      console.log(apiUrl);

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const posts = await response.json();
        console.log(posts);
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
        console.log("File deleted successfully");
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
      const token = localStorage.getItem("jwt_token");

      if (comments) {
        for (const comment of comments) {
          console.log("picture", comment.commentPicture);
          console.log("video", comment.commentVideo);
          const fileToPass = comment.commentPicture
            ? comment.commentPicture
            : comment.commentVideo;
          if (fileToPass) {
            await deleteFileByDownloadUrl(fileToPass);
          }
        }
      }

      // Delete the post itself
      const postResponse = await fetch(social_conveyAPI + "Posts/" + postid, {
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
    FilteredPosts,
    DeletePost,
  };
};

export default Posts;
