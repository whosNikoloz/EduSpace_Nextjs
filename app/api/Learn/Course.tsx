const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL + "/api/v1/";

const Courses = () => {
  const GetCourses = async () => {
    try {
      const response = await fetch(serverUrl + `courses`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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

  const GetCourse = async (courseName: string, lang: string) => {
    try {
      const response = await fetch(
        serverUrl + "Course/" + `${courseName}?lang=${lang}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Include the bearer token in the Authorization header
          },
        }
      );
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

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  const GetCourseName = async (
    notFormattedCourseName: string,
    lang: string
  ) => {
    try {
      const response = await fetch(
        `${serverUrl}Courses/CourseName/${notFormattedCourseName}?lang=${lang}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Include other headers if needed
          },
        }
      );

      if (response.ok) {
        const courseName = await response.text();
        return courseName;
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
    GetCourseName,
  };
};

export default Courses;
