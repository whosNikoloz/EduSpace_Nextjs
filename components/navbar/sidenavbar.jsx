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
            {icons.flash}
            {"შესავალი"}
            {icons.chevron}
          </Link>
          {isSubSubMenu1Open && (
            <>
              <NavbarMenuItem className="ml-8">
                <Link color="foreground" className="w-full" href="#" size="xs">
                  {"C# შესავალი"}
                </Link>
                <Link color="foreground" className="w-full" href="#" size="xs">
                  {"Python შესავალი"}
                </Link>
                <Link color="foreground" className="w-full" href="#" size="xs">
                  {"C++ შესავალი"}
                </Link>
                <Link color="foreground" className="w-full" href="#" size="xs">
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
            {icons.user}
            {"შუალედური"}
            {icons.chevron}
          </Link>
          {isSubSubMenu2Open && (
            <>
              <NavbarMenuItem className="ml-8">
                <Link color="foreground" className="w-full" href="#" size="xs">
                  {"C# შუალედური"}
                </Link>
                <Link color="foreground" className="w-full" href="#" size="xs">
                  {"Python შუალედური"}
                </Link>
                <Link color="foreground" className="w-full" href="#" size="xs">
                  {"C++ შუალედური"}
                </Link>
                <Link color="foreground" className="w-full" href="#" size="xs">
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
            {icons.server}
            {"მოწინავე"}
            {icons.chevron}
          </Link>
          {isSubSubMenu3Open && (
            <>
              <NavbarMenuItem className="ml-8">
                <Link color="foreground" className="w-full" href="#" size="xs">
                  {"C# მოწინავე"}
                </Link>
                <Link color="foreground" className="w-full" href="#" size="xs">
                  {"Python მოწინავე"}
                </Link>
                <Link color="foreground" className="w-full" href="#" size="xs">
                  {"C++ მოწინავე"}
                </Link>
                <Link color="foreground" className="w-full" href="#" size="xs">
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
        <Link color="foreground" className="w-full" href="#" size="lg">
          {"compiler"}
        </Link>
      </NavbarMenuItem>
    </NavbarMenu>
  );
}

export default SideNavBarWithDropDown;
