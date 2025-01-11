const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL + "/api/v1/";

const Notifications = () => {
  const GetNotifications = async (userid: number) => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await fetch(serverUrl + "notifications/" + userid, {
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

  const MarkAsReadNotf = async (userid: number) => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await fetch(
        serverUrl + "MarkNotificationsAsRead/" + userid,
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
