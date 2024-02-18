import { Button } from "@nextui-org/button";
import React, { useCallback, useState, useEffect, useRef } from "react";
import Notifications from "@/app/api/Social/Notification";
import { Avatar, Badge } from "@nextui-org/react";
import toast from "react-hot-toast";
import { DotsIcon, NotificationIcon, Vector } from "../icons";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

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
  const [newNotf, setNewNotf] = useState<NotificationProps[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchNotifications = useCallback(async () => {
    const notifications = await notf.GetNotifications(userid);
    setNotifications(notifications);
  }, [userid, notf]);

  // Use an empty dependency array to make sure this effect runs only once
  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [seconddropdownOpen, setSecondDropdownOpen] = useState(false);

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(`https://localhost:7163/notificationHub?userId=${userid}`)
      .configureLogging(LogLevel.Information) // Corrected typo here
      .build();

    connection
      .start()
      .then(() => {
        console.log("Connection started!");
      })
      .catch((error) => {
        console.error("Error starting connection:", error);
      });

    connection.on("ReceiveNotification", (newNotification) => {
      setNotifications((prevNotifications) => [
        newNotification,
        ...prevNotifications,
      ]);
    });

    // Add a listener for connection close events
    connection.onclose((error) => {
      console.error("Connection closed:", error);
    });
  }, [userid]);

  const markAsRead = async () => {
    try {
      const notifications = await notf.MarkAsReadNotf(userid);
      if (typeof notifications === "string") {
        console.error("Error marking notifications as read:", notifications);
      } else {
        setNotifications(notifications);
        toast.success("ყველა წაკითხულად მონიშნულია");
      }
    } catch (error) {
      console.error("Unexpected error marking notifications as read:", error);
      // Handle unexpected errors, perhaps display a generic error message
    }
  };

  useEffect(() => {
    if (notifications && notifications.length > 0) {
      setNewNotf(notifications.filter((notf) => notf.isRead === false));
    }
  }, [notifications]);

  return (
    <>
      <div className="relative my-32">
        {newNotf.length > 99 ? (
          <Badge content="99+" shape="circle" color="danger">
            <Button
              radius="full"
              isIconOnly
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-label="more than 99 notifications"
              variant="light"
              className={` transition-transform ${
                dropdownOpen ? "scale-90 " : "scale-100"
              }`}
            >
              <NotificationIcon
                size={24}
                height={undefined}
                width={undefined}
                isActive={dropdownOpen}
              />
            </Button>
          </Badge>
        ) : newNotf.length > 0 ? (
          <Badge content={newNotf.length} shape="circle" color="danger">
            <Button
              radius="full"
              isIconOnly
              onClick={() => setDropdownOpen(!dropdownOpen)}
              variant="light"
              className={` transition-transform ${
                dropdownOpen ? "scale-90 " : "scale-100"
              }`}
            >
              <NotificationIcon
                size={24}
                height={undefined}
                width={undefined}
                isActive={dropdownOpen}
              />
            </Button>
          </Badge>
        ) : (
          <Button
            radius="full"
            isIconOnly
            onClick={() => setDropdownOpen(!dropdownOpen)}
            variant="light"
            className={` transition-transform ${
              dropdownOpen ? "scale-90 " : "scale-100"
            }`}
          >
            <NotificationIcon
              isActive={dropdownOpen}
              size={24}
              height={undefined}
              width={undefined}
            />
          </Button>
        )}

        <div
          ref={dropdownRef}
          className={`absolute right-0 mt-3  rounded-md shadow-lg overflow-hidden z-20  w-72  transition-all duration-350 ease-in-out${
            dropdownOpen
              ? "max-h-96 dark:bg-zinc-800 bg-white"
              : "max-h-0 invisible"
          }`}
        >
          {notifications.length === 0 ? ( // Check if there are no notifications
            <div>
              <p className="flex items-center px-4 py-3 dark:text-white text-black  hover:bg-zinc-200  dark:hover:bg-zinc-600 mx-2">
                თქვენ არ გაქვთ შეტყობინება
              </p>
            </div>
          ) : (
            <>
              <div className="container p-2 flex justify-between">
                <span className="p-2 text-xl">ცნობები</span>
                <Dropdown backdrop="opaque">
                  <DropdownTrigger>
                    <Button isIconOnly variant="light">
                      <DotsIcon
                        size={35}
                        fill={undefined}
                        height={undefined}
                        width={undefined}
                      />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu variant="faded" aria-label="Static Actions">
                    <DropdownItem key="new" textValue="MarkAsReadAll">
                      <Button
                        size="sm"
                        className="bg-transparent "
                        startContent={
                          <Vector size={24} height={24} width={24} />
                        }
                        onClick={markAsRead}
                      >
                        ყველას მონიშვნა წაკითხულად
                      </Button>
                    </DropdownItem>
                    <DropdownItem textValue="OpenNotf">
                      <Button
                        size="sm"
                        className="bg-transparent "
                        startContent={
                          <Vector size={24} height={24} width={24} />
                        }
                      >
                        Open Notifications
                      </Button>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                {seconddropdownOpen && <></>}
              </div>
              {notifications.map((notification) => (
                <div
                  key={notification.notificationId}
                  className="relative cursor-pointer"
                >
                  {!notification.isRead && (
                    <div className=" rounded-full  absolute top-8 right-4 ">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                      </span>
                    </div>
                  )}

                  <div
                    className={`flex items-center px-6 py-3 hover:bg-zinc-200 dark:hover:bg-zinc-600 -mx-2 `}
                  >
                    <Avatar
                      className="h-8 w-11 rounded-full object-cover mx-1"
                      isBordered
                      as="button"
                      color="primary"
                      name={notification.commentAuthorUsername}
                      size="sm"
                      src={notification.commentAuthorPicture}
                    />
                    <p className="dark:text-white text-black text-sm mx-1">
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
      </div>
    </>
  );
};

export default Notification;
