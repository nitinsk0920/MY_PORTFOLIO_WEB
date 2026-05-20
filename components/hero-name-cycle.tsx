"use client";

import { useState, useEffect, useMemo, memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Font cycle definitions ─────────────────────────────────────────────────
// Each entry defines how the name looks in that cycle pass.
const FONT_CYCLE = [
  {
    // 1 — Cormorant Garamond: ultra-light cinematic serif
    fontFamily: "var(--font-heading)",
    fontWeight: 400,
    letterSpacing: "0",
    lineHeight: 0.92,
    textTransform: "none" as const,
    label: "orange-avenue-1",
  },
  {
    // 2 — Bebas Neue: bold condensed all-caps display
    fontFamily: "var(--font-heading)",
    fontWeight: 400,
    letterSpacing: "0",
    lineHeight: 0.88,
    textTransform: "none" as const,
    label: "orange-avenue-2",
  },
  {
    // 3 — Playfair Display: classic editorial serif
    fontFamily: "var(--font-heading)",
    fontWeight: 400,
    letterSpacing: "0",
    lineHeight: 0.95,
    textTransform: "none" as const,
    label: "orange-avenue-3",
  },
  {
    // 4 — DM Serif Display: modern italic editorial
    fontFamily: "var(--font-heading)",
    fontWeight: 400,
    letterSpacing: "0",
    lineHeight: 0.94,
    textTransform: "none" as const,
    label: "orange-avenue-4",
  },
] as const;

// ── Timing constants ──────────────────────────────────────────────────────
const LETTER_STAGGER_IN  = 0.038; // s between each letter entering
const LETTER_STAGGER_OUT = 0.022; // s between each letter exiting (faster)
const LETTER_DUR_IN      = 0.52;  // s per letter entrance
const LETTER_DUR_OUT     = 0.30;  // s per letter exit

// Total letters in "Nitin S Katagihallimath" = 21
// Enter time ≈ 21 × 0.038 + 0.52 ≈ 1.32s
// Exit  time ≈ 21 × 0.022 + 0.30 ≈ 0.76s
// Visible hold before triggering next: set by CYCLE_INTERVAL
const CYCLE_INTERVAL = 4200; // ms — time each font is shown before flipping out

// ── Letter component ──────────────────────────────────────────────────────
const Letter = memo(function Letter({
  char,
  isSpace,
}: {
  char: string;
  isSpace: boolean;
}) {
  if (isSpace) {
    return (
      <span style={{ display: "inline-block", width: "0.28em" }} aria-hidden />
    );
  }
  return (
    <motion.span
      style={{
        display: "inline-block",
        transformStyle: "preserve-3d",
        willChange: "transform, opacity, filter",
      }}
      variants={{
        enter: {
          rotateX: 90,
          y: 22,
          opacity: 0,
          filter: "blur(9px)",
        },
        visible: {
          rotateX: 0,
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          transition: {
            duration: LETTER_DUR_IN,
            ease: [0.18, 0.68, 0.28, 0.92],
          },
        },
        exit: {
          rotateX: -90,
          y: -18,
          opacity: 0,
          filter: "blur(8px)",
          transition: {
            duration: LETTER_DUR_OUT,
            ease: [0.4, 0, 1, 1],
          },
        },
      }}
    >
      {char}
    </motion.span>
  );
});

// ── One "line" of the name — staggered letters ────────────────────────────
const NameLine = memo(function NameLine({
  text,
  globalLetterOffset, // cumulative letter count before this line (for global stagger)
  fontSize,
  fontStyle,
}: {
  text: string;
  globalLetterOffset: number;
  fontSize: string;
  fontStyle: (typeof FONT_CYCLE)[number];
}) {
  const chars = useMemo(() => text.split(""), [text]);

  return (
    <motion.div
      style={{
        display: "block",
        fontFamily: fontStyle.fontFamily,
        fontWeight: fontStyle.fontWeight,
        letterSpacing: fontStyle.letterSpacing,
        lineHeight: fontStyle.lineHeight,
        textTransform: fontStyle.textTransform,
        fontSize,
        color: "#FFFFFF",
        transformStyle: "preserve-3d",
      }}
      variants={{
        enter:   {},
        visible: {
          transition: {
            staggerChildren: LETTER_STAGGER_IN,
            delayChildren: globalLetterOffset * LETTER_STAGGER_IN,
          },
        },
        exit: {
          transition: {
            staggerChildren: LETTER_STAGGER_OUT,
            delayChildren: globalLetterOffset * LETTER_STAGGER_OUT,
          },
        },
      }}
    >
      {chars.map((char, i) => (
        <Letter key={i} char={char} isSpace={char === " "} />
      ))}
    </motion.div>
  );
});

// ── Public component ──────────────────────────────────────────────────────
export interface HeroNameCycleProps {
  /** Mobile or desktop sizing token */
  isMobile?: boolean;
}

const NAME_LINES = ["NITIN.S.K"] as const;

// Letter count before each line (for global stagger continuity)
const LINE_OFFSETS = [0];

export function HeroNameCycle({ isMobile = false }: HeroNameCycleProps) {
  const [fontIdx, setFontIdx] = useState(0);
  const [started, setStarted] = useState(false);

  // Small initial delay so the entry animation finishes before cycle begins
  useEffect(() => {
    const init = setTimeout(() => setStarted(true), 800);
    return () => clearTimeout(init);
  }, []);

  const tick = useCallback(() => {
    setFontIdx((prev) => (prev + 1) % FONT_CYCLE.length);
  }, []);

  useEffect(() => {
    if (!started) return;
    const timer = setInterval(tick, CYCLE_INTERVAL);
    return () => clearInterval(timer);
  }, [started, tick]);

  const currentFont = FONT_CYCLE[fontIdx];

  // Font-size per device
  const fontSize = isMobile
    ? "clamp(3rem, 14vw, 5.5rem)"
    : "clamp(4rem, 8vw, 8.5rem)";

  return (
    <div
      role="heading"
      aria-level={1}
      aria-label="NITIN.S.K"
      style={{
        perspective: "1000px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`name-${fontIdx}`}
          initial="enter"
          animate="visible"
          exit="exit"
          // Container stagger is handled per-line, not here
          variants={{ enter: {}, visible: {}, exit: {} }}
          style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}
        >
          {NAME_LINES.map((line, li) => (
            <NameLine
              key={`${fontIdx}-${li}`}
              text={line}
              globalLetterOffset={LINE_OFFSETS[li]}
              fontSize={fontSize}
              fontStyle={currentFont}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default HeroNameCycle;
