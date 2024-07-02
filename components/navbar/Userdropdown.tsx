import { useState, useEffect, useRef, ChangeEvent, ReactNode } from "react";
import { Avatar, Button, Divider, Select, SelectItem } from "@nextui-org/react";
import Link from "next/link";
import { Settingicon, LogoutIcon } from "@/components/icons";
import { motion } from "framer-motion";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

function UDropdown({
  username,
  email,
  avatar,
  logout,
  lng,
}: {
  username: string;
  email: string;
  avatar: string;
  logout: () => void;
  lng: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleDropdownClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent the event from propagating to the document level
    e.stopPropagation();
  };

  return (
    <>
      <div className="inline-block relative">
        <Button
          isIconOnly
          className="bg-transparent rounded-full"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Avatar
            isBordered
            color="primary"
            name={username}
            className={`transition-transform ${
              isOpen ? "scale-90 " : "scale-100"
            }`}
            size="sm"
            isDisabled={isOpen}
            src={avatar}
          />
        </Button>

        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={transition}
              ref={dropdownRef}
              className={`absolute  right-0 z-20 p-2 mt-2 overflow-hidden max-h-96 bg-white  dark:bg-black backdrop-blur-sm rounded-2xl border border-black/[0.2] dark:border-white/[0.2] shadow-xl origin-top-right  `}
              onClick={handleDropdownClick}
            >
              <div className="h-14 px-4 py-1 gap-2">
                <p className="font-semibold text-md">@{username}</p>
                <p className="font-semibold text-xs text-gray-500 dark:text-gray-400 ">
                  {email}
                </p>
              </div>
              <Link href="/user/profile">
                <Button
                  endContent={<Settingicon size={20} height={20} width={20} />}
                  className="px-4 py-3 text-sm w-full justify-between mt-2 text-gray-600 bg-transparent capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 dark:hover:text-white"
                >
                  {lng === "en" ? "Account Settings" : "პროფილი"}
                </Button>
              </Link>
              <Button
                color="danger"
                onClick={logout}
                className="px-4 py-3 text-sm w-full justify-between  bg-transparent  transition-colors duration-300 transform text-danger hover:bg-gray-100 dark:hover:bg-slate-700 dark:hover:text-white "
                endContent={<LogoutIcon size={20} height={20} width={20} />}
              >
                {lng === "en" ? "Log out" : "გასვლა"}
              </Button>
            </motion.div>
          </>
        )}
      </div>
    </>
  );
}

export default UDropdown;
