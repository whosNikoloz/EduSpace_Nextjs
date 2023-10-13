"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const ConnectorSecond = ({ text }) => {
  const animateTeamMembers = () => {
    gsap.utils.toArray(".Connector").forEach((member, index) => {
      gsap.fromTo(
        member,
        { opacity: 0 }, // Initial state (hidden)
        {
          opacity: 1,
          duration: 1,
          lazy: true,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: member,
            start: "top bottom-=100", // Adjust as needed
            end: "top center", // Adjust as needed
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    });
  };

  useEffect(() => {
    animateTeamMembers();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="w-2/6 md:w-1/2 lg:w-4/6 relative">
        <div className="h-10 md:h-36 lg:h-56 border-blue-600 border-r-4 border-dashed w-full Connector">
          <span className="absolute bottom-2 text-center w-full text-sm sm:text-2xl">
            {text}
          </span>
        </div>
      </div>
      <div className="w-2/6 border-b-4 lg:w-4/6 md:w-1/2 border-blue-600 border-dashed Connector"></div>
      <div className="w-2/6 md:w-1/2 lg:w-4/6">
        <div className="h-10 md:h-36 lg:h-56 border-blue-600 border-dashed border-l-4 w-full Connector"></div>
      </div>
    </div>
  );
};
