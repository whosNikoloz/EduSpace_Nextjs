import React from "react";

const learn_API = "https://192.168.1.68:45455/api/Learn/";
const learn_API_NIkoloza = "https://172.20.10.7:45456/api/Learn/";

const Courses = () => {
  const GetCourses = async () => {
    try {
      const token = localStorage.getItem("jwt_token");
      const response = await fetch(learn_API + "Courses/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Include the bearer token in the Authorization header
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const courses = await response.json();
        return courses;
      } else {
        const errorText = await response.text();
        console.error("Courses Get:", errorText); // Log the error
        return errorText;
      }
    } catch (error) {
      console.error("Courses Get error:", error); // Log the error
      return error;
    }
  };

  const GetCourse = async (courseName: string) => {
    try {
      const token = localStorage.getItem("jwt_token");
      const response = await fetch(learn_API + "Course/" + courseName, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Include the bearer token in the Authorization header
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const courses = await response.json();
        return courses;
      } else {
        const errorText = await response.text();
        console.error("Courses Get:", errorText); // Log the error
        return errorText;
      }
    } catch (error) {
      console.error("Courses Get error:", error); // Log the error
      return error;
    }
  };

  return {
    GetCourses,
    GetCourse,
  };
};

export default Courses;
