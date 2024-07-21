"use client";

import React, { ReactNode, useState } from "react";
import { Link, Button, Avatar, Select, SelectItem } from "@nextui-org/react";
import Notification from "@/components/navbar/Notification";
import { EduSpace } from "@/components/EduSpaceLogo.jsx";
import { useEffect } from "react";
import MultiLevelDropdown from "@/components/navbar/customlevelDropDown.jsx";
import { useUser } from "@/app/dbcontext/UserdbContext";
import UDropdown from "./Userdropdown";
import NDropdown from "./navdropdown";
import { LanguageSwitch } from "../language-switch";

export const Navbar = ({ lng, NotMain }: { lng: string; NotMain: boolean }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
  if (NotMain) {
    return (
      <>
        <nav className="flex justify-center items-center">
          <div
            className={`z-50 fixed sm:w-8/12 w-11/12  top-3  rounded-2xl transition-all duration-300 dark:backdrop-blur-lg backdrop-blur-sm dark:bg-black/10 bg-white shadow-md"
          `}
          >
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center ">
                  <Button
                    className="relative inline-flex transition-colors items-center justify-center rounded-md p-2 bg-transparent  "
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
                      stroke={isScrolled ? "currentColor" : "currentColor"}
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
                <div className="flex flex-1 items-center justify-center lg:items-stretch lg:justify-between">
                  <div className="flex flex-shrink-0  items-center">
                    <Link href={`/${lng}`}>
                      <EduSpace />
                    </Link>
                    <Link
                      href={`/${lng}`}
                      className={`font-bold text-inherit dark:text-white text-black`}
                    >
                      {" "}
                      EduSpace
                    </Link>
                  </div>
                  <div className="hidden  lg:ml-6 lg:block ">
                    <div className="flex space-x-4">
                      <MultiLevelDropdown isScrolled={true} lng={lng} />
                      <Link
                        href={`/${lng}/social`}
                        className={`p-0 bg-transparent data-[hover=true]:bg-transparent font-bold text-md dark:text-blue-500 text-blue-800`}
                      >
                        {lng === "en" ? "Social" : "სოციალური"}
                      </Link>
                      <Link
                        href={`/${lng}/compiler/csharp`}
                        className={`p-0 bg-transparent data-[hover=true]:bg-transparent font-bold text-md dark:text-white text-black `}
                      >
                        Compiler
                      </Link>
                      <LanguageSwitch />
                    </div>
                  </div>
                </div>
                <div className="pr-2 absolute inset-y-0 right-0 flex items-center   sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {user ? (
                    <>
                      <UDropdown
                        username={user.userName}
                        avatar={user.picture}
                        email={user.email}
                        logout={handleLogout}
                        lng={lng}
                      />
                      <Notification userid={user.userId} isScrolled={true} />
                    </>
                  ) : (
                    // Render this content if user is null
                    <>
                      <div className="relative ml-3">
                        <Link
                          href={`/${lng}/user/auth`}
                          aria-label="Start User Authentication"
                        >
                          <Button
                            className="bg-blue-600 text-white"
                            color="primary"
                            variant="shadow"
                          >
                            {lng === "en" ? "Start" : "დაწყება"}
                          </Button>
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <NDropdown
              Open={isMenuOpen}
              lng={lng as "en" | "ka"}
              onClose={() => setIsMenuOpen(false)}
            />
          </div>
        </nav>
      </>
    );
  } else {
    return (
      <>
        <nav className="flex justify-center items-center">
          <div
            className={`z-50 fixed  top-3 sm:w-8/12 w-11/12   rounded-2xl transition-all duration-300  ${
              isScrolled
                ? "dark:backdrop-blur-2xl backdrop-blur-sm dark:bg-black/10 bg-white shadow-md"
                : "bg-transparent"
            }`}
          >
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center ">
                  <Button
                    className="relative inline-flex transition-colors items-center justify-center rounded-md p-2 bg-transparent  "
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
                      stroke={isScrolled ? "currentColor" : "#ffff"}
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
                <div className="flex flex-1 items-center justify-center lg:items-stretch lg:justify-between">
                  <div className="flex flex-shrink-0 items-center">
                    <Link href={`/${lng}`}>
                      <EduSpace />
                    </Link>
                    <Link
                      href={`/${lng}`}
                      className={`font-bold text-inherit  ${
                        isScrolled
                          ? "dark:text-white text-black"
                          : "dark:text-white text-white"
                      }`}
                    >
                      {" "}
                      EduSpace
                    </Link>
                  </div>
                  <div className="hidden  sm:ml-6 lg:block ">
                    <div className="flex space-x-4">
                      <MultiLevelDropdown isScrolled={isScrolled} lng={lng} />
                      <Link
                        href={`/${lng}/social`}
                        className={`p-0 bg-transparent data-[hover=true]:bg-transparent transition-colors font-bold text-md ${
                          isScrolled
                            ? "dark:text-blue-500 text-blue-800"
                            : "dark:text-blue-500 text-blue-400"
                        }`}
                      >
                        {lng === "en" ? "Social" : "სოციალური"}
                      </Link>
                      <Link
                        href={`/${lng}/compiler/csharp`}
                        className={`p-0 bg-transparent data-[hover=true]:bg-transparent font-bold text-md  ${
                          isScrolled
                            ? "dark:text-white text-black"
                            : "dark:text-white text-white "
                        }`}
                      >
                        Compiler
                      </Link>
                      <LanguageSwitch />
                    </div>
                  </div>
                </div>
                <div className="pr-2 absolute inset-y-0 right-0 flex  items-center  sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {user ? (
                    <>
                      <UDropdown
                        username={user.userName}
                        avatar={user.picture}
                        email={user.email}
                        logout={handleLogout}
                        lng={lng}
                      />
                      <Notification
                        userid={user.userId}
                        isScrolled={isScrolled}
                      />
                    </>
                  ) : (
                    // Render this content if user is null
                    <>
                      <div className="relative ml-3">
                        <Link
                          href={`/${lng}/user/auth`}
                          aria-label="Start User Authentication"
                        >
                          <Button
                            className="bg-blue-600 text-white"
                            color="primary"
                            variant="shadow"
                          >
                            {lng === "en" ? "Start" : "დაწყება"}
                          </Button>
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <NDropdown
              Open={isMenuOpen}
              lng={lng as "en" | "ka"}
              onClose={() => setIsMenuOpen(false)}
            />
          </div>
        </nav>
      </>
    );
  }
};
