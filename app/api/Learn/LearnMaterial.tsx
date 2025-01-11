const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL + "/api/v1/";

const LearnMaterial = () => {
  const LearnMaterialByLesson = async (lessonid: number) => {
    try {
      const apiUrl = serverUrl + `learnmaterial/${lessonid}`; // Construct the URL with the lessonid parameter
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const learnMaterial = await response.json();
        return learnMaterial;
      } else {
        const errorText = await response.text();
        console.error("Learn Material Get:", errorText); // Log the error
        return errorText;
      }
    } catch (error) {
      console.error("Learn Material Get error:", error); // Log the error
      return error;
    }
  };

  return {
    LearnMaterialByLesson,
  };
};

export default LearnMaterial;
