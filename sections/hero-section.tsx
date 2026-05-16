"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { useSmoothScroll } from "@/components/smooth-scroll-provider";

const RESUME_URL = "https://drive.google.com/file/d/11eVwAG66kxehpISvvDaAffs7P9ZP-OHq/view";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
  },
};

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

export function HeroSection() {
  const { lenis } = useSmoothScroll();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    restDelta: 0.0005,
  });

  const heroScale        = useTransform(smooth, [0, 1], [1, isMobile ? 0.92 : 0.82]);
  const heroOpacity      = useTransform(smooth, [0, 0.78], [1, 0]);
  const heroBorderRadius = useTransform(smooth, [0, 0.6], [0, 16]);
  const imageScale       = useTransform(smooth, [0, 1], [1, isMobile ? 1.02 : 1.06]);
  const textY            = useTransform(smooth, [0, 1], ["0%", isMobile ? "-4%" : "-10%"]);

  function scrollTo(id: string) {
    const target = document.getElementById(id);
    if (!target) return;
    if (lenis) lenis.scrollTo(target, { offset: -80, duration: 1.4 });
    else target.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div ref={wrapperRef} id="hero" style={{ height: "200vh", position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <motion.div
          style={{
            scale: heroScale,
            opacity: heroOpacity,
            borderRadius: heroBorderRadius,
            willChange: "transform, opacity",
            transformOrigin: "center center",
            position: "relative",
            width: "100%",
            height: "100vh",
            overflow: "hidden",
            background: "#000000",
          }}
        >
          {/* ── MOBILE LAYOUT ── full-bg image + text overlay ── */}
          {isMobile && (
            <>
              {/* Full-screen bg image */}
              <motion.div
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 1,
                  scale: imageScale,
                  transformOrigin: "center center",
                  willChange: "transform",
                }}
              >
                <Image
                  src="/assets/moonknight-hd.jpg"
                  alt="Nitin S Katagihallimath"
                  fill
                  priority
                  quality={90}
                  sizes="100vw"
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                />
              </motion.div>

              {/* Heavy gradient overlay so text is readable */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 2,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.82) 30%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.25) 100%)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 2,
                  background:
                    "linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 60%)",
                  pointerEvents: "none",
                }}
              />

              {/* Text content — bottom aligned on mobile */}
              <motion.div
                style={{ y: textY }}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="absolute bottom-0 left-0 right-0 z-[3] flex flex-col px-6 pb-20 pt-0"
              >
                <motion.p
                  variants={itemVariants}
                  style={{
                    fontFamily: "var(--font-content)",
                    fontSize: "0.55rem",
                    fontWeight: 500,
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    color: "#94A3B8",
                    margin: 0,
                  }}
                >
                  AI/ML Enthusiast · AI Application Builder · Freelancer
                </motion.p>

                <motion.div
                  variants={itemVariants}
                  role="heading"
                  aria-level={1}
                  aria-label="Nitin S Katagihallimath"
                  style={{ marginTop: "0.9rem" }}
                >
                  <h1
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 300,
                      fontSize: "clamp(2.6rem, 11vw, 4.5rem)",
                      lineHeight: 0.95,
                      color: "#ffffff",
                      margin: 0,
                      letterSpacing: "0.01em",
                    }}
                  >
                    Nitin<br />S<br />Katagihallimath
                  </h1>
                </motion.div>

                <motion.p
                  variants={itemVariants}
                  style={{
                    fontFamily: "var(--font-content)",
                    fontSize: "0.8rem",
                    color: "#94A3B8",
                    marginTop: "0.9rem",
                    fontWeight: 300,
                    lineHeight: 1.6,
                    maxWidth: "32ch",
                  }}
                >
                  Building intelligent AI applications and immersive digital experiences.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  variants={itemVariants}
                  style={{ display: "flex", gap: "0.6rem", marginTop: "1.2rem", flexWrap: "wrap" }}
                >
                  <button
                    type="button"
                    onClick={() => scrollTo("projects")}
                    style={{
                      fontFamily: "var(--font-content)",
                      fontSize: "0.65rem",
                      fontWeight: 600,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "#000000",
                      background: "#FFFFFF",
                      border: "1px solid #FFFFFF",
                      padding: "0.55rem 1.1rem",
                      cursor: "pointer",
                    }}
                  >
                    Explore Projects
                  </button>
                  <a
                    href={RESUME_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "var(--font-content)",
                      fontSize: "0.65rem",
                      fontWeight: 600,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "#FFFFFF",
                      background: "transparent",
                      border: "1px solid rgba(255,255,255,0.4)",
                      padding: "0.55rem 1.1rem",
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                  >
                    Resume
                  </a>
                  <button
                    type="button"
                    onClick={() => scrollTo("contact")}
                    style={{
                      fontFamily: "var(--font-content)",
                      fontSize: "0.65rem",
                      fontWeight: 600,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "#FFFFFF",
                      background: "transparent",
                      border: "1px solid rgba(255,255,255,0.4)",
                      padding: "0.55rem 1.1rem",
                      cursor: "pointer",
                    }}
                  >
                    Contact
                  </button>
                </motion.div>
              </motion.div>
            </>
          )}

          {/* ── DESKTOP LAYOUT ── split 50/50 ── */}
          {!isMobile && (
            <>
              {/* Right Half — Portrait */}
              <motion.div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "50%",
                  height: "100%",
                  zIndex: 1,
                  scale: imageScale,
                  willChange: "transform",
                  transformOrigin: "center center",
                }}
              >
                <div style={{ position: "relative", width: "100%", height: "100%" }}>
                  <Image
                    src="/assets/moonknight-hd.jpg"
                    alt="Nitin S Katagihallimath"
                    fill
                    priority
                    quality={100}
                    sizes="50vw"
                    style={{ objectFit: "contain", objectPosition: "center center" }}
                  />
                </div>
                {[
                  { background: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 12%, rgba(0,0,0,0.2) 28%, rgba(0,0,0,0) 45%)" },
                  { background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 18%)" },
                  { background: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 12%, rgba(0,0,0,0) 30%)" },
                  { background: "linear-gradient(to left, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 20%)" },
                ].map((s, i) => (
                  <div key={i} style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none", ...s }} />
                ))}
              </motion.div>

              {/* Left Half — Text */}
              <motion.div
                style={{
                  y: textY,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "50%",
                  height: "100%",
                  zIndex: 5,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  paddingLeft: "clamp(2rem, 7vw, 8rem)",
                  paddingRight: "clamp(1.5rem, 3vw, 3rem)",
                  background: "#000000",
                }}
              >
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}
                >
                  <motion.p
                    variants={itemVariants}
                    style={{
                      fontFamily: "var(--font-content)",
                      fontSize: "clamp(0.55rem, 0.9vw, 0.68rem)",
                      fontWeight: 500,
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                      color: "#94A3B8",
                      margin: 0,
                    }}
                  >
                    AI/ML Enthusiast&nbsp;&bull;&nbsp;AI Application Builder&nbsp;&bull;&nbsp;Freelancer
                  </motion.p>

                  <motion.div
                    variants={itemVariants}
                    role="heading"
                    aria-level={1}
                    aria-label="Nitin S Katagihallimath"
                    style={{
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: "100%",
                      margin: "clamp(1.2rem, 2.4vh, 2rem) 0 0",
                      filter: "drop-shadow(0 0 14px rgba(255,255,255,0.22))",
                    }}
                    whileHover={{
                      scale: 1.015,
                      filter: "drop-shadow(0 0 22px rgba(255,255,255,0.34))",
                      transition: { type: "spring", stiffness: 180, damping: 18 },
                    }}
                  >
                    <h1
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 300,
                        fontSize: "clamp(3rem, 6.5vw, 6.5rem)",
                        lineHeight: 0.95,
                        color: "#ffffff",
                        margin: 0,
                        padding: 0,
                        letterSpacing: "0.01em",
                        textAlign: "left",
                      }}
                    >
                      Nitin<br />S<br />Katagihallimath
                    </h1>
                  </motion.div>

                  <motion.p
                    variants={itemVariants}
                    style={{
                      fontFamily: "var(--font-content)",
                      fontSize: "clamp(0.78rem, 1.2vw, 0.92rem)",
                      letterSpacing: "0.04em",
                      color: "#94A3B8",
                      marginTop: "clamp(1rem, 2vh, 1.6rem)",
                      fontWeight: 300,
                      maxWidth: "36ch",
                      lineHeight: 1.6,
                    }}
                  >
                    Building intelligent AI applications and immersive digital experiences.
                  </motion.p>

                  <motion.p
                    variants={itemVariants}
                    style={{
                      fontFamily: "var(--font-content)",
                      fontSize: "clamp(0.68rem, 1vw, 0.8rem)",
                      color: "rgba(148,163,184,0.7)",
                      marginTop: "clamp(0.6rem, 1.2vh, 1rem)",
                      fontWeight: 300,
                      maxWidth: "38ch",
                      lineHeight: 1.65,
                    }}
                  >
                    Exploring AI systems, LLM workflows, and modern application design using AI-assisted development tools.
                  </motion.p>

                  <motion.div
                    variants={itemVariants}
                    style={{ display: "flex", gap: "0.75rem", marginTop: "clamp(1.4rem, 2.8vh, 2.2rem)", flexWrap: "wrap" }}
                  >
                    <button
                      type="button"
                      onClick={() => scrollTo("projects")}
                      style={{
                        fontFamily: "var(--font-content)",
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "#000000",
                        background: "#FFFFFF",
                        border: "1px solid #FFFFFF",
                        padding: "0.6rem 1.4rem",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.85)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#FFFFFF"; }}
                    >
                      Explore Projects
                    </button>
                    <a
                      href={RESUME_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: "var(--font-content)",
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "#FFFFFF",
                        background: "transparent",
                        border: "1px solid rgba(255,255,255,0.4)",
                        padding: "0.6rem 1.4rem",
                        textDecoration: "none",
                        transition: "all 0.2s ease",
                        display: "inline-block",
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#FFFFFF"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.4)"; }}
                    >
                      Resume
                    </a>
                    <button
                      type="button"
                      onClick={() => scrollTo("contact")}
                      style={{
                        fontFamily: "var(--font-content)",
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "#FFFFFF",
                        background: "transparent",
                        border: "1px solid rgba(255,255,255,0.4)",
                        padding: "0.6rem 1.4rem",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#FFFFFF"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.4)"; }}
                    >
                      Contact
                    </button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </>
          )}

          {/* Scroll cue */}
          <motion.button
            type="button"
            onClick={() => scrollTo("about")}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.9 }}
            style={{
              position: "absolute",
              bottom: "clamp(1rem, 3vh, 1.8rem)",
              left: isMobile ? "50%" : "25%",
              transform: "translateX(-50%)",
              zIndex: 6,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.38rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#FFFFFF",
            }}
            whileHover={{ color: "rgba(255,255,255,0.6)", scale: 1.08 }}
            aria-label="Scroll to about"
          >
            <span style={{ fontFamily: "var(--font-content)", fontSize: "0.55rem", fontWeight: 600, letterSpacing: "0.36em", textTransform: "uppercase", color: "inherit" }}>
              Scroll
            </span>
            <motion.svg
              width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
