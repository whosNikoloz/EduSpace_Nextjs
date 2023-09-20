import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
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
import Link from "next/link.js";

function MultiLevelDropdown() {
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
    <Dropdown closeOnSelect={false} backdrop="blur">
      <DropdownTrigger>
        <Button
          disableRipple
          className="p-0 bg-transparent data-[hover=true]:bg-transparent"
          endContent={icons.chevron}
          radius="sm"
          variant="light"
        >
          სწავლა
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="ACME features"
        className="w-[340px]"
        itemClasses={{
          base: "gap-4",
        }}
      >
        <DropdownItem
          key="autoscaling"
          description="დამწყებებისათვის საუკეთესო, შესავალი პროგრამირებაში"
          startContent={icons.flash}
        >
          <Dropdown>
            <DropdownTrigger>
              <Button
                size="sm"
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={icons.chevron}
                radius="sm"
                variant="light"
              >
                შესავალი
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Dynamic Actions">
              <DropdownItem
                color="default"
                onClick={() => {
                  window.location.href = "/social";
                }}
              >
                C# შესავალი
              </DropdownItem>
              <DropdownItem
                color="default"
                onClick={() => {
                  window.location.href = "/social";
                }}
              >
                Python შესავალი
              </DropdownItem>
              <DropdownItem
                color="default"
                onClick={() => {
                  window.location.href = "/social";
                }}
              >
                C++ შესავალი
              </DropdownItem>
              <DropdownItem
                color="default"
                onClick={() => {
                  window.location.href = "/social";
                }}
              >
                Swift შესავალი
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </DropdownItem>

        <DropdownItem
          key="production_ready"
          description="გმაოცადე შენი თავი და განავითარე თავი"
          startContent={icons.user}
        >
          <Dropdown>
            <DropdownTrigger>
              <Button
                size="sm"
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={icons.chevron}
                radius="sm"
                variant="light"
              >
                შუალედური
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Dynamic Actions">
              <DropdownItem
                color="default"
                onClick={() => {
                  window.location.href = "/social";
                }}
              >
                C# შუალედური
              </DropdownItem>
              <DropdownItem
                color="default"
                onClick={() => {
                  window.location.href = "/social";
                }}
              >
                Python შუალედური
              </DropdownItem>
              <DropdownItem
                color="default"
                onClick={() => {
                  window.location.href = "/social";
                }}
              >
                C++ შუალედური
              </DropdownItem>
              <DropdownItem
                color="default"
                onClick={() => {
                  window.location.href = "/social";
                }}
              >
                Swift შუალედური
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </DropdownItem>

        <DropdownItem
          key="99_uptime"
          description="გახდი საუკეთესო პროგრამირებში"
          startContent={icons.server}
        >
          <Dropdown>
            <DropdownTrigger>
              <Button
                size="sm"
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={icons.chevron}
                radius="sm"
                variant="light"
              >
                მოწინავე
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Dynamic Actions">
              <DropdownItem
                color="default"
                onClick={() => {
                  window.location.href = "/social";
                }}
              >
                C# მოწინავე
              </DropdownItem>
              <DropdownItem
                color="default"
                onClick={() => {
                  window.location.href = "/social";
                }}
              >
                Python მოწინავე
              </DropdownItem>
              <DropdownItem
                color="default"
                onClick={() => {
                  window.location.href = "/social";
                }}
              >
                C++ მოწინავე
              </DropdownItem>
              <DropdownItem
                color="default"
                onClick={() => {
                  window.location.href = "/social";
                }}
              >
                Swift მოწინავე
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default MultiLevelDropdown;
