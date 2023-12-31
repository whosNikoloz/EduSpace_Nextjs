"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface Props {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  delay?: number;
}

export const Reveal = ({
  children,
  direction = "up",
  duration = 0.5,
  delay = 0.5,
}: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView,mainControls]);

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
        transition={{ delay, duration }}
      >
        {children}
      </motion.div>
    </div>
  );
};
