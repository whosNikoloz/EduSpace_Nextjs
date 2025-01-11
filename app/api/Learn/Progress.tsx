const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL + "/api/v1/";

const Progresess = () => {
  const GetProgress = async (
    { userid }: { userid: number },
    { courseid }: { courseid: number }
  ) => {
    try {
      const token = localStorage.getItem("jwt");
      const apiUrl = `${serverUrl}progress/?UserId=${userid}&CourseId=${courseid}`; // Construct the URL with query parameters
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

  const CompleteLesson = async (
    userId: number,
    subjectId: number,
    courseId: number,
    lessonId: number
  ) => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await fetch(serverUrl + "complete-lesson/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          subjectId,
          courseId,
          lessonId,
        }),
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
    CompleteLesson,
  };
};

export default Progresess;
