import { Button } from "@nextui-org/button";
import React, { useState, useEffect } from "react";
import Notifications from "@/app/api/Social/Notification";

interface NotificationProps {
  notificationId: number;
  message: string;
  isRead: boolean;
  createdAt: string;
  commentAuthorUsername: string;
  commentAuthorPicture: string;
  userId: number;
}

function formatTimeAgo(timestamp: string | number | Date) {
  const currentDate = new Date();
  const inputDate = new Date(timestamp);
  const currentTime = currentDate.getTime(); // Convert currentDate to timestamp
  const inputTime = inputDate.getTime(); // Convert inputDate to timestamp
  const timeDifferenceInSeconds = Math.floor((currentTime - inputTime) / 1000);

  if (timeDifferenceInSeconds < 60) {
    return "ახლა ხანს";
  } else if (timeDifferenceInSeconds < 3600) {
    const minutes = Math.floor(timeDifferenceInSeconds / 60);
    return `${minutes} წუთის${minutes > 1 ? "" : ""} წინ`;
  } else if (timeDifferenceInSeconds < 86400) {
    const hours = Math.floor(timeDifferenceInSeconds / 3600);
    return `${hours} საათის${hours > 1 ? "" : ""} წინ`;
  } else {
    const days = Math.floor(timeDifferenceInSeconds / 86400);
    return `${days} დღის${days > 1 ? "" : ""} წინ`;
  }
}

const Notification: React.FC<{ userid: number }> = ({ userid }) => {
  const notf = Notifications();

  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  async function fetchNotifications() {
    const notifications = notf.GetNotifications(userid);
    setNotifications(await notifications);
  }

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchNotifications(); // This will run every 5 seconds
    }, 5000);
    return () => clearInterval(intervalId); // Clear interval on unmount
  }, [userid]);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <>
      <div className="relative my-32">
        <Button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          isIconOnly
          aria-label="Notification"
        >
          <svg
            className="h-5 w-5 text-gray-800"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="white"
          >
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
        </Button>

        {dropdownOpen && (
          <div
            className="absolute right-0 mt-2 dark:bg-zinc-800 bg-white  rounded-md shadow-lg overflow-hidden z-20"
            style={{ width: "20rem", overflowY: "auto", maxHeight: "650px" }}
          >
            {notifications.length === 0 ? ( // Check if there are no notifications
              <div>
                <a className="flex items-center px-4 py-3  hover:bg-zinc-600 -mx-2">
                  თქვენ არ გაქვთ შეტყობინება
                </a>
              </div>
            ) : (
              <>
                {notifications.map((notification) => (
                  <div key={notification.notificationId}>
                    <a className="flex items-center px-4 py-3  hover:bg-zinc-600 -mx-2">
                      <img
                        className="h-8 w-8 rounded-full object-cover mx-1"
                        src={notification.commentAuthorPicture}
                        alt="avatar"
                      />
                      <p className="text-white text-sm mx-2">
                        <span className="font-bold">
                          {notification.commentAuthorUsername}
                        </span>{" "}
                        დატოვა კომენტარი :{" "}
                        <span className="font-bold text-blue-500">
                          {notification.message}
                        </span>
                        {"   "}
                        {formatTimeAgo(notification.createdAt)}
                      </p>
                    </a>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Notification;
