"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export default function AnimatedNumber({
  value,
  duration = 2000,
  prefix = "",
  suffix = "",
  className = ""
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isStarted, setIsStarted] = useState(false);
  
  // Start spring with target value so SSR/initial render shows full value instead of 0
  const springValue = useSpring(value, {
    stiffness: 50,
    damping: 20,
    duration: duration,
  });

  const displayValue = useTransform(springValue, (current) => {
    return Math.floor(current).toLocaleString();
  });

  useEffect(() => {
    if (isInView && !isStarted) {
      setIsStarted(true);
      springValue.set(0);
      const timer = setTimeout(() => {
        springValue.set(value);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isInView, isStarted, value, springValue]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
}
