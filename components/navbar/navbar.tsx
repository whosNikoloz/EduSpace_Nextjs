import React, { useState } from "react";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import Notification from "@/components/navbar/Notification";
import {
  ChevronDown,
  Lock,
  Activity,
  Flash,
  Server,
  TagUser,
  Scale,
} from "../Home/Icon.jsx";
import { EduSpace } from "@/components/EduSpaceLogo.jsx";
import { SearchIcon } from "@/components/navbar/SearchIcon.jsx";
import { useEffect } from "react";
import { Skeleton } from "@nextui-org/react";
import MultiLevelDropdown from "@/components/navbar/customlevelDropDown.jsx";
import SideNavBarWithDropDown from "@/components/navbar/sidenavbar.jsx";
import { useUser } from "@/app/dbcontext/UserdbContext";
import Notifications from "@/app/api/Social/Notification";
import BottomNavigation from "@/components/navbar/bottomnavigation.jsx";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useUser();

  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const notf = Notifications();

  useEffect(() => {
    // Simulate loading for demonstration purposes
    setTimeout(() => {
      setIsLoading(false);
    }, 1); // Replace with your actual data fetching logic
  }, []);

  useEffect(() => {
    async function fetchNotifications() {
      if (user) {
        const notifications = notf.GetNotifications(user.userId);
        setNotifications(await notifications);
      }
    }
    fetchNotifications();
  });

  const handleLogout = () => {
    logout();
  };

  return (
    <NextUINavbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent justify="start">
        <NavbarBrand>
          <Link href="/">
            <EduSpace />
          </Link>
          <Link href="/" className="font-bold text-inherit">
            {" "}
            EduSpace
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <MultiLevelDropdown />

        <NavbarItem isActive>
          <Link href="/social" aria-current="page">
            სოციალური
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/compiler/csharp">
            Compiler
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        {/* <NavbarContent justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="ძებნა"
          size="sm"
          startContent={
            <SearchIcon size={18} width={undefined} height={undefined} />
          }
          type="search"
        />
        </NavbarContent>
        */}

        {isLoading ? (
          <>
            <NavbarItem>
              <div className="max-w-[300px] w-full flex items-center gap-3">
                <div>
                  <div className="flex items-center mt-4 space-x-3 mb-2.5 animate-pulse">
                    <svg
                      className="w-10 h-10 text-gray-200 dark:text-gray-700"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </NavbarItem>
          </>
        ) : (
          <>
            {user ? (
              // Render this content if user is not null
              <>
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <Avatar
                      isBordered
                      as="button"
                      className="transition-transform"
                      color="primary"
                      name={user.userName}
                      size="sm"
                      src={user.picture}
                    />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2">
                      <p className="font-semibold">შესულიხარ როგორც</p>
                      <p className="font-semibold">{user.userName}</p>
                    </DropdownItem>
                    <DropdownItem key="settings">
                      <Link href={`/user/profile`}>პარამეტრები</Link>
                    </DropdownItem>

                    <DropdownItem key="help_and_feedback">
                      დახმარება
                    </DropdownItem>
                    <DropdownItem
                      key="logout"
                      color="danger"
                      onClick={handleLogout}
                    >
                      გამოსვლა
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <Notification userid={user.userId} />
              </>
            ) : (
              // Render this content if user is null
              <>
                <NavbarItem>
                  <Link href="/user/auth">
                    <Button
                      className="bg-blue-600 text-white"
                      as={Link}
                      color="primary"
                      variant="shadow"
                    >
                      დაწყება
                    </Button>
                  </Link>
                </NavbarItem>
              </>
            )}
          </>
        )}
      </NavbarContent>
    </NextUINavbar>
  );
};
