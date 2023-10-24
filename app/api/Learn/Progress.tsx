import React from "react";

const learn_API = "https://192.168.1.68:45455/api/Progress/";
const learn_API_NIkoloza = "https://172.20.10.7:45456/api/Progress/";

const Progresess = () => {
  const GetProgress = async (
    { userid }: { userid: number },
    { courseid }: { courseid: number }
  ) => {
    try {
      const token = localStorage.getItem("jwt_token");
      const apiUrl = `${learn_API}/GetProgress/?UserId=${userid}&CourseId=${courseid}`; // Construct the URL with query parameters
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Include the bearer token in the Authorization header
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const progreses = await response.json();
        return progreses;
      } else {
        const errorText = await response.text();
        console.error("Progress Get:", errorText); // Log the error
        return errorText;
      }
    } catch (error) {
      console.error("Courses Get error:", error); // Log the error
      return error;
    }
  };

  return {
    GetProgress,
  };
};

export default Progresess;
