"use client";

import { useRef, memo, useMemo, type CSSProperties } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// ── Single letter ──────────────────────────────────────────────────────────
const Letter = memo(function Letter({
  char,
  duration,
}: {
  char: string;
  duration: number;
}) {
  return (
    <motion.span
      style={{ transformStyle: "preserve-3d", display: "inline-block" }}
      variants={{
        hidden: {
          rotateX: 90,
          y: 18,
          opacity: 0,
          filter: "blur(7px)",
        },
        visible: {
          rotateX: 0,
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          transition: {
            duration,
            ease: [0.2, 0.65, 0.3, 0.9],
          },
        },
      }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
});

// ── One word — staggered letters ───────────────────────────────────────────
const Word = memo(function Word({
  text,
  stagger,
  duration,
  globalOffset,
}: {
  text: string;
  stagger: number;
  duration: number;
  globalOffset: number;
}) {
  const letters = useMemo(() => text.split(""), [text]);

  return (
    <span
      className="inline-block overflow-hidden"
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.span
        className="inline-flex"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: stagger,
              delayChildren: globalOffset,
            },
          },
        }}
      >
        {letters.map((char, i) => (
          <Letter key={i} char={char} duration={duration} />
        ))}
      </motion.span>
    </span>
  );
});

// ── Public component ───────────────────────────────────────────────────────
export interface FlipFadeHeadingProps {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  /** Fully merged into the heading element — fontSize, fontFamily, etc. all work here */
  style?: CSSProperties;
  letterDuration?: number;
  letterStagger?: number;
  wordGap?: number;
  once?: boolean;
  threshold?: number;
}

export function FlipFadeHeading({
  text,
  as: Tag = "h2",
  className,
  style,
  letterDuration = 0.55,
  letterStagger = 0.042,
  wordGap = 0.06,
  once = true,
  threshold = 0.25,
}: FlipFadeHeadingProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once, amount: threshold });

  const words = useMemo(() => text.split(" "), [text]);

  const wordOffsets = useMemo(() => {
    const offsets: number[] = [];
    let cursor = 0;
    words.forEach((word) => {
      offsets.push(cursor);
      cursor += word.length * letterStagger + wordGap;
    });
    return offsets;
  }, [words, letterStagger, wordGap]);

  return (
    // @ts-expect-error polymorphic tag
    <Tag
      ref={ref}
      className={cn(className)}
      // Merge caller's style with the perspective needed for 3-D flip
      style={{ perspective: "900px", ...style }}
      aria-label={text}
    >
      <motion.span
        className="inline-flex flex-wrap gap-x-[0.22em]"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{ hidden: {}, visible: {} }}
      >
        {words.map((word, wi) => (
          <Word
            key={`${word}-${wi}`}
            text={word}
            stagger={letterStagger}
            duration={letterDuration}
            globalOffset={wordOffsets[wi]}
          />
        ))}
      </motion.span>
    </Tag>
  );
}

export default FlipFadeHeading;
