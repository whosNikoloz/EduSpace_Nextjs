"use client";

import React, { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import classNames from "classnames";
import { useStepStore } from "./store";

type Props = {
  children: React.ReactNode; // 'children' instead of 'Children'
  id: string;
};

export const StepCard = ({ children, id }: Props) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { margin: "-35% 0px -35% 0px" });

  const setInViewStep = useStepStore((state) => state.setInViewStep);
  const inViewStep = useStepStore((state) => state.inViewStep);

  useEffect(() => {
    if (isInView) {
      setInViewStep(id);
    }
    if (!isInView && inViewStep === id) {
      setInViewStep(null);
    }
  }, [isInView, id, setInViewStep, inViewStep]);

  return (
    <>
      <div
        ref={ref}
        id={id}
        className={classNames(
          "transition-colors grid justify-center   grid-cols-4 p-8 space-y-8 lg:space-y-0 ",
          isInView
            ? "dark:text-gray-100 text-blue-600"
            : "dark:text-gray-600 text-gray-300"
        )}
      >
        {children}
      </div>
    </>
  );
};
