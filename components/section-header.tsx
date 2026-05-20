"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { FlipFadeHeading } from "@/components/flip-fade-heading";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  titleClassName,
}: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const isCenter = align === "center";

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={cn("max-w-3xl", isCenter && "mx-auto text-center", className)}
    >
      {/* Eyebrow */}
      <motion.p
        variants={{
          hidden: { opacity: 0, y: 12, letterSpacing: "0.44em" },
          visible: {
            opacity: 1,
            y: 0,
            letterSpacing: "0.28em",
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          },
        }}
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.65rem",
          fontWeight: 600,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "#94A3B8",
          margin: 0,
        }}
      >
        {eyebrow}
      </motion.p>

      {/* Thin rule */}
      <motion.div
        variants={{
          hidden: { scaleX: 0, opacity: 0 },
          visible: {
            scaleX: 1,
            opacity: 1,
            transition: { duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] },
          },
        }}
        className={cn("mt-3 h-px w-10", isCenter ? "mx-auto" : "ml-0")}
        style={{
          transformOrigin: isCenter ? "center" : "left",
          background: "rgba(255,255,255,0.38)",
        }}
      />

      {/* ── FlipFade heading — Manrope font ── */}
      <FlipFadeHeading
        text={title}
        as="h2"
        threshold={0.2}
        className={cn(
          "mt-5 leading-[1.1]",
          titleClassName,
        )}
        style={{
          fontFamily: "var(--font-heading)",
          fontWeight: 400,
          fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
          color: "#FFFFFF",
          letterSpacing: "0",
          lineHeight: 1.0,
        } as React.CSSProperties}
      />

      {/* Description */}
      {description && (
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.72, delay: 0.42, ease: [0.22, 1, 0.36, 1] },
            },
          }}
          className={cn("mt-5 max-w-2xl text-base leading-7", isCenter && "mx-auto")}
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 300,
            color: "#94A3B8",
          }}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
