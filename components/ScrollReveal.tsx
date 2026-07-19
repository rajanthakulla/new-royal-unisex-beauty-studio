"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollRevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  yOffset?: number;
  xOffset?: number;
  scale?: number;
  staggerChildren?: number;
}

export default function ScrollReveal({ 
  children, 
  className, 
  delay = 0, 
  duration = 0.8,
  direction = "up",
  yOffset = 40,
  xOffset = 40,
  scale = 0.96,
  staggerChildren,
  ...rest
}: ScrollRevealProps) {
  
  const getInitialPosition = () => {
    switch (direction) {
      case "up": return { y: yOffset, x: 0 };
      case "down": return { y: -yOffset, x: 0 };
      case "left": return { x: xOffset, y: 0 };
      case "right": return { x: -xOffset, y: 0 };
      case "none": return { x: 0, y: 0 };
      default: return { y: yOffset, x: 0 };
    }
  };

  const initialPosition = getInitialPosition();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, filter: "blur(12px)", scale: scale, ...initialPosition }}
      whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        delay, 
        duration, 
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: staggerChildren
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
