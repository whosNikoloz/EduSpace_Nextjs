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
import { BeginnerIcon } from "./BeginnerIcon.jsx";
import { AdvancedIcon } from "./AdvancedIcon.jsx";
import { IntermediateIcon } from "./IntermediateIcon.jsx";
import { CompilerIcon } from "./CompilerIcon.jsx";

const DropDownItems = [
  {
    label: "შესავალი",
    svg: BeginnerIcon,
    submenus: [
      { title: "C# შესავალი", link: "/learn/course/c-sharp-beginner" },
      { title: "Python შესავალი", link: "/python" },
      { title: "C++ შესავალი", link: "/cpp" },
      { title: "Swift შესავალი", link: "/swift" },
    ],
  },
  ,
  {
    label: "მოწინავე",
    svg: IntermediateIcon,
    submenus: [
      { title: "C# მოწინავე", link: "/csharp" },
      { title: "Python მოწინავე", link: "/python" },
      { title: "C++ მოწინავე", link: "/cpp" },
      { title: "Swift მოწინავე", link: "/swift" },
    ],
  },
  {
    label: "ექსპერტი",
    svg: AdvancedIcon,
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
          isScrolled ? "backdrop-blur-lg bg-black/10" : "bg-transparent"
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
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>

                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
                      className="p-0 bg-transparent data-[hover=true]:bg-transparent text-blue-500"
                      radius="sm"
                      variant="light"
                    >
                      სოციალური
                    </Button>
                  </Link>
                  <Link href="/compiler/csharp">
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
              {user ? (
                <>
                  <Notification userid={user.userId} />
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
                      <DropdownItem key="settings" textValue="settings">
                        <Link href={"/user/profile"}>პარამეტრები</Link>
                      </DropdownItem>
                      <DropdownItem
                        key="logout"
                        color="danger"
                        onClick={handleLogout}
                        textValue="logout"
                      >
                        გამოსვლა
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </>
              ) : (
                // Render this content if user is null
                <>
                  <div className="relative ml-3">
                    <Button
                      className="bg-blue-600 text-white"
                      color="primary"
                      variant="shadow"
                    >
                      <Link href="/user/auth" className="text-white text-sm">
                        დაწყება
                      </Link>
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden sm:hidden w-full  ${
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
                      viewBox="0 0 1024 1024"
                      fill="currentColor"
                      version="1.1"
                      className="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path d="M513.147 584.708c-15.947 0-39.468-1.747-61.040-10.031l-172.596-66.501h-84.542v103.565c0 31.84 23.684 67.975 52.884 80.663l208.987 90.967c29.2 12.688 76.605 12.743 105.841 0.127l211.263-91.222c29.218-12.615 52.921-48.697 52.921-80.537v-103.565h-93.298l-152.954 64.48c-18.386 7.773-42.38 12.051-67.466 12.051zM46.313 372.991l416.19 160.363c29.728 11.433 77.605 10.686 106.951-1.693l397.458-167.536v247.18l-24.558 81.938h71.015l-25.413-82.794v-256.319h-0.71c17.167-11.833 13.162-26.596-12.252-35.681l-404.357-143.888c-30.001-10.704-78.479-10.25-108.299 0.946l-415.844 156.449c-29.819 11.214-29.891 29.6-0.182 41.033z"></path>
                      </g>
                    </svg>
                    <span className="flex-1 ml-3 text-left whitespace-nowrap">
                      სწავლა
                    </span>
                    <svg
                      className={`w-6 h-6 transform transition-transform duration-300 ${
                        isDropDownOpen ? "rotate-180" : "rotate-0"
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
                          {item?.svg && (
                            <item.svg height={24} width={24} size={24} />
                          )}
                          <span className="flex-1 ml-3 text-left whitespace-nowrap">
                            {item?.label ?? ""}
                          </span>
                          <svg
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
                                <li className="px-10">
                                  <Link
                                    href={submenu.link || "#"}
                                    className="flex items-center w-full p-2 text-base font-normal bg-transparent transition duration-75 rounded-lg group"
                                  >
                                    <span className="flex-1 ml-3 text-left whitespace-nowrap text-white">
                                      {submenu.title}
                                    </span>
                                  </Link>
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
                  <Link
                    href="/compiler/csharp"
                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <CompilerIcon size={24} height={24} width={24} />
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Compiler
                    </span>
                    <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">
                      3
                    </span>
                  </Link>
                </li>
              </Reveal>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
