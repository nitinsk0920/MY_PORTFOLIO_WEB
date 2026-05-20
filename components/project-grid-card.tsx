"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

type ProjectGridCardProps = {
  category: string;
  title: string;
  tech: string;
  onSelect?: () => void;
};

export function ProjectGridCard({
  category,
  title,
  tech,
  onSelect,
}: ProjectGridCardProps) {
  const cardRef   = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [tapped,  setTapped]  = useState(false); // mobile tap-to-reveal
  const [isMobile, setIsMobile] = useState(false);

  // Raw mouse position inside card (0–1 range)
  const rawMouseX = useRef(0.75); // default: peel from top-right corner
  const rawMouseY = useRef(0.25);

  // Detect touch device
  useEffect(() => {
    setIsMobile(window.matchMedia("(hover: none)").matches);
  }, []);

  // Revealed = hovered (desktop) or tapped (mobile)
  const revealed = hovered || tapped;

  // ── Springs for the cover layer transforms ──────────
  // All values animate smoothly toward their target

  // Progress: 0 = closed, 1 = fully peeled
  const progressSpring = useSpring(0, { stiffness: 120, damping: 22, mass: 0.8 });

  // Slight skew influenced by mouse X position
  const skewSpring     = useSpring(0, { stiffness: 80,  damping: 18 });

  useEffect(() => {
    progressSpring.set(revealed ? 1 : 0);
  }, [revealed, progressSpring]);

  // ── Derived transforms from spring values ───────────
  // Cover peels upward (negative Y) and slightly rotates
  const coverY        = useTransform(progressSpring, [0, 1], ["0%",   "-102%"]);
  const coverRotateX  = useTransform(progressSpring, [0, 1], [0,      -8]);
  const coverSkewX    = useTransform(skewSpring,     v => v);
  const coverScale    = useTransform(progressSpring, [0, 0.5, 1], [1, 1.01, 0.98]);
  const coverOpacity  = useTransform(progressSpring, [0, 0.85, 1], [1, 1, 0]);

  // Shadow under the peeled edge — deepens as it lifts
  const shadowOpacity = useTransform(progressSpring, [0, 0.3, 0.8], [0.0, 0.55, 0.0]);
  const shadowY       = useTransform(progressSpring, [0, 0.5], [0, 6]);

  // Fold highlight on the leading edge of the peel
  const foldOpacity   = useTransform(progressSpring, [0, 0.15, 0.7], [0, 0.9, 0.0]);
  const foldScaleX    = useTransform(progressSpring, [0, 0.2, 1], [0, 1, 1]);

  // Corner crease accent
  const creaseOpacity = useTransform(progressSpring, [0, 1], [0.7, 0.0]);

  // ── Mouse tracking ──────────────────────────────────
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawMouseX.current = (e.clientX - rect.left) / rect.width;
    rawMouseY.current = (e.clientY - rect.top)  / rect.height;

    // Skew the cover slightly toward mouse X (–3° to +3°)
    const skew = (rawMouseX.current - 0.5) * 6;
    skewSpring.set(skew);
  }, [skewSpring]);

  const handleMouseEnter = useCallback(() => {
    if (!isMobile) setHovered(true);
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (!isMobile) {
      setHovered(false);
      skewSpring.set(0);
    }
  }, [isMobile, skewSpring]);

  const handleClick = useCallback(() => {
    if (isMobile) {
      if (!tapped) {
        setTapped(true);   // first tap reveals
      } else {
        setTapped(false);  // second tap re-covers and triggers modal
        onSelect?.();
      }
    } else {
      onSelect?.();
    }
  }, [isMobile, tapped, onSelect]);

  // ── Tech pills (split the dot-separated string) ──────
  const techItems = tech.split(/\s*·\s*/);

  return (
    <div
      ref={cardRef}
      className="relative select-none"
      style={{
        minHeight:   "clamp(200px, 22vh, 260px)",
        perspective: "900px",
        cursor:      isMobile && !tapped ? "pointer" : "default",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      role="group"
      aria-label={`${title} — click to view`}
    >

      {/* ════════════════════════════════════════════════
          BOTTOM LAYER — revealed project content
          Fixed in place, never moves.
          ════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0 flex flex-col border border-white/10 bg-black/60 p-5 sm:p-6"
        style={{ zIndex: 1, overflow: "hidden" }}
      >
        {/* Category */}
        <p
          style={{
            fontFamily:    "var(--font-content)",
            fontSize:      "0.58rem",
            fontWeight:    600,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color:         "rgba(148,163,184,0.7)",
            margin:        0,
          }}
        >
          {category}
        </p>

        {/* Title */}
        <h3
          style={{
            fontFamily:    "var(--font-heading)",
            fontWeight:    400,
            fontSize:      "clamp(0.95rem, 1.8vw, 1.2rem)",
            color:         "#f5f5f5",
            marginTop:     "0.55rem",
            letterSpacing: "0",
            lineHeight:    1.25,
          }}
        >
          {title}
        </h3>

        {/* Tech stack pills */}
        <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
          {techItems.map((t) => (
            <span
              key={t}
              style={{
                border:        "1px solid rgba(255,255,255,0.1)",
                padding:       "0.18rem 0.6rem",
                fontSize:      "0.62rem",
                fontFamily:    "var(--font-content)",
                color:         "rgba(148,163,184,0.75)",
                letterSpacing: "0.03em",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* View button — revealed at bottom right */}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onSelect?.(); }}
          aria-label={`View ${title}`}
          style={{
            position:        "absolute",
            bottom:          "1.1rem",
            right:           "1.1rem",
            width:           34,
            height:          34,
            border:          "1px solid rgba(255,255,255,0.22)",
            borderRadius:    "50%",
            background:      "transparent",
            display:         "flex",
            alignItems:      "center",
            justifyContent:  "center",
            color:           "#f5f5f5",
            cursor:          "pointer",
            transition:      "all 0.18s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.08)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.45)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)";
          }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* ════════════════════════════════════════════════
          SHADOW — cast under the peeling edge
          ════════════════════════════════════════════════ */}
      <motion.div
        aria-hidden
        style={{
          position:  "absolute",
          inset:     0,
          zIndex:    2,
          opacity:   shadowOpacity,
          y:         shadowY,
          background: `
            linear-gradient(
              to bottom,
              transparent 0%,
              rgba(0,0,0,0.7) 100%
            )
          `,
          pointerEvents: "none",
          willChange: "opacity, transform",
        }}
      />

      {/* ════════════════════════════════════════════════
          TOP LAYER — black paper cover (the peel sheet)
          ════════════════════════════════════════════════ */}
      <motion.div
        aria-hidden
        style={{
          position:      "absolute",
          inset:         0,
          zIndex:        3,
          y:             coverY,
          rotateX:       coverRotateX,
          skewX:         coverSkewX,
          scale:         coverScale,
          opacity:       coverOpacity,
          transformOrigin: "center bottom",
          willChange:    "transform, opacity",
          // Slightly rounded leading edge to simulate paper flex
          borderRadius:  "0 0 2px 2px",
          overflow:      "hidden",
        }}
      >
        {/* Black paper surface */}
        <div
          style={{
            position:   "absolute",
            inset:      0,
            background: "linear-gradient(160deg, #0a0a0a 0%, #000000 55%, #111111 100%)",
            border:     "1px solid rgba(255,255,255,0.09)",
          }}
        />

        {/* Paper texture grain — ultra subtle */}
        <div
          style={{
            position:   "absolute",
            inset:      0,
            background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
            opacity:    0.6,
            mixBlendMode: "overlay",
            pointerEvents: "none",
          }}
        />

        {/* Edge gloss — light shimmer on the peel face */}
        <div
          style={{
            position:   "absolute",
            inset:      0,
            background: "linear-gradient(to bottom, rgba(255,255,255,0.035) 0%, transparent 40%)",
            pointerEvents: "none",
          }}
        />

        {/* ── Cover content — title only ─────────────── */}
        <div
          style={{
            position: "absolute",
            inset:    0,
            padding:  "1.25rem",
            display:  "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Category eyebrow */}
          <p
            style={{
              fontFamily:    "var(--font-content)",
              fontSize:      "0.58rem",
              fontWeight:    600,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color:         "rgba(255,255,255,0.28)",
              margin:        0,
            }}
          >
            {category}
          </p>

          {/* Title — centred vertically */}
          <h3
            style={{
              fontFamily:    "var(--font-heading)",
              fontWeight:    400,
              fontSize:      "clamp(0.95rem, 1.8vw, 1.2rem)",
              color:         "rgba(255,255,255,0.9)",
              letterSpacing: "0",
              lineHeight:    1.25,
              margin:        0,
            }}
          >
            {title}
          </h3>

          {/* Bottom hint */}
          <p
            style={{
              fontFamily:    "var(--font-content)",
              fontSize:      "0.54rem",
              fontWeight:    400,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color:         "rgba(255,255,255,0.18)",
              margin:        0,
            }}
          >
            {isMobile ? "Tap to reveal" : "Hover to reveal"}
          </p>
        </div>

        {/* ── Corner crease accent (top-right) ─────── */}
        <motion.div
          aria-hidden
          style={{
            position:      "absolute",
            top:           0,
            right:         0,
            width:         28,
            height:        28,
            opacity:       creaseOpacity,
            pointerEvents: "none",
          }}
        >
          {/* Triangle fold SVG */}
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            {/* Folded flap */}
            <polygon
              points="0,0 28,0 28,28"
              fill="rgba(255,255,255,0.06)"
            />
            {/* Crease line */}
            <line
              x1="0" y1="0" x2="28" y2="28"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="0.75"
            />
            {/* Shadow of flap */}
            <polygon
              points="0,0 28,0 28,28"
              fill="none"
              stroke="rgba(0,0,0,0.5)"
              strokeWidth="1"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* ════════════════════════════════════════════════
          FOLD EDGE — bright line along the leading
          peel edge as it lifts away from the surface
          ════════════════════════════════════════════════ */}
      <motion.div
        aria-hidden
        style={{
          position:      "absolute",
          left:          0,
          right:         0,
          // Sits just above the cover, at the bottom of the cover
          zIndex:        4,
          height:        "2px",
          bottom:        0,
          opacity:       foldOpacity,
          scaleX:        foldScaleX,
          transformOrigin: "left center",
          background:    "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.55) 20%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.55) 80%, transparent 100%)",
          boxShadow:     "0 0 8px rgba(255,255,255,0.25), 0 2px 12px rgba(0,0,0,0.8)",
          pointerEvents: "none",
          willChange:    "opacity, transform",
        }}
      />

    </div>
  );
}
