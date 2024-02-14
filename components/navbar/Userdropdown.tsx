import { useState, useEffect, useRef } from "react";
import { Avatar, Button } from "@nextui-org/react";
import Link from "next/link";
import { Settingicon } from "../icons";

function UDropdown({
  username,
  email,
  avatar,
  logout,
}: {
  username: string;
  email: string;
  avatar: string;
  logout: () => void;
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
      <div className="relative inline-block ">
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
          <div
            ref={dropdownRef}
            className="absolute right-0 z-20 py-1 px-1 mt-2 transition-all duration-300 ease-in-out origin-top-right bg-white rounded-xl shadow-xl dark:bg-[#18181B] "
            onClick={handleDropdownClick}
          >
            <div className="h-14 px-4 py-1 gap-2">
              <p className="font-semibold text-md">@{username}</p>
              <p className="font-semibold text-sm text-gray-300">{email}</p>
            </div>
            <Link href="/user/profile">
              <Button
                endContent={<Settingicon size={20} height={20} width={20} />}
                className="px-4 py-3 text-sm w-full justify-between text-gray-600 bg-transparent capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                პარამეტრები
              </Button>
            </Link>
            <Button
              color="danger"
              onClick={logout}
              className="block px-4 py-3 w-full text-start text-sm bg-transparent text-danger hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white transition-colors duration-300 transform"
            >
              გამოსვლა
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

export default UDropdown;
