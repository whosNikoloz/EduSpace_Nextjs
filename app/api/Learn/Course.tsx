const learn_API = "https://localhost:45455/api/v1/Learn/";
const learn_API_NIkoloza = "https://172.20.10.7:45455/api/v1/Learn/";

const learn_conveyAPI = "https://othergreencat21.conveyor.cloud/api/v1/Learn/";

const Courses = () => {
  const GetCourses = async (lang: string) => {
    try {
      const response = await fetch(learn_API + `Courses?lang=${lang}`, {
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
        learn_API + "Course/" + `${courseName}?lang=${lang}`,
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
        `${learn_API}Courses/CourseName/${notFormattedCourseName}?lang=${lang}`,
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
