import { Button } from "@nextui-org/button";
import React, { useState, useEffect } from "react";
import Notifications from "@/app/api/Social/Notification";
import { Badge } from "@nextui-org/react";
import { NotificationIcon } from "./NotificationIcon";
import Image from "next/image";

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
  });

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
        {notifications.length > 99 ? (
          <Badge content="99+" shape="circle" color="danger">
            <Button
              radius="full"
              isIconOnly
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-label="more than 99 notifications"
              variant="light"
            >
              <NotificationIcon
                size={24}
                height={undefined}
                width={undefined}
              />
            </Button>
          </Badge>
        ) : notifications.length > 0 ? (
          <Badge content={notifications.length} shape="circle" color="danger">
            <Button
              radius="full"
              isIconOnly
              onClick={() => setDropdownOpen(!dropdownOpen)}
              variant="light"
            >
              <NotificationIcon
                size={24}
                height={undefined}
                width={undefined}
              />
            </Button>
          </Badge>
        ) : (
          <Button
            radius="full"
            isIconOnly
            onClick={() => setDropdownOpen(!dropdownOpen)}
            variant="light"
          >
            <NotificationIcon size={24} height={undefined} width={undefined} />
          </Button>
        )}

        {dropdownOpen && (
          <div
            className="absolute right-0 mt-2 dark:bg-zinc-800 bg-white  rounded-md shadow-lg overflow-hidden z-20"
            style={{ width: "20rem", overflowY: "auto", maxHeight: "550px" }}
          >
            {notifications.length === 0 ? ( // Check if there are no notifications
              <div>
                <p className="flex items-center px-4 py-3 dark:text-white text-black  hover:bg-zinc-200  dark:hover:bg-zinc-600 mx-2">
                  თქვენ არ გაქვთ შეტყობინება
                </p>
              </div>
            ) : (
              <>
                {notifications.map((notification) => (
                  <div key={notification.notificationId}>
                    <div className="flex items-center px-4 py-3 hover:bg-zinc-200  dark:hover:bg-zinc-600 -mx-2">
                      <Image
                        className="h-8 w-8 rounded-full object-cover mx-1"
                        src={notification.commentAuthorPicture}
                        alt="avatar"
                      />
                      <p className="dark:text-white text-black text-sm mx-2">
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
                    </div>
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
