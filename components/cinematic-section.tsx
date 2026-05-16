"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

type CinematicSectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
};

export function CinematicSection({ children, id, className }: CinematicSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 52,
    damping: 17,
    restDelta: 0.001,
  });

  // Very subtle scale — 0.97 entering, 1.0 in view, 0.97 leaving
  const scale = useTransform(
    smooth,
    [0, 0.15, 0.5, 0.85, 1],
    [0.97, 1.0, 1.0, 1.0, 0.97]
  );

  // Gentle y lift on entry only
  const y = useTransform(
    smooth,
    [0, 0.2, 1],
    [20, 0, 0]
  );

  // Opacity: fully visible once 15% in, stays visible until 90%
  const opacity = useTransform(
    smooth,
    [0, 0.15, 0.88, 1],
    [0.0, 1.0, 1.0, 0.7]
  );

  // NO blur — remove entirely. Blur was causing every section
  // to appear permanently blurred because .get() snapshots the
  // initial motion value and never updates inside JSX.

  return (
    <div ref={ref} id={id} className={className}>
      <motion.div
        style={{
          scale,
          y,
          opacity,
          willChange: "transform, opacity",
          transformOrigin: "center top",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
