"use client";

import { FC, useEffect, useState } from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { SwitchProps, useSwitch } from "@nextui-org/switch";
import { useIsSSR } from "@react-aria/ssr";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";

import { GeorgiaIcon, EnglishIcon } from "@/components/icons";

export interface LanguageSwitchProps {
  className?: string;
  classNames?: SwitchProps["classNames"];
}

export const LanguageSwitch: FC<LanguageSwitchProps> = ({
  className,
  classNames,
}) => {
  const isSSR = useIsSSR();
  const pathName = usePathname();
  const router = useRouter();
  const [lang, setLang] = useState("en"); // default language

  const handleLanguageChange = (selectedLanguage: string) => {
    if (!pathName) return "/";

    if (pathName.startsWith("/" + selectedLanguage + "/")) return pathName;

    const secondSlashIndex = pathName.indexOf("/", 1);

    if (secondSlashIndex !== -1) {
      const newPath =
        "/" + selectedLanguage + pathName.substring(secondSlashIndex);

      router.push(newPath);

      return newPath;
    }

    const newPath = "/" + selectedLanguage;

    router.push(newPath);

    return newPath;
  };

  useEffect(() => {
    // Logic to determine the current language based on the path
    const currentLang = pathName.split("/")[1];

    setLang(currentLang === "ka" ? "ka" : "en");
  }, [pathName]);

  const onChange = () => {
    const newLang = lang === "en" ? "ka" : "en";

    setLang(newLang);
    handleLanguageChange(newLang);
  };

  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch({
    isSelected: lang === "ka" || isSSR,
    "aria-label": `Switch to ${lang === "ka" ? "English" : "Georgian"} mode`,
    onChange,
  });

  return (
    <Component
      {...getBaseProps({
        className: clsx(
          "px-px transition-opacity hover:opacity-80 cursor-pointer",
          className,
          classNames?.base
        ),
      })}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: clsx(
            [
              "w-auto h-auto",
              "bg-transparent",
              "rounded-lg",
              "flex items-center justify-center",
              "group-data-[selected=true]:bg-transparent",
              "!text-default-500",
              "pt-px",
              "px-0",
              "mx-0",
            ],
            classNames?.wrapper
          ),
        })}
      >
        {isSelected || isSSR ? (
          <GeorgiaIcon size={25} />
        ) : (
          <EnglishIcon size={25} />
        )}
      </div>
    </Component>
  );
};
