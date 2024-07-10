import Link from "next/link";
import { useState, useRef, useEffect, ReactNode, ChangeEvent } from "react";
import {
  Csharp,
  Cpp,
  Python,
  SocialIcon,
  CompilerIcon,
  MoonFilledIcon,
  SunFilledIcon,
  SystemIcon,
  Settingicon,
} from "../icons";
import { Reveal } from "../RevealFramer";
import { Avatar, Button, Divider, Select, SelectItem } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";

const DropDownItems = {
  en: [
    {
      label: "Beginner",
      svg: Csharp,
      submenus: [
        { title: "C# Beginner", link: "/learn/course/csharp-beginner" },
        { title: "Python Beginner", link: "/python" },
        { title: "C++ Beginner", link: "/cpp" },
        { title: "Swift Beginner", link: "/swift" },
      ],
    },
    ,
    {
      label: "Advanced",
      svg: Cpp,
      submenus: [
        { title: "C# Advanced", link: "/csharp" },
        { title: "Python Advanced", link: "/python" },
        { title: "C++ Advanced", link: "/cpp" },
        { title: "Swift Advanced", link: "/swift" },
      ],
    },
    {
      label: "Expert",
      svg: Python,
      submenus: [
        { title: "C# Expert", link: "/csharp" },
        { title: "Python Expert", link: "/python" },
        { title: "C++ Expert", link: "/cpp" },
        { title: "Swift Expert", link: "/swift" },
      ],
    },
  ],
  ka: [
    {
      label: "შესავალი",
      svg: Csharp,
      submenus: [
        { title: "C# შესავალი", link: "/learn/course/csharp-beginner" },
        { title: "Python შესავალი", link: "/python" },
        { title: "C++ შესავალი", link: "/cpp" },
        { title: "Swift შესავალი", link: "/swift" },
      ],
    },
    ,
    {
      label: "მოწინავე",
      svg: Cpp,
      submenus: [
        { title: "C# მოწინავე", link: "/csharp" },
        { title: "Python მოწინავე", link: "/python" },
        { title: "C++ მოწინავე", link: "/cpp" },
        { title: "Swift მოწინავე", link: "/swift" },
      ],
    },
    {
      label: "ექსპერტი",
      svg: Python,
      submenus: [
        { title: "C# ექსპერტი", link: "/csharp" },
        { title: "Python ექსპერტი", link: "/python" },
        { title: "C++ ექსპერტი", link: "/cpp" },
        { title: "Swift ექსპერტი", link: "/swift" },
      ],
    },
  ],
};

const menuItems = {
  en: [
    { label: "Learn", href: null, submenu: DropDownItems["en"] },
    {
      label: "Social",
      href: "/social",
      svg: (
        <SocialIcon
          fill={undefined}
          size={undefined}
          height={undefined}
          width={undefined}
        />
      ),
      submenu: [],
    },
    {
      label: "Compiler",
      href: "/compiler/csharp",
      svg: (
        <CompilerIcon size={undefined} height={undefined} width={undefined} />
      ),
      submenu: [],
    },
  ],
  ka: [
    { label: "სწავლა", href: null, submenu: DropDownItems["ka"] },
    {
      label: "სოციალური",
      href: "/social",
      svg: (
        <SocialIcon
          fill={undefined}
          size={undefined}
          height={undefined}
          width={undefined}
        />
      ),
      submenu: [],
    },
    {
      label: "Compiler",
      href: "/compiler/csharp",
      svg: (
        <CompilerIcon size={undefined} height={undefined} width={undefined} />
      ),
      submenu: [],
    },
  ],
};

