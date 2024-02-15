"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface Props {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "fade" | "scale";
  duration?: number;
  delay?: number;
  once?: boolean;
}

export const Reveal = ({
  children,
  direction = "up",
  duration = 1.5,
  delay = 0.5,
  once = false,
}: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: once });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    } else {
      mainControls.start("hidden");
    }
  }, [isInView, mainControls]); // Dependency array

  const getAnimationVariants = () => {
    switch (direction) {
      case "up":
        return {
          hidden: { opacity: 0, y: 100 },
          visible: { opacity: 1, y: 0 },
        };
      case "down":
        return {
          hidden: { opacity: 0, y: -100 },
          visible: { opacity: 1, y: 0 },
        };
      case "left":
        return {
          hidden: { opacity: 0, x: 100 },
          visible: { opacity: 1, x: 0 },
        };
      case "right":
        return {
          hidden: { opacity: 0, x: -100 },
          visible: { opacity: 1, x: 0 },
        };
      case "fade":
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0.5 },
          visible: { opacity: 1, scale: 1 },
        };

      default:
        return {
          hidden: { opacity: 0, y: 100 },
          visible: { opacity: 1, y: 0 },
        };
    }
  };

  return (
    <div ref={ref} style={{ position: "relative", overflow: "hidden" }}>
      <motion.div
        variants={getAnimationVariants()}
        initial="hidden"
        animate={mainControls}
        transition={{
          type: "spring",
          duration,
          delay,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
