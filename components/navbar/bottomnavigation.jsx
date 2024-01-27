import React, { useState } from "react";
import { ChevronDown } from "../Home/Icon.jsx";
import {
  Navbar as NextUINavbar,
  Link,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { IntermediateIcon } from "./IntermediateIcon.jsx";
import { SocialIcon } from "./SocialIcon.jsx";
import { CompilerIcon } from "./CompilerIcon.jsx";

function BottomNavigation() {
  return (
    <>
      <div className="fixed z-50 w-full h-14  max-w-lg -translate-x-1/2  bg-white border border-blue-600 rounded-full bottom-4 left-1/2 dark:bg-white/30 dark:border-blue-600 backdrop-blur-sm ">
        <div className="grid h-full max-w-lg grid-cols-3 mx-auto">
          <Link
            href="/social"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <SocialIcon width={26} height={26} />
            <span className="sr-only">Wallet</span>
          </Link>
          <div className="flex items-center justify-center">
            <Link
              href=""
              className="inline-flex items-center justify-center w-10 h-10 font-medium bg-trans rounded-full hover:bg-blue-700 group "
            >
              <IntermediateIcon width={35} height={35} />
              <span className="sr-only">New item</span>
            </Link>
          </div>
          <Link
            href="/compiler/csharp"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <CompilerIcon width={26} height={26} />
            <span className="sr-only">Settings</span>
          </Link>
        </div>
      </div>
    </>
  );
}

export default BottomNavigation;
