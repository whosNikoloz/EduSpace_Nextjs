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
import { NotificationIcon } from "@/components/navbar/NotificationIcon.jsx";
import { Skeleton } from "@nextui-org/react";
import MultiLevelDropdown from "@/components/navbar/customlevelDropDown.jsx";
import SideNavBarWithDropDown from "@/components/navbar/sidenavbar.jsx";
import { useUser } from "@/app/context/UserdbContext";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useUser();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for demonstration purposes
    setTimeout(() => {
      setIsLoading(false);
    }, 1); // Replace with your actual data fetching logic
  }, []);

  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  const handleLogout = () => {
    logout();
  };

  const icons = {
    chevron: (
      <ChevronDown
        fill="currentColor"
        size={16}
        height={undefined}
        width={undefined}
      />
    ),
    scale: (
      <Scale
        className="text-warning"
        fill="currentColor"
        size={30}
        height={undefined}
        width={undefined}
      />
    ),
    lock: (
      <Lock
        className="text-success"
        fill="currentColor"
        size={30}
        height={undefined}
        width={undefined}
      />
    ),
    activity: (
      <Activity
        className="text-secondary"
        fill="currentColor"
        size={30}
        height={undefined}
        width={undefined}
      />
    ),
    flash: (
      <Flash
        className="text-primary"
        fill="currentColor"
        size={30}
        height={undefined}
        width={undefined}
      />
    ),
    server: (
      <Server
        className="text-success"
        fill="currentColor"
        size={30}
        height={undefined}
        width={undefined}
      />
    ),
    user: (
      <TagUser
        className="text-danger"
        fill="currentColor"
        size={30}
        height={undefined}
        width={undefined}
      />
    ),
  };

  return (
    <NextUINavbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <EduSpace />
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
          <Link color="foreground" href="#">
            Compiler
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
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

        {isLoading ? (
          <>
            <div className="max-w-[300px] w-full flex items-center gap-3">
              <div>
                <div className="flex items-center mt-4 space-x-3 mb-2.5">
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
                      <p className="font-semibold">{user.email}</p>
                    </DropdownItem>
                    <DropdownItem key="settings">პარამეტრები</DropdownItem>
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
                <Dropdown backdrop="blur" children={[]}></Dropdown>
              </>
            ) : (
              // Render this content if user is null
              <>
                <NavbarItem>
                  <Button
                    className="bg-blue-600 text-white"
                    as={Link}
                    color="primary"
                    href="users/auth"
                    variant="ghost"
                  >
                    დაწყება
                  </Button>
                </NavbarItem>
              </>
            )}
          </>
        )}
      </NavbarContent>
      <SideNavBarWithDropDown />
    </NextUINavbar>
  );
};
