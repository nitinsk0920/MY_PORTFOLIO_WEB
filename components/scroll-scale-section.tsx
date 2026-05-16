"use client";

/**
 * ScrollScaleSection
 * ─────────────────────────────────────────────────────────────
 * Wraps any section in a sticky scroll-to-scale container.
 *
 * How it works:
 *  - The outer div is `height: stickyHeight` (default 150vh)
 *    giving the scroll room to animate.
 *  - The inner div is `position: sticky; top: 0; height: 100vh`
 *    so it pins while the page scrolls past.
 *  - useScroll tracks the outer wrapper; scale/opacity/y are
 *    derived via useTransform and smoothed with useSpring.
 *
 * Props:
 *  children      — content rendered inside the sticky card
 *  id            — section id for anchor links
 *  stickyHeight  — total height of the scroll container (default "150vh")
 *  scaleFrom     — starting scale (default 1)
 *  scaleTo       — ending scale (default 0.88)
 *  className     — extra classes on the inner sticky card
 *  noSticky      — skip sticky behaviour (plain section wrapper)
 */

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

type ScrollScaleSectionProps = {
  children: ReactNode;
  id?: string;
  stickyHeight?: string;
  scaleFrom?: number;
  scaleTo?: number;
  className?: string;
  noSticky?: boolean;
};

export function ScrollScaleSection({
  children,
  id,
  stickyHeight = "150vh",
  scaleFrom = 1,
  scaleTo = 0.88,
  className,
  noSticky = false,
}: ScrollScaleSectionProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001,
  });

  const scale   = useTransform(smooth, [0, 1], [scaleFrom, scaleTo]);
  const opacity = useTransform(smooth, [0, 0.85], [1, 0]);
  const borderR = useTransform(smooth, [0, 0.5], [0, 18]);

  if (noSticky) {
    return (
      <section id={id} className={cn("relative", className)}>
        {children}
      </section>
    );
  }

  return (
    <div
      ref={wrapperRef}
      id={id}
      style={{ height: stickyHeight, position: "relative" }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <motion.div
          className={cn("relative w-full", className)}
          style={{
            scale,
            opacity,
            borderRadius: borderR,
            willChange: "transform, opacity",
            transformOrigin: "center center",
            height: "100vh",
            overflow: "hidden",
          }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
 * ScrollScaleImage
 * A standalone image wrapper that zooms in as you scroll TO it
 * and then zooms/fades as you scroll PAST it.
 * ───────────────────────────────────────────────────────────── */

type ScrollScaleImageProps = {
  children: ReactNode;
  className?: string;
  /** "in" = zoom in as you enter  (default)
   *  "out" = zoom out as you pass */
  mode?: "in" | "out";
};

export function ScrollScaleImage({
  children,
  className,
  mode = "in",
}: ScrollScaleImageProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 18,
    restDelta: 0.001,
  });

  // Hooks must be called unconditionally — compute both, use the right one
  const scaleIn  = useTransform(smooth, [0, 0.4, 1], [1.14, 1.0, 1.08]);
  const scaleOut = useTransform(smooth, [0, 1], [1.0, 1.12]);
  const scale    = mode === "in" ? scaleIn : scaleOut;

  const opacity = useTransform(smooth, [0, 0.12, 0.88, 1], [0, 1, 1, 0.6]);

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div
        style={{
          scale,
          opacity,
          willChange: "transform, opacity",
          height: "100%",
          width: "100%",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
