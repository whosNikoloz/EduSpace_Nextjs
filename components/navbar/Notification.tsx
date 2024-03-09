import { Button } from "@nextui-org/button";
import React, { useCallback, useState, useEffect, useRef } from "react";
import Notifications from "@/app/api/Social/Notification";
import { Avatar, Badge } from "@nextui-org/react";
import toast from "react-hot-toast";
import { DotsIcon, NotificationIcon, IconCheck } from "../icons";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { motion } from "framer-motion";

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

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

const Notification: React.FC<{ userid: number; isScrolled: boolean }> = ({
  userid,
  isScrolled,
}) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              } ${isScrolled ? "dark:text-white text-black" : "text-white"}`}
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
              aria-label="more than 0 notifications"
              className={` transition-transform ${
                dropdownOpen ? "scale-90 " : "scale-100"
              } ${isScrolled ? "dark:text-white text-black" : "text-white"}`}
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
            aria-label="0 notifications"
            className={` transition-transform ${
              dropdownOpen ? "scale-90 " : "scale-100"
            } ${isScrolled ? "dark:text-white text-black" : "text-white"}`}
          >
            <NotificationIcon
              isActive={dropdownOpen}
              size={24}
              height={undefined}
              width={undefined}
            />
          </Button>
        )}
        {dropdownOpen && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={transition}
              ref={dropdownRef}
              className={`absolute right-0 mt-3 h-dvh  overflow-y-scroll z-20 w-72   bg-white p-2 dark:bg-black backdrop-blur-sm rounded-2xl border border-black/[0.2] dark:border-white/[0.2] shadow-xl`}
            >
              {notifications.length === 0 ? ( // Check if there are no notifications
                <div>
                  <p className="flex items-center px-2 py-3 dark:text-white text-black  hover:bg-zinc-200  dark:hover:bg-zinc-600 ">
                    თქვენ არ გაქვთ შეტყობინება
                  </p>
                </div>
              ) : (
                <>
                  <div className="container flex justify-between">
                    <span className="p-2 text-xl">ცნობები</span>
                    <Dropdown
                      backdrop="opaque"
                      size="sm"
                      className="bg-white  dark:bg-black backdrop-blur-sm rounded-2xl border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
                    >
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
                            className="bg-transparent p-0"
                            startContent={
                              <IconCheck size={15} height={15} width={15} />
                            }
                            onClick={markAsRead}
                          >
                            ყველას მონიშვნა წაკითხულად
                          </Button>
                        </DropdownItem>
                        <DropdownItem textValue="OpenNotf">
                          <Button
                            size="sm"
                            className="bg-transparent p-0"
                            startContent={
                              <IconCheck size={15} height={15} width={15} />
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
                    <motion.div
                      key={notification.notificationId}
                      className="relative cursor-pointer"
                      initial={{ opacity: 0, y: -40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <div className={`flex items-center ml-2  py-3 `}>
                        {!notification.isRead ? (
                          <>
                            <div className=" rounded-full  absolute top-6 right-1 ">
                              <span className="relative flex">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                              </span>
                            </div>
                            <Avatar
                              isBordered
                              radius="full"
                              className="w-8 h-8"
                              as="button"
                              color="primary"
                              name={notification.commentAuthorUsername}
                              size="sm"
                              src={notification.commentAuthorPicture}
                            />
                            <p className="dark:text-white text-black text-[11px]  ml-3 mx-4">
                              <span className="font-bold">
                                {notification.commentAuthorUsername}
                              </span>{" "}
                              დატოვა კომენტარი :{" "}
                              <span className="font-bold text-blue-500">
                                {notification.message}
                              </span>
                              {"   "}
                              <span className="text-[8px]">
                                {formatTimeAgo(notification.createdAt)}
                              </span>
                            </p>
                          </>
                        ) : (
                          <>
                            <Avatar
                              isBordered
                              radius="full"
                              isDisabled
                              className="w-8 h-8"
                              as="button"
                              color="primary"
                              name={notification.commentAuthorUsername}
                              size="sm"
                              src={notification.commentAuthorPicture}
                            />
                            <p className="dark:text-slate-300 text-black text-[11px]  ml-3 mx-4">
                              <span className="font-bold">
                                {notification.commentAuthorUsername}
                              </span>{" "}
                              დატოვა კომენტარი :{" "}
                              <span className="font-bold text-blue-500">
                                {notification.message}
                              </span>
                              {"   "}
                              <span className="text-[8px]">
                                {formatTimeAgo(notification.createdAt)}
                              </span>
                            </p>
                          </>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </>
              )}
            </motion.div>
          </>
        )}
      </div>
    </>
  );
};

export default Notification;
