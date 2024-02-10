import React from "react";

const learn_API = "https://localhost:45455/api/Learn/";
const learn_API_NIkoloza = "https://172.20.10.7:45455/api/Learn/";

const learn_conveyAPI = "https://othergreencat21.conveyor.cloud/api/Learn/";

const mac_learn_API = "https://localhost:7163/api/Learn/";

const LearnMaterial = () => {
  const LearnMaterialByLesson = async (lessonid: number) => {
    try {
      const apiUrl = learn_API + `LearnMaterialByLesson/${lessonid}`; // Construct the URL with the lessonid parameter
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
