import React, { useState } from "react";
import {
  ChevronDown,
  Lock,
  Activity,
  Flash,
  Server,
  TagUser,
  Scale,
} from "../Home/Icon.jsx";
import {
  Navbar as NextUINavbar,
  Link,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { BeginnerIcon } from "./BeginnerIcon.jsx";
import { AdvancedIcon } from "./AdvancedIcon.jsx";
import { IntermediateIcon } from "./IntermediateIcon.jsx";

function SideNavBarWithDropDown() {
  const icons = {
    chevron: (
      <ChevronDown
        fill="currentColor"
        size={16}
        height={undefined}
        width={undefined}
      />
    ),
    Beginner: <BeginnerIcon height={16} width={16} />,
    advanced: <AdvancedIcon height={16} width={16} />,
    intermediate: <IntermediateIcon height={16} width={16} />,
  };

  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isSubSubMenuOpen, setIsSubSubMenuOpen] = useState(false);

  const [isSubSubMenu1Open, setIsSubSubMenu1Open] = useState(false);
  const [isSubSubMenu2Open, setIsSubSubMenu2Open] = useState(false);
  const [isSubSubMenu3Open, setIsSubSubMenu3Open] = useState(false);

  const toggleSubMenu = () => {
    // Close all other submenus when the main submenu is opened
    setIsSubSubMenu1Open(false);
    setIsSubSubMenu2Open(false);
    setIsSubSubMenu3Open(false);
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  const toggleSubSubMenu1 = () => {
    // Close all other submenus when subsubmenu 1 is opened
    setIsSubSubMenu2Open(false);
    setIsSubSubMenu3Open(false);
    setIsSubSubMenu1Open(!isSubSubMenu1Open);
  };

  const toggleSubSubMenu2 = () => {
    // Close all other submenus when subsubmenu 2 is opened
    setIsSubSubMenu1Open(false);
    setIsSubSubMenu3Open(false);
    setIsSubSubMenu2Open(!isSubSubMenu2Open);
  };

  const toggleSubSubMenu3 = () => {
    // Close all other submenus when subsubmenu 3 is opened
    setIsSubSubMenu1Open(false);
    setIsSubSubMenu2Open(false);
    setIsSubSubMenu3Open(!isSubSubMenu3Open);
  };

  return (
    <NavbarMenu>
      <NavbarMenuItem>
        <Link
          color="primary"
          className="w-full"
          size="lg"
          onClick={toggleSubMenu}
        >
          {"სწავლა"}
          {icons.chevron}
        </Link>
      </NavbarMenuItem>
      {isSubMenuOpen && (
        <NavbarMenuItem>
          <Link
            color="foreground"
            className="w-full"
            href="#"
            size="sm"
            onClick={toggleSubSubMenu1}
          >
            {icons.Beginner}
            {"შესავალი"}
            {icons.chevron}
          </Link>
          {isSubSubMenu1Open && (
            <>
              <NavbarMenuItem className="ml-8">
                <Link
                  color="foreground"
                  className="w-full"
                  href="/learn/course/c-sharp-beginner"
                  size="xs"
                >
                  {"C# შესავალი"}
                </Link>
                <Link
                  color="foreground"
                  className="w-full"
                  href="/learn/course/python-beginner"
                  size="xs"
                >
                  {"Python შესავალი"}
                </Link>
                <Link
                  color="foreground"
                  className="w-full"
                  href="/learn/course/c-plus-beginner"
                  size="xs"
                >
                  {"C++ შესავალი"}
                </Link>
                <Link
                  color="foreground"
                  className="w-full"
                  href="/learn/course/swift-beginner"
                  size="xs"
                >
                  {"Swift შესავალი"}
                </Link>
              </NavbarMenuItem>
            </>
          )}
          <Link
            color="foreground"
            className="w-full"
            href="#"
            size="sm"
            onClick={toggleSubSubMenu2}
          >
            {icons.advanced}
            {"შუალედური"}
            {icons.chevron}
          </Link>
          {isSubSubMenu2Open && (
            <>
              <NavbarMenuItem className="ml-8">
                <Link
                  color="foreground"
                  className="w-full"
                  href="/learn/course/c-sharp-intermediate"
                  size="xs"
                >
                  {"C# შუალედური"}
                </Link>
                <Link
                  color="foreground"
                  className="w-full"
                  href="/learn/course/python-intermediate"
                  size="xs"
                >
                  {"Python შუალედური"}
                </Link>
                <Link
                  color="foreground"
                  className="w-full"
                  href="/learn/course/c-plus-intermediate"
                  size="xs"
                >
                  {"C++ შუალედური"}
                </Link>
                <Link
                  color="foreground"
                  className="w-full"
                  href="/learn/course/swift-intermediate"
                  size="xs"
                >
                  {"Swift შუალედური"}
                </Link>
              </NavbarMenuItem>
            </>
          )}
          <Link
            color="foreground"
            className="w-full"
            href="#"
            size="sm"
            onClick={toggleSubSubMenu3}
          >
            {icons.intermediate}
            {" მოწინავე"}
            {icons.chevron}
          </Link>
          {isSubSubMenu3Open && (
            <>
              <NavbarMenuItem className="ml-8">
                <Link
                  color="foreground"
                  className="w-full"
                  href="/learn/course/c-sharp-advanced"
                  size="xs"
                >
                  {"C# მოწინავე"}
                </Link>
                <Link
                  color="foreground"
                  className="w-full"
                  href="/learn/course/python-advanced"
                  size="xs"
                >
                  {"Python მოწინავე"}
                </Link>
                <Link
                  color="foreground"
                  className="w-full"
                  href="/learn/course/c-plus-advanced"
                  size="xs"
                >
                  {"C++ მოწინავე"}
                </Link>
                <Link
                  color="foreground"
                  className="w-full"
                  href="/learn/course/swift-advanced"
                  size="xs"
                >
                  {"Swift მოწინავე"}
                </Link>
              </NavbarMenuItem>
            </>
          )}
        </NavbarMenuItem>
      )}
      <NavbarMenuItem>
        <Link color="foreground" className="w-full" href="/social" size="lg">
          {"სოციალური"}
        </Link>
      </NavbarMenuItem>
      <NavbarMenuItem>
        <Link
          color="foreground"
          className="w-full"
          href="/compiler/csharp"
          size="lg"
        >
          {"compiler"}
        </Link>
      </NavbarMenuItem>
    </NavbarMenu>
  );
}

export default SideNavBarWithDropDown;
