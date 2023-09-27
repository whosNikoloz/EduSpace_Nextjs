import React, { useState } from "react";

interface NotificationProps {
  notifications: {
    notificationId: number;
    message: string;
    isRead: boolean;
    createdAt: string;
    commentAuthorUsername: string;
    commentAuthorPicture: string;
    userId: number;
  }[];
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

const Notification: React.FC<NotificationProps> = ({ notifications }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  console.log(notifications);
  //formatTimeAgo(notification.createdAt)
  return (
    <>
      <div className="relative my-32">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="relative z-10 block rounded-md bg-white p-2 focus:outline-none"
        >
          <svg
            className="h-5 w-5 text-gray-800"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
        </button>

        {dropdownOpen && (
          <div
            className="absolute right-0 mt-2 bg-white rounded-md shadow-lg overflow-hidden z-20"
            style={{ width: "20rem" }}
          >
            {notifications &&
              notifications.map((notification) => (
                <div key={notification.notificationId}>
                  <a className="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2">
                    <img
                      className="h-8 w-8 rounded-full object-cover mx-1"
                      src={notification.commentAuthorPicture}
                      alt="avatar"
                    />
                    <p className="text-gray-600 text-sm mx-2">
                      <span className="font-bold">
                        {notification.commentAuthorUsername}
                      </span>{" "}
                      replied on the{" "}
                      <span className="font-bold text-blue-500">
                        {notification.message}
                      </span>{" "}
                      . {formatTimeAgo(notification.createdAt)}
                    </p>
                  </a>
                </div>
              ))}
            <a className="block bg-gray-800 text-white text-center font-bold py-2">
              See all notifications
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default Notification;
