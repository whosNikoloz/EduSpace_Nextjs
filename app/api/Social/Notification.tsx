const social_API = "https://localhost:45455/api/v1/Social/";
const social_API_NIkoloza = "https://172.20.10.7:45456/api/v1/Social/";

const docker_social_API = "http://185.139.57.56:8000/api/v1/Social/";

const social_conveyAPI = "https://widebluerock55.conveyor.cloud/api/v1/Social/";

const mac_social_API = "https://localhost:7163/api/Social/";

const Notifications = () => {
  const GetNotifications = async (userid: number) => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await fetch(
        docker_social_API + "Notifications/" + userid,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Include the bearer token in the Authorization header
            Authorization: `Bearer ${token}`,
          },
        }
      );

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

  const MarkAsReadNotf = async (userid: number) => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await fetch(
        docker_social_API + "MarkNotificationsAsRead/" + userid,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // Include the bearer token in the Authorization header
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
    MarkAsReadNotf,
  };
};

export default Notifications;
