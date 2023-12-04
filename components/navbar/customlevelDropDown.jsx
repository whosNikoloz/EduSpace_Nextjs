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
import { BeginnerIcon } from "./BeginnerIcon.jsx";
import { AdvancedIcon } from "./AdvancedIcon.jsx";
import { IntermediateIcon } from "./IntermediateIcon.jsx";

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
    Beginner: <BeginnerIcon height={30} width={30} />,
    advanced: <AdvancedIcon height={30} width={30} />,
    intermediate: <IntermediateIcon height={30} width={30} />,
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
          startContent={icons.Beginner}
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
                  window.location.href = "/learn/course/c-sharp-beginner";
                }}
              >
                C# შესავალი
              </DropdownItem>
              <DropdownItem
                color="default"
                onClick={() => {
                  window.location.href = "/learn/course/python-beginner";
                }}
              >
                Python შესავალი
              </DropdownItem>
              <DropdownItem
                color="default"
                onClick={() => {
                  window.location.href = "/learn/course/c-plus-beginner";
                }}
              >
                C++ შესავალი
              </DropdownItem>
              <DropdownItem
                color="default"
                onClick={() => {
                  window.location.href = "/learn/course/swift-beginner";
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
          startContent={icons.advanced}
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
                  window.location.href = "/learn/course/c-sharp-advanced";
                }}
              >
                C# მოწინავე
              </DropdownItem>
              <DropdownItem
                color="default"
                onClick={() => {
                  window.location.href = "/learn/course/python-advanced";
                }}
              >
                Python მოწინავე
              </DropdownItem>
              <DropdownItem
                color="default"
                onClick={() => {
                  window.location.href = "/learn/course/c-plus-advanced";
                }}
              >
                C++ მოწინავე
              </DropdownItem>
              <DropdownItem
                color="default"
                onClick={() => {
                  window.location.href = "/learn/course/swift-advanced";
                }}
              >
                Swift მოწინავე
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </DropdownItem>

        <DropdownItem
          key="99_uptime"
          description="გახდი საუკეთესო პროგრამირებში"
          startContent={icons.intermediate}
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
                ექსპერტი
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Dynamic Actions">
              <DropdownItem
                color="default"
                onClick={() => {
                  window.location.href = "/learn/course/c-sharp-expert";
                }}
              >
                C# ექსპერტი
              </DropdownItem>
              <DropdownItem
                color="default"
                onClick={() => {
                  window.location.href = "/learn/course/python-expert";
                }}
              >
                Python ექსპერტი
              </DropdownItem>
              <DropdownItem
                color="default"
                onClick={() => {
                  window.location.href = "/learn/course/c-plus-expert";
                }}
              >
                C++ ექსპერტი
              </DropdownItem>
              <DropdownItem
                color="default"
                onClick={() => {
                  window.location.href = "/learn/course/swift-expert";
                }}
              >
                Swift ექსპერტი
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default MultiLevelDropdown;
