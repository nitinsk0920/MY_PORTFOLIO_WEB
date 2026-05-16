"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type MotionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** "up" (default) | "left" | "right" | "scale" */
  direction?: "up" | "left" | "right" | "scale";
  threshold?: number;
  once?: boolean;
};

const VARIANTS = {
  up: {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -32 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 32 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.94 },
    visible: { opacity: 1, scale: 1 },
  },
};

export function MotionReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  threshold = 0.12,
  once = true,
}: MotionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: threshold, once });

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      variants={VARIANTS[direction]}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{
        duration: 0.75,
        delay: delay / 1000, // convert ms → seconds
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}
