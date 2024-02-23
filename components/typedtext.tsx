import React, { useEffect, useRef } from "react";
import TypedJS, { TypedOptions } from "typed.js"; // Rename the import to avoid conflict
import { motion, useAnimation, useInView } from "framer-motion";

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
    let typedInstance: TypedJS | null = null;

    const initializeTyped = () => {
      if (!typedTextRef.current || !isInView || typedInstance) return;

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

      typedInstance = new TypedJS(typedTextRef.current, mergedOptions);
    };

    const destroyTyped = () => {
      if (typedInstance) {
        typedInstance.destroy();
        typedInstance = null;
      }
    };

    initializeTyped();

    return () => {
      destroyTyped();
    };
  }, [text, userOptions, delay, isInView]); // Dependencies

  return (
    <motion.span ref={ref}>
      <span ref={typedTextRef} className={className}></span>
      <span className="text-transparent">.</span>
    </motion.span>
  );
};

export default TypingEffect;
