"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
};

// Split title into words, each word into chars — for staggered reveal
function AnimatedTitle({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  const words = title.split(" ");

  return (
    <span className={cn("inline", className)} aria-label={title}>
      {words.map((word, wi) => (
        <span
          key={wi}
          className="inline-block overflow-hidden mr-[0.25em] last:mr-0"
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%", opacity: 0, rotateX: -20 },
              visible: {
                y: "0%",
                opacity: 1,
                rotateX: 0,
                transition: {
                  duration: 0.72,
                  delay: wi * 0.085,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  titleClassName,
}: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const isCenter = align === "center";

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={cn("max-w-3xl", isCenter && "mx-auto text-center", className)}
    >
      {/* Eyebrow — slides up + fades in */}
      <motion.p
        variants={{
          hidden: { opacity: 0, y: 14, letterSpacing: "0.44em" },
          visible: {
            opacity: 1,
            y: 0,
            letterSpacing: "0.28em",
            transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
          },
        }}
        className="text-xs font-medium uppercase tracking-[0.28em]"
        style={{ fontFamily: "var(--font-content)", color: "#94A3B8", letterSpacing: "0.28em" }}
      >
        {eyebrow}
      </motion.p>

      {/* Thin rule under eyebrow — scales in from left/center */}
      <motion.div
        variants={{
          hidden: { scaleX: 0, opacity: 0 },
          visible: {
            scaleX: 1,
            opacity: 1,
            transition: { duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] },
          },
        }}
        className={cn(
          "mt-3 h-px w-10",
          isCenter ? "mx-auto" : "ml-0",
        )}
        style={{ transformOrigin: isCenter ? "center" : "left", background: "rgba(255,255,255,0.4)" }}
      />

      {/* Title — word-by-word lift */}
      <h2
        className={cn(
          "mt-5 font-heading text-4xl font-bold leading-[1.12] sm:text-5xl lg:text-6xl",
          titleClassName,
        )}
        style={{ fontFamily: "var(--font-heading)", perspective: "800px", color: "#FFFFFF", letterSpacing: "-0.02em" }}
      >
        <AnimatedTitle title={title} />
      </h2>

      {/* Description — fades + rises after title */}
      {description ? (
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: {
                duration: 0.75,
                delay: 0.38,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
          className={cn(
            "mt-5 max-w-2xl text-base leading-7",
            isCenter && "mx-auto",
          )}
          style={{ fontFamily: "var(--font-content)", fontWeight: 300, color: "#94A3B8" }}
        >
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
