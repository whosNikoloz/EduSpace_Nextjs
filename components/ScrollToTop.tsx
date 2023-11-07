"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";
import { UpVectorIcon } from "./UpVectorIcon";

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Scroll event listener to show/hide the button
  useEffect(() => {
    const scrollHandler = () => {
      if (window.pageYOffset > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  // Function to scroll to the top when the button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      id="scrollToTop"
      className={`fixed right-8 bottom-8 ${
        isVisible ? "flex" : "hidden"
      } bg-transparent items-center justify-center`}
      onClick={scrollToTop}
      isIconOnly
    >
      <UpVectorIcon size={30} />
    </Button>
  );
};

export default ScrollToTopButton;
