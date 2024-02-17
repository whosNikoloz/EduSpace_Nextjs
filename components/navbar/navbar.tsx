"use client";

import React, { useState } from "react";
import { Link, Button } from "@nextui-org/react";
import Notification from "@/components/navbar/Notification";
import { EduSpace } from "@/components/EduSpaceLogo.jsx";
import { useEffect } from "react";
import MultiLevelDropdown from "@/components/navbar/customlevelDropDown.jsx";
import { useUser } from "@/app/dbcontext/UserdbContext";
import UDropdown from "./Userdropdown";
import NDropdown from "./navdropdown";

export const Navbar = ({ lng }: { lng: string }) => {
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

  return (
    <>
      <nav
        className={`z-50 fixed w-full top-0 ${
          isScrolled
            ? "dark:backdrop-blur-lg dark:bg-black/10 bg-white shadow-md"
            : "bg-transparent"
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
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
              <div className="flex flex-shrink-0 items-center">
                <Link href="/">
                  <EduSpace />
                </Link>
                <Link
                  href="/"
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
              <div className="hidden  sm:ml-6 sm:block ">
                <div className="flex space-x-4">
                  <MultiLevelDropdown isScrolled={isScrolled} lng={lng} />
                  <Link href="/social">
                    <Button
                      disableRipple
                      className={`p-0 bg-transparent data-[hover=true]:bg-transparent  ${
                        isScrolled
                          ? "dark:text-blue-500 text-blue-800"
                          : "dark:text-blue-500 text-blue-400"
                      }`}
                      radius="sm"
                      variant="light"
                    >
                      {lng === "en" ? "Social" : "სოციალური"}
                    </Button>
                  </Link>
                  <Link href="/compiler/csharp">
                    <Button
                      disableRipple
                      className={`p-0 bg-transparent data-[hover=true]:bg-transparent  ${
                        isScrolled
                          ? "dark:text-white text-black"
                          : "dark:text-white text-white "
                      }`}
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
                  <UDropdown
                    username={user.userName}
                    avatar={user.picture}
                    email={user.email}
                    logout={handleLogout}
                  />
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
                        {lng === "en" ? "Start" : "დაწყება"}
                      </Link>
                    </Button>
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
      </nav>
    </>
  );
};
