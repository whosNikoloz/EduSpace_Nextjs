import React from "react";

const social_API = "https://192.168.1.68:45456/api/Social/";
const social_API_NIkoloza = "https://172.20.10.7:45456/api/Social/";

const Notifications = () => {
  const GetNotifications = async (userid: number) => {
    console.log("tried");
    try {
      const token = localStorage.getItem("jwt_token");
      const response = await fetch(social_API + "Notifications/" + userid, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Include the bearer token in the Authorization header
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const notifications = await response.json();
        return notifications;
      } else {
        const errorText = await response.text();
        console.error("Notifications Get:", errorText); // Log the error
        return errorText;
      }
    } catch (error) {
      console.error("Notifications Get error:", error); // Log the error
      return error;
    }
  };

  return {
    GetNotifications,
  };
};

export default Notifications;
