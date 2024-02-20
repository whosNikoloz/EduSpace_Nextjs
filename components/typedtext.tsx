import React, { useEffect, useRef } from "react";
import TypedJS, { TypedOptions } from "typed.js"; // Rename the import to avoid conflict
import { motion, useInView } from "framer-motion";

interface TypingEffectProps {
  text: string;
  options?: TypedOptions; // Use the renamed namespace
  className?: string; // New prop to accept className
  delay?: number;
  once: boolean;
}

const TypingEffect: React.FC<TypingEffectProps> = ({
  text,
  options: userOptions,
  className,
  delay = 0,
  once,
}) => {
  let typed: TypedJS | null = null; // Use the renamed namespace

  const typedTextRef = useRef<HTMLSpanElement>(null); // Ref for the typing effect
  const ref = useRef(null);
  const isInView = useInView(ref, { once: once });

  useEffect(() => {
    if (typedTextRef.current && isInView) {
      const defaultOptions: TypedOptions = {
        strings: [text],
        typeSpeed: 100,
        loop: false,
        startDelay: delay,
        showCursor: true,
      };

      const mergedOptions: TypedOptions = {
        ...defaultOptions,
        ...userOptions,
      };

      // eslint-disable-next-line react-hooks/exhaustive-deps
      typed = new TypedJS(typedTextRef.current, mergedOptions); // Initialize TypedJS

      return () => {
        if (typed) {
          typed.destroy(); // Cleanup TypedJS
        }
      };
    }
  }, [text, userOptions, delay, isInView]); // Dependencies

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
    >
      <span ref={typedTextRef} className={className}></span>
    </motion.span>
  );
};

export default TypingEffect;
