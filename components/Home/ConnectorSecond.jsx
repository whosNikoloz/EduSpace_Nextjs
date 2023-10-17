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
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: member,
            start: "top bottom-=100",
            end: "top center",
            toggleActions: "play none reverse none",
          },
        }
      );
    });
  };

  useEffect(() => {
    animateTeamMembers();

    return () => {
      gsap.utils.toArray(".Connector").forEach((member) => {
        gsap.set(member, { clearProps: "all" });
      });
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="w-2/6 md:w-1/2 lg:w-4/6 relative">
        <div className="h-10 md:h-36 lg:h-56 border-blue-600 border-r-4 border-dashed w-full Connector">
          <span className="absolute bottom-2 text-center w-full text-sm sm:text-lg">
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
