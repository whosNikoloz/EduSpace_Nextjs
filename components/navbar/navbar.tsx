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
import { EduSpace } from "@/components/EduSpaceLogo.jsx";
import { SearchIcon } from "@/components/navbar/SearchIcon.jsx";
import { useEffect } from "react";
import { Skeleton } from "@nextui-org/react";
import MultiLevelDropdown from "@/components/navbar/customlevelDropDown.jsx";
import SideNavBarWithDropDown from "@/components/navbar/sidenavbar.jsx";
import { useUser } from "@/app/dbcontext/UserdbContext";
import { Reveal } from "../RevealFramer";

const DropDownItems = [
  {
    label: "შესავალი",
    submenus: [
      { title: "C# შესავალი", link: "/csharp" },
      { title: "Python შესავალი", link: "/python" },
      { title: "C++ შესავალი", link: "/cpp" },
      { title: "Swift შესავალი", link: "/swift" },
    ],
  },
  ,
  {
    label: "მოწინავე",
    submenus: [
      { title: "C# მოწინავე", link: "/csharp" },
      { title: "Python მოწინავე", link: "/python" },
      { title: "C++ მოწინავე", link: "/cpp" },
      { title: "Swift მოწინავე", link: "/swift" },
    ],
  },
  {
    label: "ექსპერტი",
    submenus: [
      { title: "C# ექსპერტი", link: "/csharp" },
      { title: "Python ექსპერტი", link: "/python" },
      { title: "C++ ექსპერტი", link: "/cpp" },
      { title: "Swift ექსპერტი", link: "/swift" },
    ],
  },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const { user, logout } = useUser();

  const [isScrolled, setIsScrolled] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for demonstration purposes
    setTimeout(() => {
      setIsLoading(false);
    }, 1); // Replace with your actual data fetching logic
  }, []);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const isScrolled = scrollY > 50; // Adjust the scroll threshold as needed

    setIsScrolled(isScrolled);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logout();
  };

  const [openMenuIndex, setOpenMenuIndex] = useState(null);

  const handleMenuClick = (index: any) => {
    setOpenMenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      <nav
        className={`z-50 fixed w-full top-0 ${
          isScrolled ? "backdrop-blur-md bg-black/30" : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center ">
              <Button
                className="relative inline-flex items-center justify-center rounded-md p-2 bg-transparent  "
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                isIconOnly
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>

                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>

                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
              <div className="flex flex-shrink-0 items-center">
                <Link href="/">
                  <EduSpace />
                </Link>
                <Link href="/" className="font-bold text-inherit">
                  {" "}
                  EduSpace
                </Link>
              </div>
              <div className="hidden  sm:ml-6 sm:block ">
                <div className="flex space-x-4">
                  <MultiLevelDropdown />
                  <Link href="/social">
                    <Button
                      disableRipple
                      className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                      radius="sm"
                      variant="light"
                    >
                      სოციალური
                    </Button>
                  </Link>
                  <Link href="/compiler">
                    <Button
                      disableRipple
                      className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                      radius="sm"
                      variant="light"
                    >
                      Compiler
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="pr-2 absolute inset-y-0 right-0 flex items-center  sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {isLoading ? (
                <>
                  <div className="relative ml-3">
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
                  </div>
                </>
              ) : (
                <>
                  {user ? (
                    <>
                      <Notification userid={user.userId} />
                      <div className="relative ml-3">
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
                          <DropdownMenu
                            aria-label="Profile Actions"
                            variant="flat"
                          >
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
                      </div>
                    </>
                  ) : (
                    // Render this content if user is null
                    <>
                      <div className="relative ml-3">
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
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden sm:hidden w-full ${
            isMenuOpen ? "max-h-[700px]" : "max-h-0"
          }`}
        >
          <div
            className={`px-3 py-4 overflow-y-auto rounded ${
              isScrolled ? "bg-transparent" : "backdrop-blur-lg bg-black/30"
            }`}
          >
            <ul className="space-y-2 ">
              <Reveal delay={0.1} direction="down">
                <li>
                  <Button
                    className="flex items-center w-full p-2 text-base font-normal bg-transparent  transition duration-75 rounded-lg group"
                    onClick={() => setIsDropDownOpen(!isDropDownOpen)}
                  >
                    <svg
                      className={`flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white `}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span
                      className="flex-1 ml-3 text-left whitespace-nowrap"
                      sidebar-toggle-item
                    >
                      სწავლა
                    </span>
                    <svg
                      sidebar-toggle-item
                      className={`w-6 h-6 transform transition-transform duration-300 ${
                        isDropDownOpen ? "rotate-180" : "rotate-0"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </Button>
                  <ul
                    className={`transition-all space-y-2 duration-300 ease-in-out overflow-hidden px-4 ${
                      isDropDownOpen ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    {DropDownItems.map((item, index) => (
                      <li key={index}>
                        <Button
                          className="flex items-center w-full p-2 text-base font-normal bg-transparent transition duration-75 rounded-lg group"
                          onClick={() => handleMenuClick(index)}
                        >
                          <span
                            className="flex-1 ml-3 text-left whitespace-nowrap"
                            sidebar-toggle-item
                          >
                            {item?.label ?? ""}
                          </span>
                          <svg
                            sidebar-toggle-item
                            className={`w-6 h-6 transform transition-transform duration-300 ${
                              openMenuIndex === index
                                ? "rotate-180"
                                : "rotate-0"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </Button>
                        {openMenuIndex === index && item?.submenus && (
                          <ul className="space-y-2 ">
                            {item?.submenus.map((submenu, subIndex) => (
                              <Reveal
                                key={subIndex}
                                delay={subIndex * 0.1}
                                direction="right"
                              >
                                <li className="px-4">
                                  <a
                                    href={submenu.link || "#"}
                                    className="flex items-center w-full p-2 text-base font-normal bg-transparent transition duration-75 rounded-lg group"
                                  >
                                    <span
                                      className="flex-1 ml-3 text-left whitespace-nowrap"
                                      sidebar-toggle-item
                                    >
                                      {submenu.title}
                                    </span>
                                  </a>
                                </li>
                              </Reveal>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
              </Reveal>
              <Reveal delay={0.2} direction="down">
                <li>
                  <Link
                    href="/social"
                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <svg
                      className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                    </svg>
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      სოციალური
                    </span>
                    <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                      Pro
                    </span>
                  </Link>
                </li>
              </Reveal>
              <Reveal delay={0.3} direction="down">
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <svg
                      className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                      <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                    </svg>
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Compiler
                    </span>
                    <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">
                      3
                    </span>
                  </a>
                </li>
              </Reveal>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