function NDropdown({
  Open,
  onClose,
  lng,
}: {
  Open: boolean;
  lng: keyof typeof menuItems;
  onClose: () => void;
}) {
  const LngmenuItems = menuItems[lng];
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const [openMenuIndex, setOpenMenuIndex] = useState(null);

  const handleMenuClick = (index: any) => {
    setOpenMenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  const { resolvedTheme, theme, setTheme } = useTheme();

  const [startCon, setStartCon] = useState<ReactNode>(null);
  const [lngstartCon, setLngstartCon] = useState<ReactNode>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        Open
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [Open, onClose]);

  useEffect(() => {
    switch (theme) {
      case "dark":
        setStartCon(<MoonFilledIcon size={20} height={20} width={20} />);
        break;
      case "light":
        setStartCon(<SunFilledIcon size={20} height={20} width={20} />);
        break;
      case "system":
        setStartCon(<SystemIcon size={20} height={20} width={20} />);
        break;
      default:
        setStartCon(<Settingicon size={20} height={20} width={20} />);
        break;
    }
  }, [theme]);

  useEffect(() => {
    switch (lng) {
      case "ka":
        setLngstartCon(
          <Avatar
            alt="Georgia"
            className="w-5 h-5 bg-transparent"
            src="https://flagsapi.com/GE/flat/64.png"
          />
        );
        break;
      case "en":
        setLngstartCon(
          <Avatar
            alt="English"
            className="w-5 h-5 bg-transparent"
            src="https://flagsapi.com/US/flat/64.png"
          />
        );
        break;
    }
  }, [lng]);

  const handleDropdownClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent the event from propagating to the document level
    e.stopPropagation();
  };

  const handleThemeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = event.target.value;

    switch (selectedTheme) {
      case "dark":
        setTheme("dark");
        break;
      case "light":
        setTheme("light");
        break;
      case "system":
        setTheme("system");
        break;
      default:
        console.log("Invalid theme");
        break;
    }
  };

  const pathName = usePathname();
  const router = useRouter();

  const handleLanguageChange = (selectedLanguage: string) => {
    if (!pathName) return "/";

    // Check if the path already contains the selected language
    if (pathName.startsWith("/" + selectedLanguage + "/")) return pathName;

    // Find the index of the second occurrence of "/"
    const secondSlashIndex = pathName.indexOf("/", 1);

    if (secondSlashIndex !== -1) {
      // Replace the language segment with the selected language
      const newPath =
        "/" + selectedLanguage + pathName.substring(secondSlashIndex);
      router.push(newPath);
      return newPath;
    }

    // If there's no second occurrence of "/", just append the selected language
    const newPath = "/" + selectedLanguage;
    router.push(newPath);
    return newPath;
  };

  return (
    <>
      <div
        ref={dropdownRef}
        onClick={handleDropdownClick}
        className={`transition-all  ease-in-out overflow-hidden lg:hidden w-full  ${
          Open ? "max-h-[700px]" : "max-h-0"
        }`}
      >
        <div
          className={`px-3 py-4 overflow-y-auto rounded-b-2xl  dark:backdrop-blur-2xl backdrop-blur-sm dark:bg-black/10 bg-white shadow-md p-2    `}
        >
          <ul className="space-y-3">
            {LngmenuItems.map((item, index) => (
              <li key={index}>
                {item.href ? (
                  <>
                    <Link
                      href={item.href}
                      className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {item.svg}
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        {item.label}
                      </span>
                    </Link>
                  </>
                ) : (
                  <>
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
                        {item.label ?? ""}
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
                      {item.submenu.map((item, index) => (
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
                                      <span className="flex-1 ml-3 text-left whitespace-nowrap dark:text-white text-black">
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
                  </>
                )}
              </li>
            ))}
            <Divider className="my-4 " />
            <div className="flex gap-4  justify-between ">
              <p className="px-4 py-3 text-sm   text-gray-600 bg-transparent capitalize  dark:text-gray-300   ">
                Theme
              </p>
              <Select
                className="w-[150px]"
                size="sm"
                variant="underlined"
                onChange={handleThemeChange}
                aria-label="Select theme"
                labelPlacement="outside"
                defaultSelectedKeys={[theme || "system"]}
                startContent={startCon}
              >
                <SelectItem
                  key="dark"
                  value={"dark"}
                  startContent={
                    <MoonFilledIcon size={20} height={20} width={20} />
                  }
                >
                  Dark
                </SelectItem>
                <SelectItem
                  key="light"
                  value={"light"}
                  startContent={
                    <SunFilledIcon size={20} height={20} width={20} />
                  }
                >
                  Light
                </SelectItem>
                <SelectItem
                  key="system"
                  value={"system"}
                  startContent={<SystemIcon size={20} height={20} width={20} />}
                >
                  System
                </SelectItem>
              </Select>
            </div>
            <div className="flex justify-between">
              <p className="px-4 py-3 text-sm   text-gray-600 bg-transparent capitalize  dark:text-gray-300   ">
                Language
              </p>
              <Select
                className="w-[150px]"
                size="sm"
                variant="underlined"
                onChange={(event) => handleLanguageChange(event.target.value)}
                aria-label="Select Language"
                labelPlacement="outside"
                defaultSelectedKeys={[lng || `ka`]}
                startContent={lngstartCon}
              >
                <SelectItem
                  key="ka"
                  value={"georgia"}
                  startContent={
                    <Avatar
                      alt="Georgia"
                      className="w-5 h-5 bg-transparent"
                      src="https://flagsapi.com/GE/flat/64.png"
                    />
                  }
                >
                  {lng === "ka" ? "ქართული" : "Georgian"}
                </SelectItem>
                <SelectItem
                  key="en"
                  value={"english"}
                  onClick={() => handleLanguageChange("en")}
                  startContent={
                    <Avatar
                      alt="English"
                      className="w-5 h-5 bg-transparent"
                      src="https://flagsapi.com/US/flat/64.png"
                    />
                  }
                >
                  {lng === "en" ? "English" : "ინგლისური"}
                </SelectItem>
              </Select>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
}

export default NDropdown;
