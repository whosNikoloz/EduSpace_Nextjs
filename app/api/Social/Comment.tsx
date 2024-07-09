import "firebase/auth";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject as deleteFirebaseObject,
} from "firebase/storage";

const social_API = "https://localhost:45455/api/v1/Social/";
const social_API_NIkoloza = "https://172.20.10.7:45456/api/v1/Social/";

const docker_social_API = "https://185.139.57.56:8081/api/v1/Social/";

const social_conveyAPI = "https://widebluerock55.conveyor.cloud/api/v1/Social/";

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
            console.log(
              "File uploaded successfully. Download URL:",
              downloadURL
            );
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

      const response = await fetch(docker_social_API + "Comments/" + postid, {
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
        console.log("File deleted successfully");
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

      const response = await fetch(
        docker_social_API + "Comments/" + commentIdNumber,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
